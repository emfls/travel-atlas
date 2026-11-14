import {places} from './data.js';
import {filterPlaces} from './filter.js';
const form=document.querySelector('#filters');
function update(){const list=filterPlaces(places,document.querySelector('#q').value,document.querySelector('#region').value,document.querySelector('#style').value);const ids=new Set(list.map(p=>p.id));document.querySelectorAll('.card').forEach(card=>card.hidden=!ids.has(card.dataset.id));document.querySelector('#count').textContent=`${list.length}개의 장소`;document.querySelector('#empty').hidden=list.length!==0;}
form.addEventListener('input',update);form.addEventListener('change',update);form.addEventListener('submit',e=>e.preventDefault());form.addEventListener('reset',()=>queueMicrotask(update));
