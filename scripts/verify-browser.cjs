const {chromium}=require('playwright');
const assert=require('node:assert/strict');
(async()=>{
 const browser=await chromium.launch({headless:true,channel:'chromium'});
 const page=await browser.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
 const main=page.locator('#main');
 const base=process.env.SAKAN_BASE_URL||'http://localhost:3000';
 async function open(path){const response=await page.goto(base+path);assert.equal(response.status(),200);await main.locator('.results-heading').waitFor();}
 const ids=new Set();
 for(const [intent,count,pages] of [['buy',60,7],['rent',40,5]]){
  for(let p=1;p<=pages;p++){
   await open(`/properties?intent=${intent}&page=${p}`);
   assert.match(await main.locator('.results-heading').innerText(),new RegExp(`${count} homes`));
   const links=await main.locator('.property-card a[href^="/properties/"]').evaluateAll(els=>els.map(e=>e.getAttribute('href')));
   const unique=[...new Set(links)];assert.equal(unique.length,p<pages?9:count-9*(pages-1));
   for(const id of unique){assert.ok(!ids.has(id),`Duplicate ${id}`);ids.add(id);}
  }
 }
 assert.equal(ids.size,100);
 await open('/properties?district=Smouha&intent=buy&sort=price-asc');
 assert.match(await main.locator('.results-heading').innerText(),/2 homes/);
 await open('/properties?district=New%20Cairo&beds=4&min=10000000&max=20000000&area=300&type=villa');
 assert.ok(await main.locator('.property-card').count()>0);
 await open('/properties?intent=rent&district=Sidi%20Bishr&view=map');
 await main.locator('.leaflet-marker-icon').first().waitFor();
 const markers=await main.locator('.leaflet-marker-icon').count();assert.equal(markers,2);
 await main.locator('.leaflet-marker-icon').first().click();await main.locator('.leaflet-popup').waitFor();
 assert.match(await main.locator('.leaflet-popup').innerText(),/Sidi Bishr/);
 await page.waitForTimeout(1500);
 const loadedTiles=await main.locator('.leaflet-tile').evaluateAll(els=>els.filter(e=>e.complete&&e.naturalWidth>0).length);assert.ok(loadedTiles>0);
 await open('/properties?intent=buy&page=999');
 assert.equal(await main.locator('.pagination [aria-current=page]').innerText(),'7');
 await main.locator('button[aria-label="Save home"]').first().click();
 await page.waitForURL('**/sign-in?next=**');
 await page.setViewportSize({width:390,height:844});await page.goto(base+'/properties?district=Smouha');
 assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth),true);
 assert.deepEqual(errors,[]);
 console.log(JSON.stringify({base,uniqueProperties:ids.size,pagination:'7 sale pages / 5 rental pages',filters:'passed',mapMarkers:markers,loadedTiles,anonymousSaveRedirect:'passed',mobileOverflow:'none',pageErrors:errors}));
 await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
