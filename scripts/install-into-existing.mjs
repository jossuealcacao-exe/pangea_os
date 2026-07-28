#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import {fileURLToPath} from 'node:url';

const here=path.dirname(fileURLToPath(import.meta.url));
const source=path.resolve(here,'..');
const argv=process.argv.slice(2);
const targetArg=argv.find(a=>!a.startsWith('--'));
if(!targetArg){console.error('Usage: node scripts/install-into-existing.mjs /target/path [--dry-run] [--replace-state]');process.exit(1);}
const target=path.resolve(targetArg),dryRun=argv.includes('--dry-run'),replaceState=argv.includes('--replace-state');
if(source===target){console.error('Run installer from the extracted package and provide a different target path.');process.exit(1);}
if(!dryRun)fs.mkdirSync(target,{recursive:true});
else if(!fs.existsSync(target)){console.error('Dry-run target does not exist.');process.exit(1);}
const stamp=new Date().toISOString().replace(/[:.]/g,'-');
const backup=path.join(target,'.pangea-backup',`install-${stamp}`);
const excludes=new Set(['.git','node_modules','.pangea-backup']);
const collisions=[],writes=[],skips=[];
function relUnix(p){return p.split(path.sep).join('/');}
function targetHasForeignPackage(){const p=path.join(target,'package.json');if(!fs.existsSync(p))return false;try{return JSON.parse(fs.readFileSync(p,'utf8')).name!=='pangea-os';}catch{return true;}}
const foreignPackage=targetHasForeignPackage();
const preserveExistingState=!replaceState&&fs.existsSync(path.join(target,'agent','MANIFEST.json'));
function shouldSkip(rel){
 const unix=relUnix(rel);
 if(preserveExistingState&&(unix==='agent'||unix.startsWith('agent/')))return 'Existing AHP+ state preserved. Use --replace-state only after an explicit backup and review.';
 if(foreignPackage&&unix==='package.json')return 'Existing non-Pangea package.json preserved; Pangea runs through direct node commands.';
 return null;
}
function mergeLineFile(src,dst,rel){
 const srcLines=fs.readFileSync(src,'utf8').split(/\r?\n/),dstLines=fs.existsSync(dst)?fs.readFileSync(dst,'utf8').split(/\r?\n/):[];
 const merged=[...dstLines,...srcLines].filter((x,i,a)=>x!==''&&a.indexOf(x)===i).join('\n')+'\n';
 if(fs.existsSync(dst))collisions.push(relUnix(rel));writes.push(relUnix(rel));if(!dryRun){if(fs.existsSync(dst)){const b=path.join(backup,rel);fs.mkdirSync(path.dirname(b),{recursive:true});fs.copyFileSync(dst,b);}fs.mkdirSync(path.dirname(dst),{recursive:true});fs.writeFileSync(dst,merged);}
}
function copy(src,dst,rel=''){
 for(const e of fs.readdirSync(src,{withFileTypes:true})){
  if(excludes.has(e.name))continue;
  const s=path.join(src,e.name),d=path.join(dst,e.name),r=path.join(rel,e.name),skip=shouldSkip(r);
  if(skip){skips.push({path:relUnix(r),reason:skip});continue;}
  if(e.isDirectory()){if(!dryRun)fs.mkdirSync(d,{recursive:true});copy(s,d,r);continue;}
  if(['.gitignore','.gitattributes'].includes(relUnix(r))){mergeLineFile(s,d,r);continue;}
  if(fs.existsSync(d))collisions.push(relUnix(r));writes.push(relUnix(r));
  if(!dryRun){if(fs.existsSync(d)){const b=path.join(backup,r);fs.mkdirSync(path.dirname(b),{recursive:true});fs.copyFileSync(d,b);}fs.mkdirSync(path.dirname(d),{recursive:true});fs.copyFileSync(s,d);}
 }
}
copy(source,target);
const report={mode:dryRun?'DRY_RUN':'APPLY',version:'1.0.0',source,target,files_planned:writes.length,collisions:[...new Set(collisions)],skips,backup:dryRun?null:backup,next:['node scripts/pangea.mjs doctor','node scripts/pangea.mjs scan .','node scripts/pangea.mjs conflicts','node tools/ahp-plus/ahp.mjs verify .']};
if(!dryRun){
 fs.mkdirSync(backup,{recursive:true});
 const evidenceDir=path.join(target,'agent','evidence');
 if(fs.existsSync(path.join(target,'agent','MANIFEST.json'))){
  fs.mkdirSync(evidenceDir,{recursive:true});const id=`EVD-${new Date().toISOString().slice(0,10).replaceAll('-','')}-${crypto.randomBytes(3).toString('hex').toUpperCase()}`;
  const ev={id,kind:'evidence',project_id:'pangea-os',title:'Pangea OS installation',description:'Installer copied the Pangea control plane and backed up collisions.',status:'OBSERVED',confidence:'VERIFIED',created_at:new Date().toISOString(),updated_at:new Date().toISOString(),observed_at:new Date().toISOString(),actor:{name:'Pangea installer',platform:'node',model:'n/a'},source_refs:['manifest.json'],base_commit:null,tags:['installation'],evidence_type:'artifact',locator:relUnix(path.relative(target,backup)),result:{files_planned:writes.length,collision_count:report.collisions.length,skipped:skips.length},limitations:'This receipt confirms filesystem copy operations, not semantic compatibility of every nested project.',artifact_sha256:crypto.createHash('sha256').update(JSON.stringify(report)).digest('hex'),exit_code:0};
  fs.writeFileSync(path.join(evidenceDir,`${id}.json`),JSON.stringify(ev,null,2)+'\n');
 }
 fs.mkdirSync(path.join(target,'docs'),{recursive:true});fs.writeFileSync(path.join(target,'docs','LAST_INSTALL_REPORT.json'),JSON.stringify(report,null,2)+'\n');
}
console.log(JSON.stringify(report,null,2));
