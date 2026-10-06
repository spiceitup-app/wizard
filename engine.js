(function(root){
const colors=['#FFCA45','#7CBDED','#BB9EEA','#73D5B3','#EF8D9E','#E7AA76','#83DCE5','#C9D783','#8D9FED','#DF9DDA','#A4C5A8','#F2C9B4','#C0B9F0','#69B3AB','#D69478','#CEE7F0','#D3AFCA','#AAB973','#F2DD91','#B7BBC5'];
const cards=c=>Number(c.deck);
const maximum=c=>Math.floor(cards(c)/Math.max(1,c.players.filter(p=>p.name.trim()).length));
const points=(b,a)=>b===a?20+10*a:-10*Math.abs(b-a);
const ordered=g=>Object.values(g.rounds).filter(r=>r.done).sort((a,b)=>a.n-b.n);
const next=g=>{for(let n=1;n<=g.config.limit;n++)if(!g.rounds[n]?.done)return n;return null};
const ranking=g=>g.config.players.map((p,i)=>{let rs=ordered(g),seq=0,streak=0;let hits=0,total=0,tricks=0,error=0;rs.forEach(r=>{let b=r.bids[i],a=r.actual[i];total+=points(b,a);tricks+=a;error+=Math.abs(b-a);if(b===a){hits++;seq++;streak=Math.max(streak,seq)}else seq=0});return {...p,i,color:colors[i%colors.length],total,hits,tricks,error,streak,rate:rs.length?Math.round(hits/rs.length*100):0}}).sort((a,b)=>b.total-a.total);
const validBids=(rule,b,n)=>rule==='exact'?b.reduce((a,x)=>a+x,0)===n:rule.startsWith('plus')?b.reduce((a,x)=>a+x,0)!==n:true;
root.W={colors,cards,maximum,points,ordered,next,ranking,validBids};if(typeof module!=='undefined')module.exports=root.W;
})(typeof window==='undefined'?globalThis:window);
