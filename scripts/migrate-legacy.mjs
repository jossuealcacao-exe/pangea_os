#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const root=path.resolve(process.argv.find(x=>!x.startsWith('--')&&x!==process.argv[0]&&x!==process.argv[1])||'.');
const apply=process.argv.includes('--apply');
const LEGACY=/(Web\s*Architect\s*OS|_web-os|web-architect)/i;
const skip=new Set(['.git','node_modules','.pangea-backup','knowledge','core','agent','scripts','tools','platforms','.github']);
function text(file){try{const s=fs.statSync(file);if(!s.isFile()||s.size>1024*1024)return'';return fs.readFileSync(file,'utf8');}catch{return'';}}
function contains(dir,depth=0){if(depth>3||!fs.existsSync(dir))return false;for(const e of fs.readdirSync(dir,{withFileTypes:true})){if(skip.has(e.name))continue;const p=path.join(dir,e.name);if(e.isDirectory()){if(contains(p,depth+1))return true;}else if(LEGACY.test(text(p)))return true;}return false;}
function inspectContainer(dir,relBase=''){
 const found=[];if(!fs.existsSync(dir))return found;
 const candidates=['_web-os','AGENTS.md','CLAUDE.md','opencode.json','.opencode','.cursor','.claude','.agents'];
 for(const name of candidates){const p=path.join(dir,name);if(!fs.existsSync(p))continue;const legacy=name==='_web-os'||(fs.statSync(p).isDirectory()?contains(p):LEGACY.test(text(p)));if(legacy)found.push({path:path.join(relBase,name),reason:name==='_web-os'?'Legacy Web Architect OS engine directory':'Instruction/configuration contains legacy Web Architect OS markers'});}
 return found;
}
let plan=[];
if(fs.existsSync(path.join(root,'_web-os')))plan.push({path:'_web-os',reason:'Legacy Web Architect OS engine directory'});
for(const e of fs.readdirSync(root,{withFileTypes:true})){if(!e.isDirectory()||skip.has(e.name)||e.name.startsWith('.'))continue;plan.push(...inspectContainer(path.join(root,e.name),e.name));}
plan=[...new Map(plan.map(x=>[x.path,x])).values()].sort((a,b)=>a.path.localeCompare(b.path));
if(!apply){console.log(JSON.stringify({mode:'PLAN_ONLY',root,count:plan.length,candidates:plan,next:'Review this list, commit or back up the repository, then rerun with --apply.'},null,2));process.exit(0);}
if(!plan.length){console.log(JSON.stringify({mode:'APPLY',root,moved:[],message:'No legacy artifacts detected.'},null,2));process.exit(0);}
const stamp=new Date().toISOString().replace(/[:.]/g,'-');const backup=path.join(root,'.pangea-backup',`legacy-${stamp}`);const moved=[];
for(const item of plan){const src=path.join(root,item.path),dst=path.join(backup,item.path);if(!fs.existsSync(src))continue;fs.mkdirSync(path.dirname(dst),{recursive:true});fs.renameSync(src,dst);moved.push({...item,backup:path.relative(root,dst)});}
console.log(JSON.stringify({mode:'APPLY',root,backup:path.relative(root,backup),moved,warning:'Artifacts were moved, not deleted. Run Pangea doctor and inspect git diff before committing.'},null,2));
