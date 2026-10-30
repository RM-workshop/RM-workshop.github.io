(() => {
  const host = document.querySelector('.hero-motion');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const ns = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(ns, 'svg');
  svg.setAttribute('viewBox', '0 0 1200 560');
  svg.setAttribute('preserveAspectRatio', 'xMidYMid slice');
  svg.innerHTML = `<defs><linearGradient id="quiet"><stop offset="0" stop-color="white"/><stop offset=".42" stop-color="white"/><stop offset=".62" stop-color="white" stop-opacity="0"/></linearGradient></defs><rect width="1200" height="560" fill="#ebf7fc"/><g id="floor" stroke="#cfe5ef" stroke-width=".7"></g><g id="arms"></g><g id="signals" fill="#00a8c6"></g><rect width="1200" height="560" fill="url(#quiet)"/>`;
  host.replaceChildren(svg);
  const floor=svg.querySelector('#floor'), arms=svg.querySelector('#arms'), signals=svg.querySelector('#signals');
  for(let x=-400;x<1600;x+=70)floor.innerHTML+=`<path d="M${600+(x-600)*.3} 240 L${x} 560"/>`;
  for(const y of [260,287,322,369,429,510])floor.innerHTML+=`<path d="M0 ${y} H1200"/>`;
  const ease=x=>.5-.5*Math.cos(Math.PI*x);
  function draw(seconds){
    const p=(seconds%8)/8;
    // Approach, close gripper, lift, hold, lower, release, retreat.
    let y=310, lift=0, grip=32;
    if(p<.2)y=310+50*ease(p/.2);
    else if(p<.28){y=360;grip=32-9*ease((p-.2)/.08);}
    else if(p<.48){lift=95*ease((p-.28)/.2);y=360-lift;grip=23;}
    else if(p<.6){lift=95;y=265;grip=23;}
    else if(p<.8){lift=95*(1-ease((p-.6)/.2));y=360-lift;grip=23;}
    else if(p<.88){y=360;grip=23+9*ease((p-.8)/.08);}
    else y=360-50*ease((p-.88)/.12);
    arms.innerHTML=[785,1050].map((cx,i)=>{
      const color=i?'#00a8c6':'#12375b', bx=cx, by=433, tx=cx+65,ty=y;
      const dx=tx-bx,dy=ty-by,r=Math.hypot(dx,dy),l1=110,l2=125;
      const a=Math.atan2(dy,dx)-Math.acos(Math.max(-1,Math.min(1,(r*r+l1*l1-l2*l2)/(2*r*l1))));
      const ex=bx+l1*Math.cos(a),ey=by+l1*Math.sin(a);
      let links='';
      for(const [x1,y1,x2,y2] of [[bx,by,ex,ey],[ex,ey,tx,ty]]){
        if(!i)links+=`<path d="M${x1} ${y1} L${x2} ${y2}" stroke="${color}" stroke-width="28"/><path d="M${x1-4} ${y1} L${x2-4} ${y2}" stroke="#5f86a0" stroke-width="6"/>`;
        else {const vx=x2-x1,vy=y2-y1,l=Math.hypot(vx,vy),nx=-vy/l*13,ny=vx/l*13;
          links+=`<path d="M${x1+nx} ${y1+ny} L${x2+nx} ${y2+ny} L${x2-nx} ${y2-ny} L${x1-nx} ${y1-ny} Z" fill="none" stroke="${color}" stroke-width="2"/>`;
          for(let j=0;j<6;j++)links+=`<path d="M${x1+vx*j/6+nx} ${y1+vy*j/6+ny} L${x1+vx*(j+1)/6-nx} ${y1+vy*(j+1)/6-ny}" stroke="${color}" stroke-width="1"/>`;
        }
      }
      const boxY=390-lift;
      return `<g stroke-linecap="round" stroke-linejoin="round"><ellipse cx="${cx}" cy="440" rx="63" ry="14" fill="none" stroke="${color}" stroke-width="2"/><rect x="${cx-34}" y="408" width="68" height="27" fill="${i?'none':color}" stroke="${color}" stroke-width="2"/>${links}${[[bx,by],[ex,ey],[tx,ty]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="14" fill="#ebf7fc" stroke="${color}" stroke-width="3"/><circle cx="${x}" cy="${y}" r="5" fill="${color}"/>`).join('')}<path d="M${tx} ${boxY} l25 13 -25 13 -25 -13 Z" fill="${i?'#ebf7fc':'#ffa54b'}" stroke="#ff831c" stroke-width="1.5"/><path d="M${tx-25} ${boxY+13} v28 l25 14 25 -14 v-28 M${tx} ${boxY+26} v29" fill="none" stroke="${color}" stroke-width="2"/><path d="M${tx} ${ty+12} L${tx-grip} ${ty+27} v17 h7 M${tx} ${ty+12} L${tx+grip} ${ty+27} v17 h-7" fill="none" stroke="${color}" stroke-width="4"/></g>`;
    }).join('');
    signals.innerHTML=Array.from({length:8},(_,k)=>{const u=(seconds/5+k/8)%1;return `<circle cx="${830+160*u}" cy="${225-25*Math.sin(u*Math.PI)}" r="2.5"/>`;}).join('');
  }
  let frame, start;
  function tick(now){if(start===undefined)start=now;draw((now-start)/1000);frame=requestAnimationFrame(tick);}
  function sync(){cancelAnimationFrame(frame);start=undefined;if(reduced.matches)draw(4);else frame=requestAnimationFrame(tick);}
  reduced.addEventListener('change',sync); sync();
})();
