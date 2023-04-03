<template>
  <canvas id="colorPanel" class="h-screen fixed w-screen"></canvas>
  <div class="container">
    <div class="p-4">
      <svg t="1679300417962" class="icon mb-4 cursor-pointer" @click="back" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2752" width="24" height="24">-->
        <path d="M675.328 117.717333A425.429333 425.429333 0 0 0 512 85.333333C276.352 85.333333 85.333333 276.352 85.333333 512s191.018667 426.666667 426.666667 426.666667 426.666667-191.018667 426.666667-426.666667c0-56.746667-11.093333-112-32.384-163.328a21.333333 21.333333 0 0 0-39.402667 16.341333A382.762667 382.762667 0 0 1 896 512c0 212.074667-171.925333 384-384 384S128 724.074667 128 512 299.925333 128 512 128c51.114667 0 100.8 9.984 146.986667 29.12a21.333333 21.333333 0 0 0 16.341333-39.402667z m-324.693333 373.013334l174.464-174.485334a21.141333 21.141333 0 0 0-0.192-29.973333 21.141333 21.141333 0 0 0-29.973334-0.192l-208.256 208.256a20.821333 20.821333 0 0 0-6.122666 14.976c0.042667 5.418667 2.133333 10.837333 6.314666 14.997333l211.178667 211.2a21.141333 21.141333 0 0 0 29.973333 0.213334 21.141333 21.141333 0 0 0-0.213333-29.973334l-172.629333-172.629333 374.997333 2.602667a20.693333 20.693333 0 0 0 21.034667-21.034667 21.482667 21.482667 0 0 0-21.333334-21.333333l-379.242666-2.624z" fill="white" p-id="2753"></path>
      </svg>
    </div>
    <div class="row">
      <color-disc size="300" format="hex" id="colorDisc"></color-disc>
    </div>
    <div class="row">
      <h1 id="color">{{color}}</h1>
    </div>
    <div class="row">
      <div class="choose">
        <label for="format">Format : </label>
        <select class="format" id="format">
          <option value="hex" selected>Hex</option>
          <option value="hsl">Hsl</option>
          <option value="rgb">Rgb</option>
        </select>
      </div>
    </div>
  </div>
</template>

<script setup>
import anime from "animejs/lib/anime.es.js";
import { useRouter } from "vue-router";

let c = null;
let ctx = null;
let disc = null;
let format = null;
let cH;
let cW;
let bgColor = "red";
const animations = [];
let ratio;
const router = useRouter();

const color = ref("");

onMounted(() => {
  c = document.getElementById("colorPanel");
  disc = document.getElementById('colorDisc');
  format = document.getElementById('format');
  ctx = c.getContext("2d");
  window.addEventListener("resize", resizeCanvas);
  addClickListeners();
  resizeCanvas();
  observeColor();
  setColorFormat();
});

function updateColor() {
  const newColor = disc.getAttribute('color');
  changeColor(color.value, newColor, {
    offsetX: 0,
    offsetY: 0
  })
  color.value = newColor
}

function observeColor() {
  updateColor();
  const config = { attributes: true };
  const callback = function(list, observer) {
    list.forEach((mutation) => {
      if (mutation.attributeName === 'color')
        updateColor();
    });
  }
  const observer = new MutationObserver(callback);
  observer.observe(disc, config);
}

function setColorFormat() {
  format.addEventListener('change', (e) => {
    disc.setAttribute('format', e.target.value);
  });
}

const back = () => {
  router.push({ path: "/" });
};

const animate = anime({
  duration: Infinity,
  update: () => {
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, cW, cH);
    animations.forEach((anim) => {
      anim.animatables.forEach((animatable) => {
        animatable.target.draw();
      });
    });
  }
});

const colorPicker = {
  next: () => {
    let hex = Math.floor(Math.random() * 16777216).toString(16); //生成ffffff以内16进制数
    while (hex.length < 6) { //while循环判断hex位数，少于6位前面加0凑够6位
      hex = "0" + hex;
    }
    color.value = "#" + hex;
    return color.value;
  },
  current: () => {
    return color.value;
  }
};

class Circle {
  constructor (opts) {
    this.x = opts.x;
    this.y = opts.y;
    this.r = opts.r;
    this.fill = opts.fill;
    this.stroke = opts.stroke;
    this.opacity = opts.opacity;
  }

