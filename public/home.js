let timer = null;
let startTime = 0;
let laps = [];


function formatTime(sec) {
  const millisecond = String(Math.floor(sec % 100)).padStart(2, '0');
  const second = String(Math.floor((sec / 100) % 60)).padStart(2, '0');
  const minute = String(Math.floor((sec / 6000) % 60)).padStart(2, '0');
  return `${minute}:${second}:${millisecond}`;
}
document.getElementById('fullscreenBtn').addEventListener('click', () => {
    const elem = document.documentElement; // ページ全体
    if (!document.fullscreenElement) {
        elem.requestFullscreen();
    } else {
        document.exitFullscreen();
    }
});

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

function drawAnalog(secCount) {
  const canvas = document.getElementById('analog');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const w = canvas.width, h = canvas.height;
  const centerX = w / 2, centerY = h / 2;
  const radius = w / 2 - 10;

  // 秒（100分の1秒単位→秒単位に変換）
  const totalSec = secCount / 100;
  const second = totalSec % 60;

  ctx.clearRect(0, 0, w, h);

  // シンプルな丸枠
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
  ctx.strokeStyle = "#888";
  ctx.lineWidth = 2;
  ctx.stroke();

  // 1秒ごとの細い目盛り
for (let i = 0; i < 60; i++) {
  const angle = (i / 60) * 2 * Math.PI;
  ctx.beginPath();
  ctx.moveTo(
    centerX + Math.cos(angle) * (radius - 6),
    centerY + Math.sin(angle) * (radius - 6)
  );
  ctx.lineTo(
    centerX + Math.cos(angle) * (radius - 2),
    centerY + Math.sin(angle) * (radius - 2)
  );
  ctx.strokeStyle = "#ddd";
  ctx.lineWidth = 1;
  ctx.stroke();
}

// 5秒ごとの太い目盛り
for (let i = 0; i < 60; i += 5) {
  const angle = (i / 60) * 2 * Math.PI;
  ctx.beginPath();
  ctx.moveTo(
    centerX + Math.cos(angle) * (radius - 10),
    centerY + Math.sin(angle) * (radius - 10)
  );
  ctx.lineTo(
    centerX + Math.cos(angle) * (radius - 2),
    centerY + Math.sin(angle) * (radius - 2)
  );
  ctx.strokeStyle = "#90caf9";
  ctx.lineWidth = 2;
  ctx.stroke();
}

  // 秒針（1分で1周）
  ctx.save();
  ctx.translate(centerX, centerY);
  ctx.rotate((second / 60) * 2 * Math.PI);
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(0, -radius * 0.85);
  ctx.strokeStyle = "#f15656ff";
  ctx.lineWidth = 2;
  ctx.stroke();
  ctx.restore();

  // 中心点（小さな黒丸）
  ctx.beginPath();
  ctx.arc(centerX, centerY, 3, 0, 2 * Math.PI);
  ctx.fillStyle = "#222";
  ctx.fill();

    // === ここからデジタル表記を中央に描画 ===
  ctx.font = "bold 1.4rem 'Roboto Mono', 'Consolas', monospace";
  ctx.fillStyle = "#222";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(formatTime(secCount), centerX, centerY + radius * 0.45);
}

// updateDisplay内で呼び出し
const originalUpdateDisplay = updateDisplay;
updateDisplay = function() {
  const timeDisplay = document.querySelector('.time');
  timeDisplay.textContent = formatTime(startTime);
  drawAnalog(startTime);
};

function toggleDisplay() {
   if (document.querySelector('.analog-container').style.display === 'none') {
    document.querySelector('.switch').textContent = '○ ●';
     document.querySelector('.analog-container').style.display = 'block';
     document.querySelector('.time').style.display = 'none';
   } else {
    document.querySelector('.switch').textContent = '● ○';
     document.querySelector('.analog-container').style.display = 'none';
     document.querySelector('.time').style.display = 'block';
   }
}

// ページ読み込み時にアナログ時計を初期表示
document.addEventListener('DOMContentLoaded', () => {
  drawAnalog(startTime);
  document.querySelector('.analog-container').style.display = 'none';
});

module.exports = {
  formatTime,
  start,
  stop,
  reset,
  lap,
  toggleStartStop,
  ResetLap,
  toggleDisplay
};