import type {Property,PropertyType} from './types';
export const photos=Array.from({length:8},(_,i)=>`/images/property-${i}.webp`);
const locations=[{district:'New Cairo',lat:30.0171,lng:31.4859,city:'Cairo'},{district:'Sheikh Zayed',lat:30.044,lng:30.981,city:'Giza'},{district:'Maadi',lat:29.9602,lng:31.2569,city:'Cairo'},{district:'Zamalek',lat:30.0611,lng:31.2191,city:'Cairo'},{district:'Heliopolis',lat:30.095,lng:31.325,city:'Cairo'},{district:'6th of October',lat:29.956,lng:30.935,city:'Giza'}];
const titles=['A little more room to live','Light-filled living, thoughtfully designed','Your own quiet corner of the city','Open views. Endless possibilities.','Space for every part of your life','A fresh start in a familiar neighborhood'];
export const originalProperties:Property[]=Array.from({length:50},(_,i)=>{
 const loc=locations[i%6]; const property_type=(['villa','apartment','penthouse','apartment','duplex','studio'] as PropertyType[])[i%6]; const rent=i>=35;
 const bedrooms=property_type==='studio'?1:property_type==='villa'?4+(i%2):2+i%2; const area=property_type==='villa'?310+i*3:property_type==='studio'?65+i:145+i*4;
 return {id:`a0000000-0000-4000-8000-${String(i+1).padStart(12,'0')}`,title:i===0?'A modern sanctuary in New Cairo':i===1?'Sunlit apartment with a garden view':i===2?'A penthouse above it all':`${titles[i%6]} in ${loc.district}`,description:`Make yourself at home in ${loc.district}. This ${bedrooms}-bedroom ${property_type} pairs generous natural light with an easy, practical layout. Enjoy ${area} square meters of thoughtfully arranged space, a fully fitted kitchen and a private outdoor area. Located within reach of neighborhood cafés, schools and everyday essentials. This fictional property is part of Sakan’s portfolio demonstration; photography is illustrative.`,price:rent?18000+i*1700:property_type==='villa'?12500000+i*225000:property_type==='studio'?2100000+i*80000:4200000+i*175000,bedrooms,bathrooms:Math.min(bedrooms,4),area_sqm:area,property_type,listing_type:rent?'rent':'buy',address:`${12+i} ${['South Academy Street','Al Bustan Street','Road 9','Brazil Street','El Merghany Street','Al Wahat Road'][i%6]}`,city:loc.city,district:loc.district,latitude:loc.lat+(i%5)*0.003,longitude:loc.lng+(i%4)*0.004,images:[photos[i%8],photos[(i+3)%8],photos[(i+4)%8],photos[(i+5)%8]],features:property_type==='villa'?['Private pool','Garden','Parking','Air conditioning','Security']:['Balcony','Parking','Air conditioning','Security','Fitted kitchen'],is_featured:i<6,created_at:new Date(Date.UTC(2026,9,29-Math.floor(i/3))).toISOString()};
});
// The original 50 records and IDs above are retained verbatim.
const additionalLocations = [
 {district:'New Cairo',city:'Cairo',lat:30.0171,lng:31.4859,street:'South Investors Street',sale:65000,rent:220},
 {district:'Sheikh Zayed',city:'Giza',lat:30.044,lng:30.981,street:'Al Mostathmer Street',sale:62000,rent:210},
 {district:'Maadi',city:'Cairo',lat:29.9602,lng:31.2569,street:'Road 206',sale:48000,rent:240},
 {district:'Zamalek',city:'Cairo',lat:30.0611,lng:31.2191,street:'Ahmed Heshmat Street',sale:85000,rent:340},
 {district:'Heliopolis',city:'Cairo',lat:30.095,lng:31.325,street:'Baghdad Street',sale:45000,rent:180},
 {district:'6th of October',city:'Giza',lat:29.956,lng:30.935,street:'Al Mehwar Al Markazi',sale:38000,rent:150},
 {district:'Madinaty',city:'Cairo',lat:30.097,lng:31.635,street:'B6 Residential Avenue',sale:56000,rent:190},
 {district:'El Shorouk',city:'Cairo',lat:30.139,lng:31.628,street:'Al Shabab Street',sale:36000,rent:130},
 {district:'Smouha',city:'Alexandria',lat:31.215,lng:29.943,street:'Fawzy Moaz Street',sale:42000,rent:170},
 {district:'Sidi Bishr',city:'Alexandria',lat:31.252,lng:29.994,street:'Khaled Ibn Al Walid Street',sale:32000,rent:140},
];
// Apartments replace villas in dense central districts. All locations are approximate.
export const additionalProperties:Property[]=additionalLocations.flatMap((loc,d)=>
 Array.from({length:5},(_,t)=>{
  const i=d*5+t;
  const property_type:PropertyType=(['apartment','studio','duplex','penthouse',
   ['Zamalek','Heliopolis','Smouha','Sidi Bishr','Maadi'].includes(loc.district)?'apartment':'villa'] as PropertyType[])[t];
  const bedrooms=property_type==='studio'?1:property_type==='villa'?4+d%2:property_type==='duplex'?3+d%2:2+d%2;
  const area=property_type==='studio'?48+d*3:property_type==='villa'?325+d*12:property_type==='duplex'?225+d*7:property_type==='penthouse'?185+d*8:115+d*7+t*12;
  const rent=(d+t)%2===0;
  const outlook=['with a sunny balcony','near neighborhood gardens','with a spacious family lounge','with a private roof terrace','with open neighborhood views'][t];
  return {
   id:`a0000000-0000-4000-8000-${String(i+51).padStart(12,'0')}`,
   title:`${bedrooms}-bedroom ${property_type} ${outlook} in ${loc.district}`,
   description:`A fictional ${rent?'monthly rental':'sale'} home in ${loc.district}, ${loc.city}. This ${area} m² ${property_type} offers ${bedrooms} bedrooms, ${outlook.replace('with ','')}, a fitted kitchen and practical living space close to everyday services. ${property_type==='villa'?'A private garden and covered parking provide room outdoors.':'Lift access and a secure building entrance make daily arrivals easy.'} This sample listing is for the Sakan portfolio demonstration only; photography is illustrative and does not depict the address. Map coordinates show an approximate neighborhood location.`,
   price:Math.round(area*(rent?loc.rent:loc.sale)*(1+t*0.035)/500)*500,
   bedrooms,bathrooms:property_type==='studio'?1:Math.min(bedrooms,4),area_sqm:area,
   property_type,listing_type:rent?'rent':'buy',address:`${21+i} ${loc.street}`,
   city:loc.city,district:loc.district,
   latitude:loc.lat+(t-2)*0.0012,longitude:loc.lng+(t-2)*0.001,
   images:[photos[(i+2)%8],photos[(i+5)%8],photos[(i+6)%8],photos[(i+7)%8]],
   features:property_type==='villa'?['Private garden','Covered parking','Air conditioning','Security','Fitted kitchen']:['Lift','Balcony','Air conditioning','Security','Fitted kitchen'],
   is_featured:false,created_at:new Date(Date.UTC(2026,9,28-Math.floor(i/5))).toISOString(),
  };
 }));
export const demoProperties:Property[]=[...originalProperties,...additionalProperties];
export const formatPrice=(p:number)=>new Intl.NumberFormat('en-EG').format(p);
export const shortPrice=(p:number)=>p>=1e6?`${(p/1e6).toFixed(1)}M`:`${Math.round(p/1000)}K`;
