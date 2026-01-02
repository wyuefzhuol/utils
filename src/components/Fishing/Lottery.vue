<template>
  <div class="lottery-box" id="lotteryBox">
    <div class="lottery-box-container">
      <ul></ul>
      <div class="lottery-box-controls">
        <button id="tipButton" class="tip-button">
          <span class="tip-button__text">Start</span>
          <div class="coin-wrapper">
            <div class="coin">
              <div class="coin__middle"></div>
              <div class="coin__back"></div>
              <div class="coin__front"></div>
            </div>
          </div>
        </button>
        <button @click="stop" v-if="isStart">Stop</button>
      </div>
    </div>
    <div class="lottery-manage-panel floating-panel">
      <h3>列表维护</h3>
      <input v-model="newHoliday" placeholder="添加，可逗号分隔批量添加" @keyup.enter="onAdd" />
      <input v-model="newHolidayIdx" placeholder="按数量添加" @keyup.enter="onAddIdx" />
      <button @click="febHolidays = [];rerenderList()">清除</button>
      <div>
        <div v-for="(item, idx) in febHolidays" class="flex justify-between">
          <span>{{`${idx + 1}: ${item}`}}</span>
          <span class="cursor-pointer" @click="onDelete(idx)">删除</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";

// 节日列表配置，便于维护
const holidayList = [
  "Dark Chocolate Day",
  "Groundhog Day",
  "Carrot Cake Day",
  "Wear Red Day",
  "Weatherperson's Day",
  "Chopsticks Day",
  "Periodic Table Day",
  "Kite Flying Day",
  "Pizza Day",
  "Umbrella Day",
  "Inventor's Day",
  "Global Movie Day",
  "Tortellini Day",
  "Valentine's Day",
  "Gumdrop Day",
  "Do a Grouch a Favor Day",
  "Cabbage Day",
  "Battery Day",
  "Chocolate Mint Day",
  "Love Your Pet Day",
  "President's Day",
  "Cook a Sweet Potato Day",
  "Tile Day",
  "Toast Day",
  "Clam Chowder Day",
  "Pistachio Day",
  "Polar Bear Day",
  "Tooth Fairy Day"
]
const febHolidays = ref([...holidayList]);
const ulEl = ref(null);
const tipButtons = ref(null);
const coin = ref(null);
const daynumber = ref(0);
const activeIndex = ref(0);
let job = ref(null);
let isStart = ref(false);
const newHoliday = ref("");
const newHolidayIdx = ref("");

const adjustDay = (nr) => {
  daynumber.value += nr;
  ulEl.value.style.setProperty("--currentDay", daynumber.value);
  const activeEl = document.querySelector("li.active");
  if (activeEl) activeEl.classList.remove("active");

  activeIndex.value = (activeIndex.value + nr + febHolidays.value.length) % febHolidays.value.length;
  const newActiveEl = document.querySelector(`li:nth-child(${activeIndex.value + 1})`);
  document.getElementById('lotteryBox').style.backgroundColor = window.getComputedStyle(
    newActiveEl
  ).backgroundColor;

  newActiveEl.classList.add("active");
}

function start() {
  isStart.value = true
  job.value = window.setInterval(function () {
    adjustDay(1)
  }, 50)
}

function stop() {
  isStart.value = false
  if (job.value) {
    window.clearInterval(job.value)
    job.value = null
    tipButtons.value.classList.remove('clicked', 'shrink-landing', 'coin-landed')
    setTimeout(() => {
      resetCoin()
    }, 300)
  }
}

const flipCoin = () => {
  coin.value.moveLoopCount = 0
  flipCoinLoop()
}

const resetCoin = () => {
  coin.value.style.setProperty('--coin-x-multiplier', 0)
  coin.value.style.setProperty('--coin-scale-multiplier', 0)
  coin.value.style.setProperty('--coin-rotation-multiplier', 0)
  coin.value.style.setProperty('--shine-opacity-multiplier', 0.4)
  coin.value.style.setProperty('--shine-bg-multiplier', '50%')
  coin.value.style.setProperty('opacity', 1)
  setTimeout(() => {
    tipButtons.value.clicked = false
  }, 300)
}

