import {createClient} from '@supabase/supabase-js';
import {demoProperties} from '../lib/demo';

const projectUrl='https://dxfojlhebqjibupgjemc.supabase.co';
async function seed(){
 const url=process.env.NEXT_PUBLIC_SUPABASE_URL;
 const key=process.env.SUPABASE_SERVICE_ROLE_KEY;
 if(!url||!key)throw new Error('Missing seed configuration.');
 // Explicitly protect the old shared project and any accidentally selected database.
 if(new URL(url).origin!==projectUrl)throw new Error('Seed target must be the dedicated Sakan project.');
 if(demoProperties.length!==100||new Set(demoProperties.map(p=>p.id)).size!==100)throw new Error('Invalid seed inventory.');
 const db=createClient(url,key,{auth:{persistSession:false}});
 // ON CONFLICT DO NOTHING retains existing rows, IDs and favorites on every run.
 const {error}=await db.from('sakan_properties').upsert(demoProperties,{onConflict:'id',ignoreDuplicates:true});
 if(error)throw new Error('Inventory insert failed.');
 const {data,error:readError,count}=await db.from('sakan_properties').select('id',{count:'exact'});
 if(readError||count!==100||!demoProperties.every(p=>data?.some(row=>row.id===p.id)))throw new Error('Inventory verification failed; existing rows were not deleted.');
 console.log('Verified exactly 100 sample properties. Existing records and favorites preserved.');
}
seed().catch(error=>{console.error(error instanceof Error?error.message:'Seed failed.');process.exitCode=1;});
