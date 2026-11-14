import assert from 'node:assert/strict';
import {places} from '../assets/data-v2.js';
import {filterPlaces} from '../assets/filter-v2.js';
const handlers={};const inputs=Object.fromEntries(['q','region','style','count','empty'].map(k=>['#'+k,{value:'',textContent:'',hidden:false}]));const cards=places.map(p=>({dataset:{id:p.id},hidden:false}));const form={addEventListener:(t,f)=>handlers[t]=f};globalThis.document={querySelector:q=>q==='#filters'?form:inputs[q],querySelectorAll:q=>{assert.equal(q,'.card');return cards}};
await import('../assets/app-v2.js');const visible=()=>cards.filter(c=>!c.hidden).map(c=>c.dataset.id);
for(const p of places){inputs['#q'].value=p.name;handlers.input();assert.deepEqual(visible(),[p.id]);}
inputs['#q'].value='  크로아티아  ';handlers.input();assert.deepEqual(visible(),['plitvice']);
inputs['#q'].value='';for(const region of ['',...new Set(places.map(p=>p.region))])for(const style of ['',...new Set(places.map(p=>p.style))]){inputs['#region'].value=region;inputs['#style'].value=style;handlers.change();assert.deepEqual(visible(),places.filter(p=>(!region||p.region===region)&&(!style||p.style===style)).map(p=>p.id));}
inputs['#q'].value='없는장소xyz';handlers.input();assert.equal(visible().length,0);assert.equal(inputs['#empty'].hidden,false);assert.equal(inputs['#count'].textContent,'0개의 장소');
let prevented=false;handlers.reset({preventDefault(){prevented=true}});assert(prevented);assert.equal(visible().length,6);for(const k of ['q','region','style'])assert.equal(inputs['#'+k].value,'');assert.equal(inputs['#empty'].hidden,true);handlers.reset({preventDefault(){}});assert.equal(visible().length,6);
let submit=false;handlers.submit({preventDefault(){submit=true}});assert(submit);assert.equal(filterPlaces(places,'', '국내','자연').length,0);
console.log('PASS Travel: all six destination searches; trim; every region/style combination; empty/count; repeated explicit reset; submit prevention.');