const flipCoinLoop = () => {
  coin.value.moveLoopCount++
  let percentageCompleted = coin.value.moveLoopCount / coin.value.maxMoveLoopCount
  coin.value.angle = -coin.value.maxFlipAngle * Math.pow((percentageCompleted - 1), 2) + coin.value.maxFlipAngle
  coin.value.style.setProperty('--coin-y-multiplier', -11 * Math.pow(percentageCompleted * 2 - 1, 4) + 11)
  coin.value.style.setProperty('--coin-x-multiplier', percentageCompleted)
  coin.value.style.setProperty('--coin-scale-multiplier', percentageCompleted * 0.6)
  coin.value.style.setProperty('--coin-rotation-multiplier', percentageCompleted * coin.value.sideRotationCount)
  coin.value.style.setProperty('--front-scale-multiplier', Math.max(Math.cos(coin.value.angle), 0))
  coin.value.style.setProperty('--front-y-multiplier', Math.sin(coin.value.angle))
  coin.value.style.setProperty('--middle-scale-multiplier', Math.abs(Math.cos(coin.value.angle), 0))
  coin.value.style.setProperty('--middle-y-multiplier', Math.cos((coin.value.angle + Math.PI / 2) % Math.PI))
  coin.value.style.setProperty('--back-scale-multiplier', Math.max(Math.cos(coin.value.angle - Math.PI), 0))
  coin.value.style.setProperty('--back-y-multiplier', Math.sin(coin.value.angle - Math.PI))
  coin.value.style.setProperty('--shine-opacity-multiplier', 4 * Math.sin((coin.value.angle + Math.PI / 2) % Math.PI) - 3.2)
  coin.value.style.setProperty('--shine-bg-multiplier', -40 * (Math.cos((coin.value.angle + Math.PI / 2) % Math.PI) - 0.5) + '%')
  if (coin.value.moveLoopCount < coin.value.maxMoveLoopCount) {
    if (coin.value.moveLoopCount === coin.value.maxMoveLoopCount - 6) tipButtons.value.classList.add('shrink-landing')
    window.requestAnimationFrame(flipCoinLoop)
  } else {
    tipButtons.value.classList.add('coin-landed')
    coin.value.style.setProperty('opacity', 0)
  }
}

const rerenderList = () => {
  // 重新渲染转盘
  if (!ulEl.value) return;
  ulEl.value.innerHTML = '';
  febHolidays.value.forEach((holiday, idx) => {
    const liEl = document.createElement("li");
    liEl.style.setProperty("--day_idx", idx);
    liEl.innerHTML = `<time>${idx + 1}</time><span>${holiday}</span>`;
    ulEl.value.append(liEl);
  });
  ulEl.value.style.setProperty("--rotateDegrees", -360 / febHolidays.value.length);
  adjustDay(0);
}

const onAdd = () => {
  if (newHoliday.value.trim()) {
    febHolidays.value = febHolidays.value.concat(newHoliday.value.trim().split(','));
    newHoliday.value = "";
    rerenderList();
  }
}
const onAddIdx = () => {
  if (newHolidayIdx.value.trim()) {
    const idx = parseInt(newHolidayIdx.value.trim());
    febHolidays.value = febHolidays.value.concat(Array.from({ length: idx }, (_, i) => 1 + i));
    newHolidayIdx.value = "";
    rerenderList();
  }
}
const onDelete = (idx) => {
  febHolidays.value.splice(idx, 1);
  rerenderList();
}

onMounted(() => {
  ulEl.value = document.querySelector("ul");
  febHolidays.value.forEach((holiday, idx) => {
    const liEl = document.createElement("li");
    liEl.style.setProperty("--day_idx", idx);
    liEl.innerHTML = `<time>${idx + 1}</time><span>${holiday}</span>`;
    ulEl.value.append(liEl);
  });
  ulEl.value.style.setProperty("--rotateDegrees", -360 / febHolidays.value.length);
  adjustDay(0);

  tipButtons.value = document.getElementById('tipButton');
  coin.value = tipButtons.value.querySelector('.coin')
  coin.value.maxMoveLoopCount = 90

  tipButtons.value.addEventListener('click', () => {
    if (tipButtons.value.clicked) return
    tipButtons.value.classList.add('clicked')
    // Wait to start flipping th coin because of the button tilt animation
    setTimeout(() => {
      // Randomize the flipping speeds just for fun
      coin.value.sideRotationCount = Math.floor(Math.random() * 5) * 90
      coin.value.maxFlipAngle = (Math.floor(Math.random() * 4) + 3) * Math.PI
      tipButtons.value.clicked = true
      flipCoin()
      start()
    }, 50)
  })
})
</script>

