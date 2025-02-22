let countdown;
let timeLeft;
let currentImageIndex = 0;
let currentSound;

function startCountdown(duration) {
    timeLeft = duration;
    updateTimerDisplay();
    currentImageIndex = 0;

    // 最初の音を再生
    currentSound = new Audio(sounds[0]);
    currentSound.play();

    countdown = setInterval(() => {
        timeLeft--;
        updateTimerDisplay();

        if (timeLeft === 60) {
            // 残り1分になったときの処理
            switchImage(1); // ステップ2の画像に切り替え
            if (currentSound) currentSound.pause();
            currentSound = new Audio(sounds[1]);
            currentSound.play();
        }

        if (timeLeft === 0) {
            clearInterval(countdown);
            // カウントダウン終了時の処理
            switchImage(2); // ステップ3の画像に切り替え
            if (currentSound) currentSound.pause();
            currentSound = new Audio(sounds[2]);
            currentSound.play();
            // 必要に応じて「もう一回！」ボタンを表示
        }
    }, 1000);
}

function updateTimerDisplay() {
    const timerElement = document.getElementById('timer');
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timerElement.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function switchImage(step) {
    const imageContainer = document.getElementById('image-container');
    imageContainer.innerHTML = `<img src="${images[step]}" alt="画像">`; // 画像を切り替え
}
