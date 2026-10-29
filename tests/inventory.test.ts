import {test} from 'node:test';
import assert from 'node:assert/strict';
import {existsSync} from 'node:fs';
import {demoProperties,originalProperties,additionalProperties} from '../lib/demo';
import {districts,filterProperties,parseFilters} from '../lib/filters';

test('original 50 stable IDs are retained',()=>{
 assert.equal(originalProperties.length,50);
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
test('expanded inventory filters cover new districts and Alexandria in both intents',()=>{
 for(const [intent,expectedCount] of [['buy',60],['rent',40]] as const){
  const inventory=filterProperties(demoProperties,parseFilters({intent}));
  assert.equal(inventory.length,expectedCount);
  for(const district of ['Madinaty','El Shorouk','Smouha','Sidi Bishr']){
   const matches=filterProperties(demoProperties,parseFilters({intent,district}));
   assert.ok(matches.length>=2);assert.ok(matches.every(p=>p.district===district&&p.listing_type===intent));
  }
  const alexandria=filterProperties(demoProperties,parseFilters({intent,q:'Alexandria',sort:'price-asc'}));
  assert.equal(alexandria.length,5);
  assert.ok(alexandria.every(p=>p.city==='Alexandria'));
  assert.ok(alexandria.every((p,i)=>i===0||alexandria[i-1].price<=p.price));
 }
});