<style>
.lottery-box {
  width: 100%;
  min-height: calc(100vh - 128px);
  display: grid;
  place-items: center;
  overflow: hidden;
  font-family: sans-serif;
  background-color: rgb(6, 6, 6);
  background-image: linear-gradient(rgb(0, 0, 0, 0.5), rgb(0, 0, 0, 0.5));
  color: white;
  transition: background-color 500ms ease;
}

/* header */
.lottery-box header {
  position: absolute;
  z-index: 999;
  text-align: center;
  top: 15px;
  padding: 1rem;
  background: inherit;
}

.lottery-box .lottery-box-container {
  position: relative;
  width: min(400px, 100%);
}

/* holidays */
.lottery-box ul {
  list-style: none;
  width: 100%;
  height: 100%;
  position: relative;
  perspective: 900px;
  transform-style: preserve-3d;
}
.lottery-box ul > li {
  position: absolute;
  left: 50%;
  top: calc(50% - 1.2rem);
  --rotateX: calc(
    1deg * var(--rotateDegrees) * calc(var(--day_idx) - var(--currentDay))
  );
  transform: rotateX(var(--rotateX)) translateZ(190px) translateX(-50%)
  scale(var(--scale, 1));
  --hue: calc(var(--rotateDegrees) * var(--day_idx));
  background-color: hsl(var(--hue), 50%, var(--lightness, 50%));
  width: 70%;
  color: white;
  display: grid;
  grid-template-columns: 2.5rem auto;
  height: 2.4rem;
  transition: transform 500ms ease, background-color 500ms ease;
}

.lottery-box ul > li.active {
  --lightness: 30%;
  --scale: 1.1;
}
.lottery-box ul > li > * {
  display: grid;
  align-items: center;
}
.lottery-box li > time {
  text-align: center;
}
.lottery-box li > span {
  padding-inline-start: 0.5rem;
  color: white;
}

