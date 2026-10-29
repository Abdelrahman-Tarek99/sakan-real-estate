from pathlib import Path
import json,base64
root=Path(__file__).resolve().parents[1]
files=[]
for p in sorted(root.rglob('*')):
 if not p.is_file():continue
 rel=p.relative_to(root)
 if any(x in ('.next','node_modules','.git','.vercel') for x in rel.parts):continue
 if (p.name.startswith('.env') and p.name != '.env.example') or p.name.endswith(('.tsbuildinfo','.pem','.key')) or p.name == '.DS_Store':continue
 files.append({'file':str(rel),'data':base64.b64encode(p.read_bytes()).decode(),'encoding':'base64'})
print(json.dumps(files))
