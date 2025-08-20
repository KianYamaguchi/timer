let timer = null;
let startTime = 0;
let laps = [];

function formatTime(sec) {
  const millisecond = String(Math.floor(sec % 100)).padStart(2, '0');
  const second = String(Math.floor((sec / 100) % 60)).padStart(2, '0');
  const minute = String(Math.floor((sec / 6000) % 60)).padStart(2, '0');
  return `${minute}:${second}:${millisecond}`;
}

function toggleStartStop() {
  const btn = document.getElementById('startStop');
  const resetBtn = document.getElementById('resetlap');
  if (timer) {
    stop();
    btn.textContent = 'Start';
    btn.classList.remove('stop-btn');
    btn.classList.add('start-btn');
    resetBtn.textContent = 'Reset';
    resetBtn.classList.remove('lap-btn');
    resetBtn.classList.add('reset-btn');
  } else {
    start();
    btn.textContent = 'Stop';
    btn.classList.remove('start-btn');
    btn.classList.add('stop-btn');
    resetBtn.textContent = 'Lap';
    resetBtn.classList.remove('reset-btn');
    resetBtn.classList.add('lap-btn');
  }
}

function ResetLap() {
  if (timer){
    lap();
  
  }else{
    reset();
  }

}

function updateDisplay() {
  const timeDisplay = document.querySelector('.time');
  timeDisplay.textContent = formatTime(startTime);
}


function start() {
    
    if (timer) {
      return;
    }
    timer = setInterval(() => {
      startTime ++;
      updateDisplay();
    }, 10);
}

function stop() {
  if (timer) {
    clearInterval(timer);
    timer = null;
  }
}
function reset() {
    stop();
    startTime = 0;
    laps = [];
    renderLaps();
    updateDisplay();
}
function lap() {
  if (!timer) {
    return;
  }
  // 直前までの合計を計算
  const prevTotal = laps.reduce((acc, lap) => acc + lap, 0);
  const lapCount = startTime - prevTotal; // 今回のラップのカウント（数値）
  laps.push(lapCount); // 数値で保存
  renderLaps();
}


function renderLaps() {
  const lapsContainer = document.querySelector('.laps-container');
  lapsContainer.innerHTML = '';

  if (laps.length === 0) return;

  const max = Math.max(...laps);
const min = Math.min(...laps);
const maxIndex = laps.indexOf(max);
const minIndex = laps.indexOf(min);

  // 配列を逆順でループ
  laps.slice().reverse().forEach((lap, i) => {
    const div = document.createElement('div');
    div.className = 'laps';
    div.textContent = `Lap ${laps.length - i}: ${formatTime(lap)}`;

    // 元のインデックスを計算
    const origIndex = laps.length - 1 - i;
    
    if (origIndex === maxIndex) div.classList.add('max-lap');
    if (origIndex === minIndex) div.classList.add('min-lap');

    lapsContainer.appendChild(div);
  });
}

module.exports = {
  formatTime,
  start,
  stop,
  reset,
  lap,
  toggleStartStop,
  ResetLap
};