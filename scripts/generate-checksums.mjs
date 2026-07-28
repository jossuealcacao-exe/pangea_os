import fs from 'node:fs';import path from 'node:path';import crypto from 'node:crypto';
const root=path.resolve(process.argv[2]||'.');const skip=new Set(['SHA256SUMS']);
function walk(d){return fs.readdirSync(d,{withFileTypes:true}).flatMap(e=>{const p=path.join(d,e.name);if(e.name==='.git'||e.name==='node_modules')return[];return e.isDirectory()?walk(p):[p];});}
const files=walk(root).filter(f=>!skip.has(path.basename(f))).sort();const lines=files.map(f=>`${crypto.createHash('sha256').update(fs.readFileSync(f)).digest('hex')}  ${path.relative(root,f)}`);fs.writeFileSync(path.join(root,'SHA256SUMS'),lines.join('\n')+'\n');console.log(`Wrote ${lines.length} checksums`);