/* controls */
.lottery-box .lottery-box-controls {
  position: absolute;
  top: 50%;
  left: 100%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  gap: 0.125rem;
}
.lottery-box .lottery-box-controls button {
  padding: 10px 15px;
  font-size: 0.9rem;
  color: white;
  border: none;
  background: #39657e;
  cursor: pointer;
  border-radius: 0.25rem 0.25rem;
}
.lottery-box .lottery-box-controls button:hover,
.lottery-box .lottery-box-controls button:focus {
  background: rgb(6, 60, 131);
}
.lottery-box .lottery-box-controls button:active {
  transform: scale(0.9);
}
.lottery-box .border {
  width: 96%;
  height: 3em;
  border: 1px solid white;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.lottery-box .tip-button {
  background: none;
  border: 0;
  border-radius: 0.25rem 0.25rem;
  cursor: pointer;
  font-family: 'Quicksand', sans-serif;
  font-size: 0.75rem;
  font-weight: 600;
  height: 2.6rem;
  outline: 0;
  position: relative;
  top: 0;
  transform-origin: 0% 100%;
  transition: transform 50ms ease-in-out;
  width: 9.5rem;
  -webkit-tap-highlight-color: transparent;
}
.lottery-box .tip-button:active {
  transform: rotate(4deg);
}
.lottery-box .tip-button.clicked {
  animation: 150ms ease-in-out 1 shake;
  pointer-events: none;
}
.lottery-box .tip-button.clicked .tip-button__text {
  opacity: 0;
  transition: opacity 100ms linear 200ms;
}
.lottery-box .tip-button.clicked::before {
  height: 0.5rem;
  width: 60%;
}
.lottery-box .tip-button.clicked .coin {
  transition: margin-bottom 1s linear 200ms;
  margin-bottom: 0;
}
.lottery-box .tip-button.shrink-landing::before {
  transition: width 200ms ease-in;
  width: 0;
}
.lottery-box .tip-button.coin-landed::after {
  opacity: 1;
  transform: scale(1);
  transform-origin: 50% 100%;
}
.lottery-box .tip-button.coin-landed .coin-wrapper {
  background: radial-gradient(circle at 35% 97%, rgba(3, 16, 50, 0.4) 0.04rem, transparent 0.04rem), radial-gradient(circle at 45% 92%, rgba(3, 16, 50, 0.4) 0.04rem, transparent 0.02rem), radial-gradient(circle at 55% 98%, rgba(3, 16, 50, 0.4) 0.04rem, transparent 0.04rem), radial-gradient(circle at 65% 96%, rgba(3, 16, 50, 0.4) 0.06rem, transparent 0.06rem);
  background-position: center bottom;
  background-size: 100%;
  bottom: -1rem;
  opacity: 0;
  transform: scale(2) translateY(-10px);
}
.lottery-box .tip-button__text {
  color: #fff;
  margin-right: 1.8rem;
  opacity: 1;
  position: relative;
  transition: opacity 100ms linear 500ms;
  z-index: 3;
}
.lottery-box .tip-button::before {
  background: #031032;
  border-radius: 0.25rem;
  bottom: 0;
  content: '';
  display: block;
  height: 100%;
  left: 50%;
  position: absolute;
  transform: translateX(-50%);
  transition: height 250ms ease-in-out 400ms, width 250ms ease-in-out 300ms;
  width: 100%;
  z-index: 2;
}
.lottery-box .tip-button::after {
  bottom: -1rem;
  color: #031032;
  content: 'Thank you!';
  height: 110%;
  left: 0;
  opacity: 0;
  position: absolute;
  pointer-events: none;
  text-align: center;
  transform: scale(0);
  transform-origin: 50% 20%;
  transition: transform 200ms cubic-bezier(0, 0, 0.35, 1.43);
  width: 100%;
  z-index: 1;
}

.lottery-box .coin-wrapper {
  background: none;
  bottom: 0;
  height: 18rem;
  left: 0;
  opacity: 1;
  overflow: hidden;
  pointer-events: none;
  position: absolute;
  transform: none;
  transform-origin: 50% 100%;
  transition: opacity 200ms linear 100ms, transform 300ms ease-out;
  width: 100%;
}

.lottery-box .coin {
  --front-y-multiplier: 0;
  --back-y-multiplier: 0;
  --coin-y-multiplier: 0;
  --coin-x-multiplier: 0;
  --coin-scale-multiplier: 0;
  --coin-rotation-multiplier: 0;
  --shine-opacity-multiplier: 0.4;
  --shine-bg-multiplier: 50%;
  bottom: calc(var(--coin-y-multiplier) * 1rem - 3.5rem);
  height: 3.5rem;
  margin-bottom: 3.05rem;
  position: absolute;
  right: calc(var(--coin-x-multiplier) * 34% + 16%);
  transform: translateX(50%) scale(calc(0.4 + var(--coin-scale-multiplier))) rotate(calc(var(--coin-rotation-multiplier) * -1deg));
  transition: opacity 100ms linear 200ms;
  width: 3.5rem;
  z-index: 3;
}
.lottery-box .coin__front, .coin__middle, .coin__back, .coin::before, .coin__front::after, .coin__back::after {
  border-radius: 50%;
  box-sizing: border-box;
  height: 100%;
  left: 0;
  position: absolute;
  width: 100%;
  z-index: 3;
}
.lottery-box .coin__front {
  background: radial-gradient(circle at 50% 50%, transparent 50%, rgba(115, 124, 153, 0.4) 54%, #c2cadf 54%), linear-gradient(210deg, #8590b3 32%, transparent 32%), linear-gradient(150deg, #8590b3 32%, transparent 32%), linear-gradient(to right, #8590b3 22%, transparent 22%, transparent 78%, #8590b3 78%), linear-gradient(to bottom, #fcfaf9 44%, transparent 44%, transparent 65%, #fcfaf9 65%, #fcfaf9 71%, #8590b3 71%), linear-gradient(to right, transparent 28%, #fcfaf9 28%, #fcfaf9 34%, #8590b3 34%, #8590b3 40%, #fcfaf9 40%, #fcfaf9 47%, #8590b3 47%, #8590b3 53%, #fcfaf9 53%, #fcfaf9 60%, #8590b3 60%, #8590b3 66%, #fcfaf9 66%, #fcfaf9 72%, transparent 72%);
  background-color: #8590b3;
  background-size: 100% 100%;
  transform: translateY(calc(var(--front-y-multiplier) * 0.3181818182rem / 2)) scaleY(var(--front-scale-multiplier));
}
.lottery-box .coin__front::after {
  background: rgba(0, 0, 0, 0.2);
  content: '';
  opacity: var(--front-y-multiplier);
}
.lottery-box .coin__middle {
  background: #737c99;
  transform: translateY(calc(var(--middle-y-multiplier) * 0.3181818182rem / 2)) scaleY(var(--middle-scale-multiplier));
}
.lottery-box .coin__back {
  background: radial-gradient(circle at 50% 50%, transparent 50%, rgba(115, 124, 153, 0.4) 54%, #c2cadf 54%), radial-gradient(circle at 50% 40%, #fcfaf9 23%, transparent 23%), radial-gradient(circle at 50% 100%, #fcfaf9 35%, transparent 35%);
  background-color: #8590b3;
  background-size: 100% 100%;
  transform: translateY(calc(var(--back-y-multiplier) * 0.3181818182rem / 2)) scaleY(var(--back-scale-multiplier));
}
.lottery-box .coin__back::after {
  background: rgba(0, 0, 0, 0.2);
  content: '';
  opacity: var(--back-y-multiplier);
}
.lottery-box .coin::before {
  background: radial-gradient(circle at 25% 65%, transparent 50%, rgba(255, 255, 255, 0.9) 90%), linear-gradient(55deg, transparent calc(var(--shine-bg-multiplier) + 0%), #e9f4ff calc(var(--shine-bg-multiplier) + 0%), transparent calc(var(--shine-bg-multiplier) + 50%));
  content: '';
  opacity: var(--shine-opacity-multiplier);
  transform: translateY(calc(var(--middle-y-multiplier) * 0.3181818182rem / -2)) scaleY(var(--middle-scale-multiplier)) rotate(calc(var(--coin-rotation-multiplier) * 1deg));
  z-index: 10;
}
.lottery-box .coin::after {
  background: #737c99;
  content: '';
  height: 0.3181818182rem;
  left: 0;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 100%;
  z-index: 2;
}

@keyframes shake {
  0% {
    transform: rotate(4deg);
  }
  66% {
    transform: rotate(-4deg);
  }
  100% {
    transform: rotate();
  }
}

.lottery-manage-panel {
  margin-top: 2rem;
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.lottery-manage-panel h3 {
  margin: 0;
  font-size: 1.5rem;
  text-align: center;
}
.lottery-manage-panel ul {
  list-style: none;
  padding: 0;
  margin: 0;
}
.lottery-manage-panel .manage-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 0.25rem;
}
.lottery-manage-panel .manage-item button {
  background: #e63946;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  cursor: pointer;
  font-size: 0.875rem;
}
.lottery-manage-panel .manage-item button:hover {
  background: #d62839;
}
.lottery-manage-panel input {
  flex: 1;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 0.25rem;
  background: transparent;
  color: white;
  margin-right: 0.5rem;
}
.lottery-manage-panel input:focus {
  outline: none;
  border-color: #39657e;
}
.lottery-manage-panel button {
  background: #39657e;
  color: white;
  border: none;
  padding: 0.75rem;
  border-radius: 0.25rem;
  cursor: pointer;
  font-size: 0.875rem;
}
.lottery-manage-panel button:hover {
  background: rgb(6, 60, 131);
}

.floating-panel {
  position: fixed;
  top: 120px;
  left: 50px;
  z-index: 1000;
  background: rgba(30, 30, 30, 0.98);
  box-shadow: 0 2px 16px rgba(0,0,0,0.18);
  border-radius: 8px;
  padding: 1.5rem 1.5rem 1rem 1.5rem;
  max-height: 70vh;
  overflow-y: auto;
}
</style>
