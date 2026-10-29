import {spawn} from 'node:child_process';
// Accept both standard Next.js flags and the managed preview launcher's Vite-style flags.
const args=process.argv.slice(2),output=[];
for(let i=0;i<args.length;i++){if(args[i]==='--strictPort')continue;output.push(args[i]==='--host'?'--hostname':args[i]);}
if(!output.includes('--hostname'))output.push('--hostname','0.0.0.0');
const child=spawn(process.execPath,['node_modules/next/dist/bin/next','dev',...output],{stdio:'inherit'});child.on('exit',code=>process.exit(code??0));for(const signal of ['SIGTERM','SIGINT'])process.on(signal,()=>child.kill(signal));
