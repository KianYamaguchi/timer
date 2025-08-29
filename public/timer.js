let totalSecond = 0;
let timer = null;
let alarmInterval = null;


document.addEventListener('DOMContentLoaded', () => {
     if ("Notification" in window) {
        Notification.requestPermission();//通知許可をリクエストする
    }
    const timerInput = document.getElementById('timerDisplay');
    timerInput.addEventListener('input', function () {
        let val = this.value.replace(/\D/g, '');
        val = val.slice(-6);
        val = val.padStart(6, '0');
        let h = val.slice(0, 2);
        let m = val.slice(2, 4);
        let s = val.slice(4, 6);
        this.value = `${h}:${m}:${s}`;
    });
});

function showNotification() {
    if ("Notification" in window && Notification.permission === "granted") {//もし通知が許可されたら以下を表示する
        new Notification("タイマー終了", {
            body: "時間になりました！",
            icon: "alarm.png" // 任意（publicフォルダに画像を置く場合）
        });
    }

    const msg = new SpeechSynthesisUtterance("タイマーが終了しました");//自動音声
    speechSynthesis.speak(msg);

    document.title = "⏰ タイマー終了！";
}

document.getElementById('fullscreenBtn').addEventListener('click', () => {
    const elem = document.documentElement; // ページ全体
    if (!document.fullscreenElement) {
        elem.requestFullscreen();
    } else {
        document.exitFullscreen();
    }
});

function addTime (time){
    if(document.getElementById("startStopTimer").textContent == "Stop") return;
    const displayNumber = document.querySelector('#timerDisplay').value;
    const [hour, minutes, seconds] = displayNumber.split(':').map(Number);
    totalSecond = hour * 3600 + minutes * 60 + seconds + time;
    const newHours = Math.floor(totalSecond / 3600);
    const newMinutes = Math.floor((totalSecond % 3600) / 60);
    const newSeconds = totalSecond % 60;
    document.querySelector('#timerDisplay').value = `${String(newHours).padStart(2, '0')}:${String(newMinutes).padStart(2, '0')}:${String(newSeconds).padStart(2, '0')}`;
}

function getDisplaySeconds(){
    const displayNumber = document.querySelector('#timerDisplay').value;
    const [hour, minutes, seconds] = displayNumber.split(':').map(Number);
    totalSecond = hour * 3600 + minutes * 60 + seconds;
    return totalSecond;
}

function toggleStartStopTimer() {
    const btn = document.getElementById("startStopTimer");
    const timerInput = document.getElementById('timerDisplay');
    if (btn.textContent == "Start") {
        getDisplaySeconds();
         if (totalSecond <= 0) return;
        timerInput.readOnly = true;
        btn.classList.remove("start_btn")
        btn.classList.add("stop_btn")
        btn.textContent = "Stop";


        timer = setInterval(() => {
            if (totalSecond > 0) {
                totalSecond--;
                updateDisplay(totalSecond);
            } else {
                document.querySelector(".timer_container").style.background = "#efb09cff";
                document.querySelector("body").style.background = "#f0a777ff";
                alarm();
                 showNotification(); 
                clearInterval(timer);
            }
        }, 1000); // ← ここでsetIntervalを閉じる
    } else {
        timerInput.readOnly = false;
        btn.classList.remove("stop_btn");
        btn.classList.add("start_btn");
        btn.textContent = "Start";
        document.querySelector(".timer_container").style.background = "";
        document.querySelector("body").style.background = "";
        clearInterval(timer);
        stopAlarm();
        document.title = "タイマー";
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
    document.querySelector(".timer_container").style.background = "";
    document.querySelector("body").style.background = "";
   document.querySelector('#timerDisplay').value = "00:00:00";
   clearInterval(timer);
   document.querySelector(".start-btn").textContent = "Start";
   document.querySelector(".start-btn").classList.remove("stop_btn");
   document.querySelector(".start-btn").classList.add("start_btn");
   totalSecond = 0;
   const timerInput = document.getElementById('timerDisplay');
    timerInput.readOnly = false;
    document.title = "タイマー";
}
