export function filterPlaces(places,q='',region='',style=''){
 const search=q.trim().toLocaleLowerCase();
 return places.filter(p=>(!region||p.region===region)&&(!style||p.style===style)&&[p.name,p.country,p.caption,p.body].join(' ').toLocaleLowerCase().includes(search));
}
