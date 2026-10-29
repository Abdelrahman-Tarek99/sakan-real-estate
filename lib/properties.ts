import 'server-only';
import {demoProperties} from './demo';
import {filterProperties} from './filters';
import type {Filters,Property} from './types';
import {configured} from './supabase/server';
import {publicClient} from './supabase/public';
export const PAGE_SIZE=9;
export async function getProperties(f:Filters){
 if(!configured()){const all=filterProperties(demoProperties,f);const page=Math.min(f.page,Math.max(1,Math.ceil(all.length/PAGE_SIZE)));return {properties:all.slice((page-1)*PAGE_SIZE,page*PAGE_SIZE),count:all.length,page};}
 const db=publicClient();let query=db.from('sakan_properties').select('*',{count:'exact'}).eq('listing_type',f.intent).gte('price',f.min).lte('price',f.max).gte('bedrooms',f.beds).gte('area_sqm',f.area);
 if(f.district)query=query.eq('district',f.district);if(f.type)query=query.eq('property_type',f.type);
 if(f.q){const safe=f.q.replace(/[^\p{L}\p{N}\s-]/gu,'').trim();if(safe)query=query.or(`title.ilike.%${safe}%,district.ilike.%${safe}%,city.ilike.%${safe}%`);}
 query=f.sort==='price-asc'?query.order('price',{ascending:true}):f.sort==='price-desc'?query.order('price',{ascending:false}):f.sort==='area-desc'?query.order('area_sqm',{ascending:false}):query.order('created_at',{ascending:false});
 const {data,error,count}=await query.order('id').range((f.page-1)*PAGE_SIZE,f.page*PAGE_SIZE-1);if(error)throw new Error('Property listings could not be loaded. Please try again.');
 if(count&&f.page>Math.ceil(count/PAGE_SIZE))return getProperties({...f,page:Math.ceil(count/PAGE_SIZE)});
 return {properties:(data??[]) as Property[],count:count??0,page:f.page};
}
export async function getProperty(id:string){if(!/^[0-9a-f-]{36}$/i.test(id))return null;if(!configured())return demoProperties.find(p=>p.id===id)??null;const db=publicClient();const {data,error}=await db.from('sakan_properties').select('*').eq('id',id).maybeSingle();if(error)throw new Error('This property could not be loaded.');return data as Property|null;}
export async function getFeatured(){if(!configured())return demoProperties.slice(0,3);const db=publicClient();const {data,error}=await db.from('sakan_properties').select('*').eq('is_featured',true).order('id').limit(3);if(error)throw new Error('Featured properties could not be loaded.');return data as Property[];}
