let totalSecond = 0;
let timer = null;

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
    if(document.querySelector(".start-btn").textContent == "Start"){
        document.querySelector(".start-btn").textContent = "Stop"

    const displayNumber = document.querySelector('#timerDisplay').value;
    const [hour, minutes, seconds] = displayNumber.split(':').map(Number);
    totalSecond = hour * 3600 + minutes * 60 + seconds ;

    timer = setInterval(() => {
      if (totalSecond > 0) {
      totalSecond --;
      updateDisplay(totalSecond);
      }else{
        clearInterval(timer);
        btn.textContent = "Start";
        alert("終了しました");
      }
    }, 1000);
    } else {
        document.querySelector(".start-btn").textContent = "Start"
        clearInterval(timer)
    }
}

function updateDisplay(sec){
    const newHours = Math.floor(sec / 3600);
    const newMinutes = Math.floor((sec % 3600) / 60);
    const newSeconds = sec % 60;
    document.querySelector('#timerDisplay').value = `${String(newHours).padStart(2, '0')}:${String(newMinutes).padStart(2, '0')}:${String(newSeconds).padStart(2, '0')}`;
}

function resetTimer() {
    const audio = new Audio('alarm.mp3');
        audio.play();
      
   document.querySelector('#timerDisplay').value = "00:00:00";
   clearInterval(timer);
   document.querySelector(".start-btn").textContent = "Start";
}
