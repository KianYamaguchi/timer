let totalSecond = 0;
let timer = null;
let alarmInterval = null;

document.addEventListener('DOMContentLoaded', () => {
    if(timer) return;
    const timerInput = document.getElementById('timerDisplay');
    timerInput.addEventListener('input', function () {
        // 数字以外を除去
        let val = this.value.replace(/\D/g, '');

        // 最大6桁まで
        val = val.slice(-6);

        // 右詰めで0埋め
        val = val.padStart(6, '0');

        // 時分秒に分割
        let h = val.slice(0, 2);
        let m = val.slice(2, 4);
        let s = val.slice(4, 6);
           // 分・秒を59までに制限
        

        // フォーマットｓ
        this.value = `${h}:${m}:${s}`;
    });
});

document.getElementById('fullscreenBtn').addEventListener('click', () => {
    const elem = document.documentElement; // ページ全体
    if (!document.fullscreenElement) {
        elem.requestFullscreen();
    } else {
        document.exitFullscreen();
    }
});

function addTime (time){
    const displayNumber = document.querySelector('#timerDisplay').value;
    const [hour, minutes, seconds] = displayNumber.split(':').map(Number);
    totalSecond = hour * 3600 + minutes * 60 + seconds + time;
    const newHours = Math.floor(totalSecond / 3600);
    const newMinutes = Math.floor((totalSecond % 3600) / 60);
    const newSeconds = totalSecond % 60;
    document.querySelector('#timerDisplay').value = `${String(newHours).padStart(2, '0')}:${String(newMinutes).padStart(2, '0')}:${String(newSeconds).padStart(2, '0')}`;
}

function toggleStartStopTimer() {
    const btn = document.getElementById("startStopTimer");
    if (btn.textContent == "Start") {

        const displayNumber = document.querySelector('#timerDisplay').value;
        const [hour, minutes, seconds] = displayNumber.split(':').map(Number);
        totalSecond = hour * 3600 + minutes * 60 + seconds;

         if (totalSecond <= 0) return;
        btn.classList.remove("start_btn")
        btn.classList.add("stop_btn")
        btn.textContent = "Stop";


        timer = setInterval(() => {
            console.log(totalSecond);
            if (totalSecond > 0) {
                totalSecond--;
                updateDisplay(totalSecond);
            } else {
                document.querySelector(".timer_container").style.backgroundColor = "#f38c6dff";
                alarm();
                clearInterval(timer);
            }
        }, 1000); // ← ここでsetIntervalを閉じる
    } else {
        btn.classList.remove("stop_btn");
        btn.classList.add("start_btn");
        btn.textContent = "Start";
        clearInterval(timer);
        stopAlarm();
    }
}
function alarm() {
    // すでに鳴っていたら何もしない
    
    if (alarmInterval) return;
    const audio = new Audio('alarm.mp3');
        audio.play();
    alarmInterval = setInterval(() => {
        const audio = new Audio('alarm.mp3');
        audio.play();
    }, 2000); // 1秒ごとに鳴らす（必要に応じて調整）
}

function stopAlarm() {
    if (alarmInterval) {
        clearInterval(alarmInterval);
        alarmInterval = null;
    }
}

function updateDisplay(sec){
    const newHours = Math.floor(sec / 3600);
    const newMinutes = Math.floor((sec % 3600) / 60);
    const newSeconds = sec % 60;
    document.querySelector('#timerDisplay').value = `${String(newHours).padStart(2, '0')}:${String(newMinutes).padStart(2, '0')}:${String(newSeconds).padStart(2, '0')}`;
}

function resetTimer() {
  
    stopAlarm();
   document.querySelector('#timerDisplay').value = "00:00:00";
   clearInterval(timer);
   document.querySelector(".start-btn").textContent = "Start";
   document.querySelector(".start-btn").classList.remove("stop_btn");
   document.querySelector(".start-btn").classList.add("start_btn");
   totalSecond = 0;
}
