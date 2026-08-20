const song = document.getElementById("song");
const musicPill = document.getElementById("musicPill");
const scenes = [...document.querySelectorAll(".scene")];

function show(id) {
  scenes.forEach(s => {
    s.classList.toggle("active", s.id === id);
  });
}


/* =========================
   MUSIC
========================= */

function startMusic() {

  if (!song) return;

  song.volume = 0.55;

  song.play()
    .then(() => {

      if (musicPill) {
        musicPill.classList.add("show");
      }

    })
    .catch(() => {});

}


/* =========================
   ENTER
========================= */

const enterBtn =
  document.getElementById("enterBtn");

if (enterBtn) {

  enterBtn.onclick = () => {

    startMusic();

    show("memories");

  };

}


/* =========================
   PHOTOS
========================= */

const photos = [

  {
    src: "assets/photos/memory-1.png",
    caption:
      "The little us. The beginning of everything. ❤️"
  },

  {
    src: "assets/photos/memory-2.png",
    caption:
      "The chaos, the laughter, and the memories nobody else understands. 😂❤️"
  },

  {
    src: "assets/photos/memory-3.png",
    caption:
      "Growing up changed a lot of things. Our bond wasn't one of them. 🫂"
  },

  {
    src: "assets/photos/photos/memory-4.png",
    caption:
      "Growing up together, one memory at a time. 🫂❤️"
  },

  {
    src: "assets/photos/photos/memory-5.png",
    caption:
      "Some memories never get old. ✨"
  },

  {
    src: "assets/photos/photos/memory-6.png",
    caption:
      "Even the silly moments became my favourite memories. 💕"
  },

  {
    src: "assets/photos/photos/memory-7.png",
    caption:
      "Just us being us. No explanation needed. ❤️"
  },

  {
    src: "assets/photos/photos/memory-8.png",
    caption:
      "Always there for each other, through every little thing. 🫂"
  },

  {
    src: "assets/photos/photos/memory-9.png",
    caption:
      "And somehow, every picture tells a story of us. 💖"
  }

];


let index = 0;

let startX = 0;

let currentX = 0;

let dragging = false;


/* =========================
   ELEMENTS
========================= */

const card =
  document.getElementById("photoCard");

const img =
  document.getElementById("memoryImage");

const caption =
  document.getElementById("caption");

const number =
  document.getElementById("photoNumber");


/* =========================
   LOAD PHOTO
========================= */

function loadPhoto(i) {

  index =
    (i + photos.length) % photos.length;


  if (img) {

    img.src =
      photos[index].src;

  }


  if (caption) {

    caption.textContent =
      photos[index].caption;

  }


  if (number) {

    number.textContent =
      `${String(index + 1).padStart(2, "0")} / ${String(photos.length).padStart(2, "0")}`;

  }


  /* PRELOAD NEXT */

  const next =
    new Image();

  next.src =
    photos[(index + 1) % photos.length].src;


  /* PRELOAD PREVIOUS */

  const previous =
    new Image();

  previous.src =
    photos[
      (index - 1 + photos.length)
      % photos.length
    ].src;

}


/* =========================
   SWIPE
========================= */

function swipe(direction) {

  if (!card) return;


  /* LAST PHOTO */

  if (
    direction === "left" &&
    index === photos.length - 1
  ) {

    card.style.transition =
      "transform .5s ease, opacity .5s ease";

    card.style.transform =
      "translateX(-120%) rotate(-12deg)";

    card.style.opacity = "0";


    setTimeout(() => {

      show("letter");

      card.style.transition = "none";

      card.style.transform =
        "translateX(0) rotate(1deg)";

      card.style.opacity = "1";

    }, 500);


    return;

  }


  /* FIRST PHOTO + RIGHT SWIPE */

  if (
    direction === "right" &&
    index === 0
  ) {

    card.style.transition =
      "transform .35s ease";

    card.style.transform =
      "translateX(0) rotate(1deg)";

    return;

  }


  const move =
    direction === "left"
      ? "-120%"
      : "120%";


  const rotation =
    direction === "left"
      ? -12
      : 12;


  card.style.transition =
    "transform .45s cubic-bezier(.2,.8,.2,1), opacity .45s";


  card.style.transform =
    `translateX(${move}) rotate(${rotation}deg)`;


  card.style.opacity = "0";


  setTimeout(() => {


    if (direction === "left") {

      index++;

    } else {

      index--;

    }


    loadPhoto(index);


    card.style.transition =
      "none";


    card.style.transform =
      direction === "left"
        ? "translateX(100%) rotate(12deg)"
        : "translateX(-100%) rotate(-12deg)";


    card.style.opacity = "0";


    requestAnimationFrame(() => {


      requestAnimationFrame(() => {

        card.style.transition =
          "transform .5s cubic-bezier(.2,.8,.2,1), opacity .5s";


        card.style.transform =
          "translateX(0) rotate(1deg)";


        card.style.opacity = "1";

      });

    });


  }, 450);

}


