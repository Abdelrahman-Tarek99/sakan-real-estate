import {test} from 'node:test';
import assert from 'node:assert/strict';
import {existsSync} from 'node:fs';
import {demoProperties,originalProperties,additionalProperties} from '../lib/demo';
import {districts,filterProperties,parseFilters} from '../lib/filters';

test('original 50 IDs and records remain at the start of the inventory',()=>{
 assert.equal(originalProperties.length,50);
 assert.deepEqual(demoProperties.slice(0,50),originalProperties);
 assert.deepEqual(originalProperties.map(p=>p.id),Array.from({length:50},(_,i)=>`a0000000-0000-4000-8000-${String(i+1).padStart(12,'0')}`));
});
test('50 additions have distinct identities, valid locations, local photography and disclosures',()=>{
 assert.equal(additionalProperties.length,50);
 assert.equal(new Set(additionalProperties.map(p=>p.title)).size,50);
 for(const p of additionalProperties){
  assert.ok(!originalProperties.some(old=>old.id===p.id));
  assert.ok(districts.includes(p.district));
  assert.ok(p.latitude>=29&&p.latitude<=32&&p.longitude>=29&&p.longitude<=33);
  assert.ok(p.price>0&&p.area_sqm>0&&p.bedrooms>0);
  assert.match(p.description,/fictional/i);assert.match(p.description,/photography is illustrative/i);
  assert.ok(p.images.length>=4);assert.equal(new Set(p.images).size,p.images.length);
  for(const photo of p.images)assert.ok(existsSync(`public${photo}`));
 }
 assert.equal(new Set(additionalProperties.map(p=>p.property_type)).size,5);
 for(const intent of ['buy','rent'] as const)assert.equal(additionalProperties.filter(p=>p.listing_type===intent).length,25);
});
test('100 listings paginate without gaps or duplicates for both intents and new district filters work',()=>{
 let total=0;
 for(const intent of ['buy','rent'] as const){
  const inventory=filterProperties(demoProperties,parseFilters({intent}));
  const pages=Array.from({length:Math.ceil(inventory.length/9)},(_,i)=>inventory.slice(i*9,(i+1)*9));
  assert.equal(new Set(pages.flat().map(p=>p.id)).size,inventory.length);
  assert.deepEqual(pages.flat(),inventory);total+=inventory.length;
  for(const district of ['Madinaty','El Shorouk','Smouha','Sidi Bishr']){
   const matches=filterProperties(demoProperties,parseFilters({intent,district}));
   assert.ok(matches.length);assert.ok(matches.every(p=>p.district===district));
  }
 }
 assert.equal(total,100);
});
