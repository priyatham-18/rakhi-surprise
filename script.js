const song=document.getElementById("song");
const musicPill=document.getElementById("musicPill");
const scenes=[...document.querySelectorAll(".scene")];

function show(id){
  scenes.forEach(s=>s.classList.toggle("active",s.id===id));
}

function startMusic(){
  song.volume=.55;
  song.play().then(()=>{
    musicPill.classList.add("show");
  }).catch(()=>{});
}

document.getElementById("enterBtn").onclick=()=>{
  startMusic();
  show("memories");
};

const photos = [
  {
    src: "assets/photos/memory-1.png",
    caption: "The little us. The beginning of everything. ❤️"
  },
  {
    src: "assets/photos/memory-2.png",
    caption: "The chaos, the laughter, and the memories nobody else understands. 😂❤️"
  },
  {
    src: "assets/photos/memory-3.png",
    caption: "Growing up changed a lot of things. Our bond wasn't one of them. 🫂"
  },
  {
    src: "assets/photos/memory-4.png",
    caption: "Growing up together, one memory at a time. 🫂❤️"
  },
  {
    src: "assets/photos/memory-5.png",
    caption: "Some memories never get old. ✨"
  },
  {
    src: "assets/photos/memory-6.png",
    caption: "Even the silly moments became my favourite memories. 💕"
  },
  {
    src: "assets/photos/memory-7.png",
    caption: "Just us being us. No explanation needed. ❤️"
  },
  {
    src: "assets/photos/memory-8.png",
    caption: "Always there for each other, through every little thing. 🫂"
  },
  {
    src: "assets/photos/memory-9.png",
    caption: "And somehow, every picture tells a story of us. 💖"
  }
];

let index = 0;
let index=0;
const img=document.getElementById("memoryImage");
const caption=document.getElementById("caption");
const number=document.getElementById("photoNumber");
const dots=document.getElementById("dots");

photos.forEach((_,i)=>{
  const d=document.createElement("span");
  d.className="dot"+(i===0?" on":"");
  d.onclick=()=>setPhoto(i);
  dots.appendChild(d);
});

function setPhoto(i){
  index=(i+photos.length)%photos.length;
  const card=document.getElementById("photoCard");
  card.style.opacity="0";
  card.style.transform=`translateX(${index%2?-25:25}px) rotate(${index%2?-2:2}deg)`;
  setTimeout(()=>{
    img.src=photos[index].src;
    caption.textContent=photos[index].caption;
    number.textContent=String(index+1).padStart(2,"0");
    [...dots.children].forEach((d,j)=>d.classList.toggle("on",j===index));
    card.style.opacity="1";
    card.style.transform=`translateX(0) rotate(${index%2?-2:2}deg)`;
  },250);
}
document.getElementById("prevBtn").onclick=()=>setPhoto(index-1);
document.getElementById("nextBtn").onclick=()=>setPhoto(index+1);

document.getElementById("continueBtn").onclick=()=>show("letter");
document.getElementById("revealBtn").onclick=()=>{
  show("finale");
  burst();
};

const musicBtn=document.getElementById("musicBtn");
musicBtn.onclick=()=>{
  if(song.paused){song.play();musicBtn.innerHTML="♫ <span>Music on</span>";}
  else{song.pause();musicBtn.innerHTML="♫ <span>Music off</span>";}
};

function burst(){
  const symbols=["❤️","💖","💕","✨","🎀","✦"];
  for(let i=0;i<80;i++){
    const e=document.createElement("div");
    e.textContent=symbols[Math.floor(Math.random()*symbols.length)];
    e.style.position="fixed";
    e.style.left=Math.random()*100+"vw";
    e.style.bottom="-30px";
    e.style.fontSize=12+Math.random()*24+"px";
    e.style.zIndex=25;
    e.style.pointerEvents="none";
    e.style.transition="transform 5s linear,opacity 5s linear";
    document.body.appendChild(e);
    requestAnimationFrame(()=>{e.style.transform=`translateY(-110vh) rotate(${Math.random()*500}deg)`;e.style.opacity=0});
    setTimeout(()=>e.remove(),5200);
  }
}

const pc=document.getElementById("particles");
for(let i=0;i<35;i++){
  const p=document.createElement("span");
  p.className="p";
  const s=1+Math.random()*3;
  p.style.width=p.style.height=s+"px";
  p.style.left=Math.random()*100+"%";
  p.style.animationDuration=8+Math.random()*12+"s";
  p.style.animationDelay=-Math.random()*12+"s";
  pc.appendChild(p);
}
