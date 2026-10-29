import type {Filters, Property} from './types';
export const districts = ['New Cairo','Sheikh Zayed','Maadi','Zamalek','Heliopolis','6th of October','Madinaty','El Shorouk','Smouha','Sidi Bishr'];
export const types = ['apartment','villa','studio','penthouse','duplex'];
export function parseFilters(raw:Record<string,string|string[]|undefined>):Filters {
 const val=(k:string)=>typeof raw[k]==='string'?raw[k] as string:'';
 const num=(k:string, fallback:number, max:number)=>{const n=Number(val(k));return val(k)&&Number.isFinite(n)?Math.max(0,Math.min(max,n)):fallback;};
 return {q:val('q').slice(0,100),district:districts.includes(val('district'))?val('district'):'',type:types.includes(val('type'))?val('type'):'',intent:val('intent')==='rent'?'rent':'buy',min:num('min',0,100000000),max:num('max',100000000,100000000),beds:Math.floor(num('beds',0,6)),area:Math.floor(num('area',0,2000)),sort:['price-asc','price-desc','area-desc'].includes(val('sort'))?val('sort'):'newest',page:Math.max(1,Math.floor(num('page',1,10000))),view:val('view')==='map'?'map':'grid'};
}
export function filterProperties(items:Property[],f:Filters){
 const q=f.q.toLowerCase();
 const data=items.filter(p=>p.listing_type===f.intent&&(!q||`${p.title} ${p.district} ${p.city}`.toLowerCase().includes(q))&&(!f.district||p.district===f.district)&&(!f.type||p.property_type===f.type)&&p.price>=f.min&&p.price<=f.max&&p.bedrooms>=f.beds&&p.area_sqm>=f.area);
 return data.sort((a,b)=>f.sort==='price-asc'?a.price-b.price:f.sort==='price-desc'?b.price-a.price:f.sort==='area-desc'?b.area_sqm-a.area_sqm:b.created_at.localeCompare(a.created_at)||a.id.localeCompare(b.id));
}
export function pageHref(raw:Record<string,string|string[]|undefined>,updates:Record<string,string|number>){const p=new URLSearchParams();for(const [k,v]of Object.entries(raw))if(typeof v==='string')p.set(k,v);for(const[k,v]of Object.entries(updates))p.set(k,String(v));return `/properties?${p.toString()}`;}
