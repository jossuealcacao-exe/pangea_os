#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { execFileSync } from 'node:child_process';

const VERSION = '1.0.0';
const CERTAINTY = new Set(['VERIFIED','USER_CONFIRMED','INFERRED','UNVERIFIED','STALE','CONFLICTED']);
const PHASES = new Set(['DISCOVERY','PLANNED','IN_PROGRESS','BLOCKED','READY_FOR_QA','VERIFIED','COMPLETED','ARCHIVED','REJECTED']);
const KINDS = new Set(['decision','task','bug','risk','qa','session','requirement','evidence']);
const KIND_DIR = {decision:'decisions',task:'tasks',bug:'bugs',risk:'risks',qa:'qa',session:'sessions',requirement:'requirements'};
const EVIDENCE_TYPES = new Set(['file','command','test','commit','url','user_confirmation','artifact','screenshot']);
const TERMINAL_STATUSES = new Set(['COMPLETED','CLOSED','ARCHIVED','REJECTED']);
const ACTIVE_STATUSES = new Set(['OPEN','PROPOSED','PLANNED','IN_PROGRESS','BLOCKED','READY_FOR_QA','ACCEPTED','FAIL','NOT_RUN']);

function die(message, code=1){ console.error(`AHP+ ERROR: ${message}`); process.exit(code); }
function out(value){ console.log(typeof value === 'string' ? value : JSON.stringify(value,null,2)); }
function now(){ return new Date().toISOString(); }
function readJson(p){ try{return JSON.parse(fs.readFileSync(p,'utf8'));}catch(e){die(`Cannot read JSON ${p}: ${e.message}`);} }
function writeJson(p,obj){ fs.mkdirSync(path.dirname(p),{recursive:true}); fs.writeFileSync(p,JSON.stringify(obj,null,2)+'\n'); }
function stableHash(value){ return crypto.createHash('sha256').update(JSON.stringify(value)).digest('hex'); }
function rootFrom(input='.'){
  const abs=path.resolve(input); const direct=path.join(abs,'agent','MANIFEST.json');
  if(fs.existsSync(direct)) return abs;
  if(path.basename(abs)==='agent' && fs.existsSync(path.join(abs,'MANIFEST.json'))) return path.dirname(abs);
  return abs;
}
function git(root,args,fallback=null){ try{return execFileSync('git',args,{cwd:root,encoding:'utf8',stdio:['ignore','pipe','ignore']}).trim();}catch{return fallback;} }
function gitState(root){
  const inside=git(root,['rev-parse','--is-inside-work-tree'],'false')==='true';
  if(!inside) return {is_git:false,branch:null,commit:null,working_tree:'UNKNOWN'};
  const branch=git(root,['branch','--show-current'],null);
  const commit=git(root,['rev-parse','HEAD'],null);
  const status=git(root,['status','--porcelain'],'');
  return {is_git:true,branch,commit,working_tree:status?'DIRTY':'CLEAN'};
}
function agentDir(root){ return path.join(root,'agent'); }
function parseArgs(argv){
  const opts={_:[]};
  for(let i=0;i<argv.length;i++){
    const a=argv[i];
    if(a.startsWith('--')){ const key=a.slice(2); const next=argv[i+1]; if(next && !next.startsWith('--')){opts[key]=next;i++;}else opts[key]=true; }
    else opts._.push(a);
  }
  return opts;
}
function defaultManifest(owner='Unknown owner'){
  return {protocol:'AHP+',version:VERSION,instance_id:crypto.randomUUID(),created_at:now(),owner,root:'agent',certainty_levels:[...CERTAINTY],spec_ref:'org.jossuealcala.ahp-plus@1.0.0'};
}
function ensureDirs(a){
  ['records/decisions','records/tasks','records/bugs','records/risks','records/qa','records/sessions','records/requirements','evidence','handoffs','locks','archive'].forEach(d=>fs.mkdirSync(path.join(a,d),{recursive:true}));
}
function init(root,opts){
  const a=agentDir(root); if(fs.existsSync(path.join(a,'MANIFEST.json')) && !opts.force) die('agent/MANIFEST.json already exists; use --force only after backup.');
  ensureDirs(a); const gs=gitState(root);
  writeJson(path.join(a,'MANIFEST.json'),defaultManifest(opts.owner||'Unknown owner'));
  writeJson(path.join(a,'CURRENT_STATE.json'),{project_id:opts.project||'default',phase:'DISCOVERY',objective:opts.objective||'Bootstrap repository context',base_commit:gs.commit,working_tree:gs.working_tree,next_action:'Run /agent verify, then inspect the active project',updated_at:now(),confidence:'UNVERIFIED',blockers:[],active_record_ids:[]});
  writeJson(path.join(a,'PROJECTS.json'),{schema_version:VERSION,projects:[]});
  writeJson(path.join(a,'BACKLOG.json'),{schema_version:VERSION,items:[]});
  fs.writeFileSync(path.join(a,'README.md'),'# /agent\n\nCanonical AHP+ memory. Do not store secrets.\n');
  fs.writeFileSync(path.join(a,'INDEX.md'),'# AHP+ Index\n\nRun `node bin/ahp.mjs brief .`.\n');
  out(`AHP+ initialized at ${a}`);
}
function walkFiles(dir){ if(!fs.existsSync(dir)) return []; return fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walkFiles(path.join(dir,e.name)):[path.join(dir,e.name)]); }
function recordFiles(root){ return [...walkFiles(path.join(agentDir(root),'records')),...walkFiles(path.join(agentDir(root),'evidence'))].filter(f=>f.endsWith('.json')); }
function handoffFiles(root){ return walkFiles(path.join(agentDir(root),'handoffs')).filter(f=>f.endsWith('.json')); }
function lockFiles(root){ return walkFiles(path.join(agentDir(root),'locks')).filter(f=>f.endsWith('.json')); }
function scanSecrets(file,text,errors){
  const pats=[/AKIA[0-9A-Z]{16}/,/(?:sk|rk)-[A-Za-z0-9_-]{20,}/,/ghp_[A-Za-z0-9]{30,}/,/-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/,/(?:password|passwd|api[_-]?key|secret)\s*[:=]\s*["'][^"']{8,}["']/i];
  pats.forEach(p=>{if(p.test(text)) errors.push(`${file}: possible secret detected`)});
}
function validateRecord(r,file,errors,warnings){
  const req=['id','kind','project_id','title','status','confidence','created_at','updated_at','actor','source_refs'];
  req.forEach(k=>{if(r[k]===undefined) errors.push(`${file}: missing ${k}`)});
  if(r.kind && !KINDS.has(r.kind)) errors.push(`${file}: invalid kind ${r.kind}`);
  if(r.confidence && !CERTAINTY.has(r.confidence)) errors.push(`${file}: invalid confidence ${r.confidence}`);
  if(r.kind==='decision' && r.status==='ACCEPTED' && !['VERIFIED','USER_CONFIRMED'].includes(r.confidence)) errors.push(`${file}: accepted decision requires VERIFIED or USER_CONFIRMED`);
  if(r.kind==='qa' && r.status==='PASS' && (!Array.isArray(r.source_refs)||!r.source_refs.length)) errors.push(`${file}: PASS QA requires source_refs`);
  if(r.kind==='evidence'){
    if(!EVIDENCE_TYPES.has(r.evidence_type)) errors.push(`${file}: invalid or missing evidence_type`);
    if(!r.locator) errors.push(`${file}: evidence locator is required`);
    if(r.result===undefined) errors.push(`${file}: evidence result is required`);
  }
  if(!Array.isArray(r.source_refs)) errors.push(`${file}: source_refs must be an array`);
  if(r.confidence==='VERIFIED' && (!Array.isArray(r.source_refs)||!r.source_refs.length) && r.kind!=='evidence') warnings.push(`${file}: VERIFIED record has no source_refs`);
}
function verifyHandoff(h,file,errors){
  const req=['id','kind','from','to','project_id','objective','base_commit','branch','working_tree','completed','in_progress','pending','validations','risks','next_action','done_criteria','created_at','integrity'];
  req.forEach(k=>{if(h[k]===undefined) errors.push(`${file}: missing ${k}`)});
  if(h.kind!=='handoff') errors.push(`${file}: kind must be handoff`);
  if(!h.integrity || h.integrity.algorithm!=='sha256' || !h.integrity.digest) errors.push(`${file}: invalid integrity envelope`);
  else { const expected=stableHash({...h,integrity:{algorithm:'sha256',digest:null}}); if(expected!==h.integrity.digest) errors.push(`${file}: integrity digest mismatch`); }
}
function localRefMissing(root,ref){
  if(typeof ref!=='string'||!ref) return false;
  if(/^(https?:|urn:|git:|user:|commit:|sha256:)/.test(ref)) return false;
  if(/^(DEC|TASK|BUG|RISK|QA|SES|REQ|EVD|HOF)-/.test(ref)) return false;
  return !fs.existsSync(path.resolve(root,ref));
}
function verify(root,opts={},quiet=false){
  const a=agentDir(root), errors=[], warnings=[];
  const must=['MANIFEST.json','CURRENT_STATE.json','PROJECTS.json','BACKLOG.json'];
  must.forEach(f=>{if(!fs.existsSync(path.join(a,f))) errors.push(`missing agent/${f}`)});
  if(errors.length){ const r={ok:false,errors,warnings}; if(!quiet)out(r); return r; }
  const m=readJson(path.join(a,'MANIFEST.json')); const c=readJson(path.join(a,'CURRENT_STATE.json'));
  if(m.protocol!=='AHP+') errors.push('MANIFEST.protocol must be AHP+');
  if(m.version!==VERSION) warnings.push(`manifest version ${m.version} differs from CLI ${VERSION}`);
  if(!PHASES.has(c.phase)) errors.push(`CURRENT_STATE.phase invalid: ${c.phase}`);
  if(!CERTAINTY.has(c.confidence)) errors.push(`CURRENT_STATE.confidence invalid: ${c.confidence}`);
  const ids=new Map(); const jsonFiles=walkFiles(a).filter(f=>f.endsWith('.json'));
  for(const f of jsonFiles){
    let text='',obj; try{text=fs.readFileSync(f,'utf8'); obj=JSON.parse(text);}catch(e){errors.push(`${f}: invalid JSON: ${e.message}`);continue;}
    scanSecrets(f,text,errors);
    if(f.includes(`${path.sep}records${path.sep}`)||f.includes(`${path.sep}evidence${path.sep}`)){
      validateRecord(obj,f,errors,warnings);
      if(obj.id){if(ids.has(obj.id)) errors.push(`${f}: duplicate id also in ${ids.get(obj.id)}`);else ids.set(obj.id,f);}
      for(const ref of obj.source_refs||[]) if(localRefMissing(root,ref)) warnings.push(`${f}: unresolved local source_ref ${ref}`);
    }
    if(f.includes(`${path.sep}handoffs${path.sep}`)){verifyHandoff(obj,f,errors);if(obj.id){if(ids.has(obj.id))errors.push(`${f}: duplicate id also in ${ids.get(obj.id)}`);else ids.set(obj.id,f);}}
  }
  for(const id of c.active_record_ids||[]) if(!ids.has(id)) warnings.push(`CURRENT_STATE.active_record_ids references missing ${id}`);
  const gs=gitState(root);
  if(c.base_commit && gs.commit && c.base_commit!==gs.commit) warnings.push(`CURRENT_STATE.base_commit is stale (${c.base_commit.slice(0,8)} != ${gs.commit.slice(0,8)})`);
  for(const f of lockFiles(root)){
    const l=readJson(f); if(!l.id||!l.scope||!l.owner||!l.expires_at) errors.push(`${f}: malformed lock`);
    else if(Date.parse(l.expires_at)<=Date.now()) warnings.push(`${f}: expired lock should be removed or archived`);
  }
  const result={ok:errors.length===0&&!(opts.strict&&warnings.length),protocol:'AHP+',version:VERSION,root,git:gs,errors,warnings,checked_files:jsonFiles.length,strict:Boolean(opts.strict)};
  if(!quiet) out(result); return result;
}
function records(root,kind=null){
  return recordFiles(root).map(f=>readJson(f)).filter(r=>!kind||r.kind===kind).sort((a,b)=>String(b.updated_at||'').localeCompare(String(a.updated_at||'')));
}
function findRecord(root,id){
  for(const f of recordFiles(root)){const r=readJson(f);if(r.id===id)return{file:f,record:r};} return null;
}
function activeLocks(root){
  return lockFiles(root).map(f=>({file:f,lock:readJson(f)})).filter(x=>Date.parse(x.lock.expires_at)>Date.now());
}
function scopesOverlap(a,b){return a==='*'||b==='*'||a===b||a.startsWith(`${b}/`)||b.startsWith(`${a}/`);}
function preflightWrite(root,opts,scope='agent'){
  const v=verify(root,{},true); if(!v.ok) die(`repository is not valid AHP+: ${v.errors.join('; ')}`);
  if(opts['expected-base'] && opts['expected-base']!==v.git.commit) die(`base commit conflict: expected ${opts['expected-base']}, current ${v.git.commit}`);
  const current=readJson(path.join(agentDir(root),'CURRENT_STATE.json')); if(current.confidence==='CONFLICTED') die('CURRENT_STATE is CONFLICTED; resolve before writing.');
  const actor=opts.actor||opts.owner||'AI agent'; const conflict=activeLocks(root).find(x=>scopesOverlap(x.lock.scope,scope)&&x.lock.owner!==actor);
  if(conflict) die(`active lock ${conflict.lock.id} on ${conflict.lock.scope} owned by ${conflict.lock.owner} until ${conflict.lock.expires_at}`);
  return v;
}
function status(root){
  const v=verify(root,{},true); if(!v.ok) {out(v);process.exit(2);} const c=readJson(path.join(agentDir(root),'CURRENT_STATE.json'));
  const rs=records(root); const counts={}; rs.forEach(r=>counts[r.kind]=(counts[r.kind]||0)+1);
  out({protocol:'AHP+',version:VERSION,project:c.project_id,phase:c.phase,objective:c.objective,next_action:c.next_action,confidence:c.confidence,git:v.git,records:counts,active_locks:activeLocks(root).map(x=>x.lock),warnings:v.warnings});
}
function projectEntry(root,projectId){
  const p=readJson(path.join(agentDir(root),'PROJECTS.json')); return (p.projects||[]).find(x=>x.project_id===projectId)||null;
}
function context(root,opts){
  const v=verify(root,{},true); if(!v.ok){out(v);process.exit(2);} const c=readJson(path.join(agentDir(root),'CURRENT_STATE.json')); const pid=opts.project||c.project_id;
  const active=records(root).filter(r=>r.project_id===pid&&!TERMINAL_STATUSES.has(r.status)).slice(0,100);
  const handoffs=handoffFiles(root).map(f=>readJson(f)).filter(h=>h.project_id===pid).sort((a,b)=>b.created_at.localeCompare(a.created_at)).slice(0,5);
  out({protocol:'AHP+',version:VERSION,project_id:pid,current:c,project:projectEntry(root,pid),git:v.git,active_records:active,recent_handoffs:handoffs,locks:activeLocks(root).map(x=>x.lock),warnings:v.warnings});
}
function brief(root){
  const v=verify(root,{},true); if(!v.ok) {out(v);process.exit(2);} const a=agentDir(root), c=readJson(path.join(a,'CURRENT_STATE.json'));
  const rs=records(root), active=rs.filter(r=>r.project_id===c.project_id&&!TERMINAL_STATUSES.has(r.status));
  const lines=['# AHP+ Operational Brief','',`- Project: ${c.project_id}`,`- Phase: ${c.phase}`,`- Objective: ${c.objective}`,`- Confidence: ${c.confidence}`,`- Branch: ${v.git.branch??'n/a'}`,`- Commit: ${v.git.commit??'n/a'}`,`- Working tree: ${v.git.working_tree}`,`- Next action: ${c.next_action}`,'','## Active records'];
  if(!active.length) lines.push('- None.'); else active.slice(0,50).forEach(r=>lines.push(`- [${r.kind}/${r.status}/${r.confidence}] ${r.id}: ${r.title}`));
  if(v.warnings.length){lines.push('','## Warnings');v.warnings.forEach(x=>lines.push(`- ${x}`));}
  const md=lines.join('\n')+'\n'; fs.writeFileSync(path.join(a,'INDEX.md'),md); out(md);
}
function listRecords(root,kind,opts={}){
  let rs=records(root,kind); if(opts.project)rs=rs.filter(r=>r.project_id===opts.project); if(opts.status)rs=rs.filter(r=>r.status===opts.status); out({kind:kind||'all',count:rs.length,records:rs});
}
function backlog(root,opts){
  const c=readJson(path.join(agentDir(root),'CURRENT_STATE.json'));const pid=opts.project||c.project_id;const b=readJson(path.join(agentDir(root),'BACKLOG.json'));
  const items=(b.items||[]).filter(x=>(!x.project_id||x.project_id===pid)&&!TERMINAL_STATUSES.has(x.status));
  const tasks=records(root,'task').filter(x=>x.project_id===pid&&!TERMINAL_STATUSES.has(x.status));
  out({project_id:pid,items,tasks,count:items.length+tasks.length});
}
function history(root,opts){
  const c=readJson(path.join(agentDir(root),'CURRENT_STATE.json'));const pid=opts.project||c.project_id;
  const sessions=records(root,'session').filter(x=>x.project_id===pid);
  const handoffs=handoffFiles(root).map(f=>readJson(f)).filter(x=>x.project_id===pid).sort((a,b)=>b.created_at.localeCompare(a.created_at));
  out({project_id:pid,sessions,handoffs});
}
function record(root,kind,opts){
  if(!KINDS.has(kind)) die(`invalid record kind: ${kind}`); if(kind==='evidence') die('use the evidence command for evidence receipts'); const v=preflightWrite(root,opts,`record:${kind}`);
  if(!opts.title) die('--title is required'); const c=readJson(path.join(agentDir(root),'CURRENT_STATE.json'));
  const prefix={decision:'DEC',task:'TASK',bug:'BUG',risk:'RISK',qa:'QA',session:'SES',requirement:'REQ'}[kind];
  const id=`${prefix}-${new Date().toISOString().slice(0,10).replaceAll('-','')}-${crypto.randomBytes(3).toString('hex').toUpperCase()}`;
  const r={id,kind,project_id:opts.project||c.project_id,title:opts.title,description:opts.description||'',status:opts.status||'OPEN',confidence:opts.confidence||'UNVERIFIED',created_at:now(),updated_at:now(),actor:{platform:opts.platform||'unknown',model:opts.model||'unknown',name:opts.actor||'AI agent'},source_refs:opts.source?opts.source.split(',').map(s=>s.trim()).filter(Boolean):[],base_commit:v.git.commit,tags:opts.tags?opts.tags.split(',').map(s=>s.trim()).filter(Boolean):[]};
  if(!CERTAINTY.has(r.confidence)) die(`invalid confidence ${r.confidence}`);
  if(kind==='decision'&&r.status==='ACCEPTED'&&!['VERIFIED','USER_CONFIRMED'].includes(r.confidence))die('ACCEPTED decision requires VERIFIED or USER_CONFIRMED confidence');
  if(kind==='qa'&&r.status==='PASS'&&!r.source_refs.length)die('PASS QA requires --source evidence reference(s)');
  const dir=path.join(agentDir(root),'records',KIND_DIR[kind]); writeJson(path.join(dir,`${id}.json`),r); out(r);
}
function evidence(root,opts){
  const v=preflightWrite(root,opts,'evidence'); if(!opts.title||!opts.type||!opts.locator||opts.result===undefined)die('--title, --type, --locator and --result are required'); if(!EVIDENCE_TYPES.has(opts.type))die(`invalid evidence type ${opts.type}`);
  const c=readJson(path.join(agentDir(root),'CURRENT_STATE.json')); const id=`EVD-${new Date().toISOString().slice(0,10).replaceAll('-','')}-${crypto.randomBytes(3).toString('hex').toUpperCase()}`;
  const r={id,kind:'evidence',project_id:opts.project||c.project_id,title:opts.title,description:opts.description||'',status:opts.status||'OBSERVED',confidence:opts.confidence||'UNVERIFIED',created_at:now(),updated_at:now(),observed_at:opts['observed-at']||now(),actor:{platform:opts.platform||'unknown',model:opts.model||'unknown',name:opts.actor||'AI agent'},source_refs:opts.source?opts.source.split(',').map(s=>s.trim()).filter(Boolean):[],base_commit:v.git.commit,tags:opts.tags?opts.tags.split(',').map(s=>s.trim()).filter(Boolean):[],evidence_type:opts.type,locator:opts.locator,result:opts.result,limitations:opts.limitations||'',artifact_sha256:opts.sha256||null,exit_code:opts['exit-code']!==undefined?Number(opts['exit-code']):null};
  if(!CERTAINTY.has(r.confidence))die(`invalid confidence ${r.confidence}`);writeJson(path.join(agentDir(root),'evidence',`${id}.json`),r);out(r);
}
function setState(root,opts){
  const v=preflightWrite(root,opts,'state'); const p=path.join(agentDir(root),'CURRENT_STATE.json'),c=readJson(p);
  if(opts.phase){if(!PHASES.has(opts.phase))die(`invalid phase ${opts.phase}`);c.phase=opts.phase;} if(opts.confidence){if(!CERTAINTY.has(opts.confidence))die(`invalid confidence ${opts.confidence}`);c.confidence=opts.confidence;}
  for(const key of ['project','objective','next-action'])if(opts[key])c[key==='project'?'project_id':key.replace('-','_')]=opts[key];
  c.base_commit=v.git.commit;c.working_tree=v.git.working_tree;c.updated_at=now();writeJson(p,c);out(c);
}
function closeRecord(root,id,opts){
  const v=preflightWrite(root,opts,`record:${id}`);const hit=findRecord(root,id);if(!hit)die(`record not found: ${id}`);const r=hit.record;if(r.kind==='decision'&&r.status==='ACCEPTED')die('accepted decisions are immutable; use supersede');
  const status=opts.status||'COMPLETED';if(!TERMINAL_STATUSES.has(status))die(`close status must be one of ${[...TERMINAL_STATUSES].join(', ')}`);r.status=status;r.updated_at=now();r.closed_at=now();r.closed_by={name:opts.actor||'AI agent',platform:opts.platform||'unknown',model:opts.model||'unknown'};r.close_base_commit=v.git.commit;if(opts.reason)r.close_reason=opts.reason;writeJson(hit.file,r);out(r);
}
function supersede(root,id,opts){
  const old=findRecord(root,id);if(!old||old.record.kind!=='decision')die(`decision not found: ${id}`);if(!opts.title)die('--title is required');const status=opts.accept?'ACCEPTED':'PROPOSED';const confidence=opts.confidence||(opts.accept?'USER_CONFIRMED':'UNVERIFIED');const v=preflightWrite(root,opts,`decision:${id}`);if(status==='ACCEPTED'&&!['VERIFIED','USER_CONFIRMED'].includes(confidence))die('accepted replacement requires VERIFIED or USER_CONFIRMED');
  const n={id:`DEC-${new Date().toISOString().slice(0,10).replaceAll('-','')}-${crypto.randomBytes(3).toString('hex').toUpperCase()}`,kind:'decision',project_id:opts.project||old.record.project_id,title:opts.title,description:opts.description||'',status,confidence,created_at:now(),updated_at:now(),actor:{platform:opts.platform||'unknown',model:opts.model||'unknown',name:opts.actor||'AI agent'},source_refs:opts.source?opts.source.split(',').map(s=>s.trim()).filter(Boolean):[old.record.id],base_commit:v.git.commit,tags:opts.tags?opts.tags.split(',').map(s=>s.trim()).filter(Boolean):[],supersedes:old.record.id};writeJson(path.join(agentDir(root),'records/decisions',`${n.id}.json`),n);out(n);
}
function handoff(root,opts){
  const v=preflightWrite(root,opts,'handoff'); if(!opts.to) die('--to is required'); const a=agentDir(root), c=readJson(path.join(a,'CURRENT_STATE.json')),pid=opts.project||c.project_id;const rs=records(root).filter(r=>r.project_id===pid);
  const id=`HOF-${new Date().toISOString().slice(0,10).replaceAll('-','')}-${crypto.randomBytes(3).toString('hex').toUpperCase()}`;
  const h={id,kind:'handoff',from:opts.from||'current-agent',to:opts.to,project_id:pid,objective:c.objective,base_commit:v.git.commit,branch:v.git.branch,working_tree:v.git.working_tree,completed:rs.filter(r=>r.kind==='task'&&r.status==='COMPLETED').map(r=>r.id),in_progress:rs.filter(r=>r.kind==='task'&&r.status==='IN_PROGRESS').map(r=>r.id),pending:rs.filter(r=>r.kind==='task'&&!TERMINAL_STATUSES.has(r.status)&&r.status!=='IN_PROGRESS').map(r=>r.id),decisions:rs.filter(r=>r.kind==='decision'&&r.status==='ACCEPTED').map(r=>r.id),validations:rs.filter(r=>r.kind==='qa'&&r.status==='PASS').map(r=>r.id),risks:rs.filter(r=>r.kind==='risk'&&!TERMINAL_STATUSES.has(r.status)).map(r=>r.id),next_action:c.next_action,done_criteria:opts['done-criteria']?opts['done-criteria'].split('|').map(s=>s.trim()).filter(Boolean):[],notes:opts.summary||'',created_at:now(),receiver_preflight:['Verify repository root','Read agent/MANIFEST.json and CURRENT_STATE.json','Compare branch and base_commit','Inspect working tree','Run /agent verify'],integrity:{algorithm:'sha256',digest:null}};
  h.integrity.digest=stableHash({...h,integrity:{algorithm:'sha256',digest:null}});writeJson(path.join(a,'handoffs',`${id}.json`),h);out(h);
}
function acquireLock(root,opts){
  const scope=opts.scope||'*',owner=opts.owner||opts.actor;if(!owner)die('--owner is required');const v=preflightWrite(root,{...opts,actor:owner},scope);const existing=activeLocks(root).find(x=>scopesOverlap(x.lock.scope,scope)&&x.lock.owner!==owner);if(existing)die(`conflicting lock ${existing.lock.id}`);
  const ttl=Math.max(1,Math.min(1440,Number(opts.minutes||60)));const id=`LOCK-${new Date().toISOString().slice(0,10).replaceAll('-','')}-${crypto.randomBytes(3).toString('hex').toUpperCase()}`;const l={id,scope,owner,platform:opts.platform||'unknown',purpose:opts.purpose||'',created_at:now(),expires_at:new Date(Date.now()+ttl*60000).toISOString(),base_commit:v.git.commit};writeJson(path.join(agentDir(root),'locks',`${id}.json`),l);out(l);
}
function releaseLock(root,id,opts){
  const f=path.join(agentDir(root),'locks',`${id}.json`);if(!fs.existsSync(f))die(`lock not found: ${id}`);const l=readJson(f),actor=opts.owner||opts.actor;if(!opts.force&&actor!==l.owner)die(`lock owned by ${l.owner}; use matching --owner or explicit --force with owner authorization`);fs.unlinkSync(f);out({released:id,scope:l.scope,owner:l.owner,released_at:now()});
}
function usage(){out(`AHP+ ${VERSION}\n\nRead commands:\n  verify [root] [--strict]\n  status [root]\n  context [root] [--project ID]\n  brief [root]\n  backlog [root] [--project ID]\n  decisions|tasks|bugs|risks|qa|evidence|history [root]\n\nWrite commands:\n  init [root] --owner NAME [--project ID]\n  set-state [root] [--project ID --phase PHASE --objective TEXT --next-action TEXT --confidence LEVEL]\n  record <kind> [root] --title TEXT [--status S --confidence C --source REF]\n  record evidence [root] --title TEXT --type TYPE --locator REF --result TEXT [--confidence C]\n  close <record-id> [root] [--status COMPLETED --reason TEXT]\n  supersede <decision-id> [root] --title TEXT [--accept --confidence USER_CONFIRMED]\n  handoff [root] --to PLATFORM [--from PLATFORM --summary TEXT]\n  lock [root] --scope PATH --owner ACTOR [--minutes 60]\n  unlock <lock-id> [root] --owner ACTOR\n  version\n\nAll write commands support --expected-base COMMIT. Git commit, push, pull, merge and deploy are deliberately outside the protocol CLI.`);}

