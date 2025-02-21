let timeLeft = 10 * 60; // 10分（秒単位）
let timerId;

function updateTimer() {
    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;
    document.getElementById("timer").textContent = 
        `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

function startTimer() {
    if (timerId) return; // 二重スタートを防ぐ
    timerId = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft--;
            updateTimer();
        } else {
            clearInterval(timerId);
            document.getElementById("timer").textContent = "時間終了！";
        }
    }, 1000);
}

document.getElementById("startButton").addEventListener("click", startTimer);
updateTimer(); // 初回の表示
