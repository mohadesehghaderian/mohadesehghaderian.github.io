// ===== Basics =====
const $ = (q, d=document)=>d.querySelector(q);
const $$ = (q, d=document)=>Array.from(d.querySelectorAll(q));
$('#year').textContent = new Date().getFullYear();

// Light/Dark toggle
$('#theme-toggle').addEventListener('click', ()=>{
  document.documentElement.classList.toggle('light');
  const dark = !document.documentElement.classList.contains('light');
  $('#theme-toggle').textContent = dark ? '🌙' : '☀️';
});

// ===== Particle Background (very light) =====
(() => {
  const c = document.getElementById('hero-bg');
  const ctx = c.getContext('2d');
  const DPR = Math.min(2, window.devicePixelRatio || 1);
  let w, h, particles;

  function resize(){
    w = c.width  = Math.round(innerWidth  * DPR);
    h = c.height = Math.round((document.querySelector('.hero').offsetHeight) * DPR);
    ctx.scale(DPR, DPR);
    make();
  }
  function make(){
    const count = Math.min(120, Math.round(innerWidth/12));
    particles = [...Array(count)].map(()=>({
      x: Math.random()*innerWidth,
      y: Math.random()*h/DPR,
      r: Math.random()*1.6 + .3,
      vx: (Math.random()-.5)*.2,
      vy: Math.random()*.35 + .05,
      a: Math.random()*.4 + .2
    }));
  }
  function step(){
    ctx.clearRect(0,0,innerWidth,h/DPR);
    ctx.globalCompositeOperation='lighter';
    for(const p of particles){
      p.y += p.vy; p.x += p.vx;
      if(p.y > h/DPR) { p.y = -4; p.x = Math.random()*innerWidth; }
      if(p.x < -4) p.x = innerWidth+4;
      if(p.x > innerWidth+4) p.x = -4;

      const g = ctx.createRadialGradient(p.x,p.y,0,p.x,p.y,p.r*4);
      g.addColorStop(0, `rgba(48,230,206,${p.a})`);
      g.addColorStop(1, 'rgba(48,230,206,0)');
      ctx.fillStyle = g;
      ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2); ctx.fill();
    }
    requestAnimationFrame(step);
  }
  addEventListener('resize', resize);
  resize(); step();
})();

// ===== Typewriter (rotating interests) =====
const phrases = [
  'Industrial Microbiology',
  'Microbial Biotechnology',
  'Agricultural Biotechnology',
  'Genetic Engineering'
];
let idx=0, pos=0, dir=1, wait=0;
const tw = document.getElementById('typewriter');
function type(){
  if(wait>0){wait--;return requestAnimationFrame(type)}
  const text = phrases[idx];
  pos += dir;
  tw.textContent = text.slice(0,pos);
  if(pos===text.length){dir=-1; wait=25}
  if(pos===0){dir=1; idx=(idx+1)%phrases.length; wait=10}
  requestAnimationFrame(type);
}
type();

// ===== GSAP Reveal + Parallax =====
gsap.registerPlugin(ScrollTrigger);

// Hero parallax of background image
gsap.to('.hero-overlay', {
  yPercent: 8,
  ease: 'none',
  scrollTrigger: {
    trigger: '.hero',
    start: 'top top',
    end: 'bottom top',
    scrub: true
  }
});

// Section reveals
$$('[data-animate]').forEach(el=>{
  const delay = parseFloat(el.getAttribute('data-delay') || '0');
  gsap.fromTo(el,
    {y:14, autoAlpha:0},
    {
      y:0, autoAlpha:1, duration:0.6, ease:'power2.out', delay,
      scrollTrigger: {trigger: el, start: 'top 85%'}
    }
  );
});

// Counters (GPA/year)
function animateCounter(el){
  const to = parseFloat(el.dataset.to);
  const decimals = parseInt(el.dataset.decimals || 0, 10);
  const obj = {v: 0};
  gsap.to(obj, {
    v: to, duration: 1.4, ease: 'power2.out',
    onUpdate(){ el.textContent = obj.v.toFixed(decimals); }
  });
}
$$('.counter').forEach(el=>{
  ScrollTrigger.create({
    trigger: el.closest('.stat-card'),
    start: 'top 85%',
    once: true,
    onEnter: ()=> animateCounter(el)
  });
});

// Tilt on hover
VanillaTilt.init($$('.lift'), {max:6, speed:500, glare:true, 'max-glare': .15});
