import 'server-only';
import {createClient} from '@supabase/supabase-js';
// Public listing reads never receive user sessions; only these reads may be cached.
export function publicClient(){return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!,process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,{auth:{persistSession:false,autoRefreshToken:false,detectSessionInUrl:false},global:{fetch:(url,options)=>fetch(url,{...options,next:{revalidate:60},signal:AbortSignal.timeout(15000)})}});}