const args=parseArgs(process.argv.slice(2)); const cmd=args._[0];
if(!cmd||cmd==='help'||cmd==='--help') usage();
else if(cmd==='version') out(VERSION);
else if(cmd==='init') init(rootFrom(args._[1]||'.'),args);
else if(cmd==='verify') {const r=verify(rootFrom(args._[1]||'.'),args); if(!r.ok) process.exit(2);}
else if(cmd==='status') status(rootFrom(args._[1]||'.'));
else if(cmd==='context') context(rootFrom(args._[1]||'.'),args);
else if(cmd==='brief') brief(rootFrom(args._[1]||'.'));
else if(cmd==='backlog') backlog(rootFrom(args._[1]||'.'),args);
else if(['decisions','tasks','bugs','risks','qa','evidence'].includes(cmd)) {const map={decisions:'decision',tasks:'task',bugs:'bug',risks:'risk',qa:'qa',evidence:'evidence'};listRecords(rootFrom(args._[1]||'.'),map[cmd],args);}
else if(cmd==='history') history(rootFrom(args._[1]||'.'),args);
else if(cmd==='set-state') setState(rootFrom(args._[1]||'.'),args);
else if(cmd==='record') {if(args._[1]==='evidence')evidence(rootFrom(args._[2]||'.'),args);else record(rootFrom(args._[2]||'.'),args._[1],args);}
else if(cmd==='close') closeRecord(rootFrom(args._[2]||'.'),args._[1],args);
else if(cmd==='supersede') supersede(rootFrom(args._[2]||'.'),args._[1],args);
else if(cmd==='handoff') handoff(rootFrom(args._[1]||'.'),args);
else if(cmd==='lock') acquireLock(rootFrom(args._[1]||'.'),args);
else if(cmd==='unlock') releaseLock(rootFrom(args._[2]||'.'),args._[1],args);
else die(`unknown command ${cmd}`);