/* =========================
   TOUCH SWIPE
========================= */

if (card) {


  card.addEventListener(
    "touchstart",
    e => {

      startX =
        e.touches[0].clientX;

      currentX =
        startX;

      dragging = true;

      card.style.transition =
        "none";

    },
    { passive: true }
  );


  card.addEventListener(
    "touchmove",
    e => {

      if (!dragging) return;


      currentX =
        e.touches[0].clientX;


      const movement =
        currentX - startX;


      card.style.transform =
        `translateX(${movement}px) rotate(${movement * 0.035}deg)`;

    },
    { passive: true }
  );


  card.addEventListener(
    "touchend",
    () => {

      if (!dragging) return;


      dragging = false;


      const movement =
        currentX - startX;


      if (Math.abs(movement) > 80) {


        if (movement < 0) {

          swipe("left");

        } else {

          swipe("right");

        }


      } else {


        card.style.transition =
          "transform .35s cubic-bezier(.2,.8,.2,1)";


        card.style.transform =
          "translateX(0) rotate(1deg)";

      }

    }
  );

}


/* =========================
   DESKTOP MOUSE DRAG
========================= */

if (card) {


  card.addEventListener(
    "mousedown",
    e => {

      startX =
        e.clientX;

      currentX =
        startX;

      dragging = true;

      card.style.transition =
        "none";

    }
  );


  window.addEventListener(
    "mousemove",
    e => {

      if (!dragging) return;


      currentX =
        e.clientX;


      const movement =
        currentX - startX;


      card.style.transform =
        `translateX(${movement}px) rotate(${movement * 0.035}deg)`;

    }
  );


  window.addEventListener(
    "mouseup",
    () => {

      if (!dragging) return;


      dragging = false;


      const movement =
        currentX - startX;


      if (Math.abs(movement) > 100) {


        if (movement < 0) {

          swipe("left");

        } else {

          swipe("right");

        }


      } else {


        card.style.transition =
          "transform .35s cubic-bezier(.2,.8,.2,1)";


        card.style.transform =
          "translateX(0) rotate(1deg)";

      }

    }
  );

}


/* =========================
   KEYBOARD
========================= */

document.addEventListener(
  "keydown",
  e => {

    if (e.key === "ArrowRight") {

      swipe("left");

    }


    if (e.key === "ArrowLeft") {

      swipe("right");

    }

  }
);


/* =========================
   CONTINUE
========================= */

const continueBtn =
  document.getElementById("continueBtn");

if (continueBtn) {

  continueBtn.onclick =
    () => show("letter");

}


/* =========================
   FINAL REVEAL
========================= */

const revealBtn =
  document.getElementById("revealBtn");

if (revealBtn) {

  revealBtn.onclick =
    () => {

      show("finale");

      burst();

    };

}


/* =========================
   MUSIC BUTTON
========================= */

const musicBtn =
  document.getElementById("musicBtn");

if (musicBtn) {

  musicBtn.onclick =
    () => {

      if (!song) return;


      if (song.paused) {

        song.play();

        musicBtn.innerHTML =
          "♫ <span>Music on</span>";

      }

      else {

        song.pause();

        musicBtn.innerHTML =
          "♫ <span>Music off</span>";

      }

    };

}


/* =========================
   CONFETTI
========================= */

function burst() {

  const symbols = [
    "❤️",
    "💖",
    "💕",
    "✨",
    "🎀",
    "✦"
  ];


  for (
    let i = 0;
    i < 80;
    i++
  ) {

    const e =
      document.createElement("div");


    e.textContent =
      symbols[
        Math.floor(
          Math.random() *
          symbols.length
        )
      ];


    e.style.position =
      "fixed";

    e.style.left =
      Math.random() * 100 + "vw";

    e.style.bottom =
      "-30px";

    e.style.fontSize =
      12 + Math.random() * 24 + "px";

    e.style.zIndex =
      "25";

    e.style.pointerEvents =
      "none";

    e.style.transition =
      "transform 5s linear, opacity 5s linear";


    document.body.appendChild(e);


    requestAnimationFrame(() => {

      e.style.transform =
        `translateY(-110vh) rotate(${Math.random() * 500}deg)`;

      e.style.opacity =
        "0";

    });


    setTimeout(
      () => e.remove(),
      5200
    );

  }

}


/* =========================
   PARTICLES
========================= */

const pc =
  document.getElementById("particles");

if (pc) {

  for (
    let i = 0;
    i < 35;
    i++
  ) {

    const p =
      document.createElement("span");


    p.className =
      "p";


    const s =
      1 + Math.random() * 3;


    p.style.width =
      s + "px";

    p.style.height =
      s + "px";


    p.style.left =
      Math.random() * 100 + "%";


    p.style.animationDuration =
      8 + Math.random() * 12 + "s";


    p.style.animationDelay =
      -Math.random() * 12 + "s";


    pc.appendChild(p);

  }

}


/* =========================
   INITIAL PHOTO
========================= */

loadPhoto(0);
