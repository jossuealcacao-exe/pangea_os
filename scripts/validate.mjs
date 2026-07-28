#!/usr/bin/env node
import fs from 'node:fs';import path from 'node:path';import {execFileSync} from 'node:child_process';
const root=path.resolve(process.argv[2]||'.');const errors=[],warnings=[];const required=['README.md','AGENTS.md','CLAUDE.md','PROJECT_INSTRUCTIONS.md','core/00_CONSTITUTION.md','agent/MANIFEST.json','scripts/pangea.mjs','tools/ahp-plus/ahp.mjs','.cursor/rules/00-pangea.mdc','.claude/skills/pangea/SKILL.md','.agents/skills/pangea/SKILL.md','.opencode/commands/pangea.md','platforms/chatgpt/context-pack/01_PROJECT_INSTRUCTIONS.md','platforms/ollama/Modelfile.example'];required.forEach(f=>{if(!fs.existsSync(path.join(root,f)))errors.push(`missing ${f}`)});
function walk(d){return fs.readdirSync(d,{withFileTypes:true}).flatMap(e=>{const p=path.join(d,e.name);if(e.name==='.git'||e.name==='node_modules')return[];return e.isDirectory()?walk(p):[p];});}
for(const f of walk(root)){if(f.endsWith('.json')){try{JSON.parse(fs.readFileSync(f,'utf8'));}catch(e){errors.push(`invalid JSON ${path.relative(root,f)}: ${e.message}`);}}}
try{execFileSync(process.execPath,[path.join(root,'tools/ahp-plus/ahp.mjs'),'verify',root],{stdio:'pipe'});}catch(e){errors.push(`AHP+ verify failed: ${e.stdout?.toString()||e.message}`)}
const result={ok:errors.length===0,root,errors,warnings,files:walk(root).length};console.log(JSON.stringify(result,null,2));if(!result.ok)process.exit(2);