  draw () {
    ctx.globalAlpha = this.opacity || 1;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);
    if (this.stroke) {
      ctx.strokeStyle = this.stroke.color;
      ctx.lineWidth = this.stroke.width;
      ctx.stroke();
    }
    if (this.fill) {
      ctx.fillStyle = this.fill;
      ctx.fill();
    }
    ctx.closePath();
    ctx.globalAlpha = 1;
  }
}

const removeAnimation = (animation) => {
  const index = animations.indexOf(animation);
  if (index > -1) animations.splice(index, 1);
};

const calcPageFillRadius = (x, y) => {
  const l = Math.max(x - 0, cW - x);
  const h = Math.max(y - 0, cH - y);
  return Math.sqrt(Math.pow(l, 2) + Math.pow(h, 2));
};

const addClickListeners = () => {
  document.getElementById("colorPanel").addEventListener("mousedown", (e) => {
    e.preventDefault();
    if (e.touches && !e.offsetX) { // fixes android issue that broke... everything, basically
      e.offsetX = e.touches[0].offsetX;
      e.offsetY = e.touches[0].offsetY;
    }
    const currentColor = colorPicker.current();
    const nextColor = colorPicker.next();
    changeColor(currentColor, nextColor, e);
  });
};

const changeColor = (currentColor, nextColor, e) => {
  const targetR = calcPageFillRadius(e.offsetX, e.offsetY);
  const rippleSize = Math.min(200, (cW * .4));
  const minCoverDuration = 750;

  const pageFill = new Circle({
    x: e.offsetX,
    y: e.offsetY,
    r: 0,
    fill: nextColor
  });
  const fillAnimation = anime({
    targets: pageFill,
    r: targetR,
    duration: Math.max(targetR / 2, minCoverDuration),
    easing: "easeOutCubic",
    complete: () => {
      bgColor = pageFill.fill;
      removeAnimation(fillAnimation);
    }
  });

  const ripple = new Circle({
    x: e.offsetX,
    y: e.offsetY,
    r: 0,
    fill: currentColor,
    stroke: {
      width: 3,
      color: currentColor
    },
    opacity: 1
  });
  const rippleAnimation = anime({
    targets: ripple,
    r: rippleSize,
    opacity: 0,
    easing: "easeOutExpo",
    duration: 900,
    complete: removeAnimation
  });

  const particles = [];
  for (let i = 0; i < 32; i++) {
    const particle = new Circle({
      x: e.offsetX,
      y: e.offsetY,
      fill: currentColor,
      r: anime.random(24, 48)
    });
    particles.push(particle);
  }
  const particlesAnimation = anime({
    targets: particles,
    x: (particle) => {
      return particle.x + anime.random(rippleSize, -rippleSize);
    },
    y: (particle) => {
      return particle.y + anime.random(rippleSize * 1.15, -rippleSize * 1.15);
    },
    r: 0,
    easing: "easeOutExpo",
    duration: anime.random(1000, 1300),
    complete: removeAnimation
  });
  animations.push(fillAnimation, rippleAnimation, particlesAnimation);
}

const extend = (a, b) => {
  for (const key in b) {
    if (b.hasOwnProperty(key)) {
      a[key] = b[key];
    }
  }
  return a;
};

const resizeCanvas = () => {
  const devicePixelRatio = window.devicePixelRatio || 1;
  const backingStoreRatio =
    ctx.webkitBackingStorePixelRatio ||
    ctx.mozBackingStorePixelRatio ||
    ctx.msBackingStorePixelRatio ||
    ctx.oBackingStorePixelRatio ||
    ctx.backingStorePixelRatio || 1;

  ratio = devicePixelRatio / backingStoreRatio;
  cW = window.innerWidth;
  cH = window.innerHeight;
  c.width = cW * ratio;
  c.height = cH * ratio;
  ctx.scale(ratio, ratio);
};
</script>

<style scoped>
.container {
  width: 50%;
  height: auto;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  background-color: #3e3e3e;
  border-radius: 0 0 16px 16px;
  box-shadow: 0px 0px 9px 9px rgba(0, 0, 0, 0.25);
  position: relative;
  z-index: 999;
}

.container h1 {
  font-size: 24px;
}

.container label, .container select, .container option {
  font-size: 16px;
}

.container h1, .container label {
  color: white;
}

.row {
  width: 100%;
  min-height: 100px;
  padding: 10px;
  box-sizing: border-box;
  display: flex;
  align-items: flex-start;
  justify-content: center;
}

.row:nth-child(3) {
  margin-top: 200px;
}
</style>
