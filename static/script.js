document.addEventListener("DOMContentLoaded", function() {
    // 画像と音の配列をページごとに設定
    const images = {
        image1: [
            "/static/images1/image1.jpg",
            "/static/images2/image1_2.jpg",
            "/static/images3/image1_3.jpg"
        ],
        image2: [
            "/static/images1/image2.jpg",
            "/static/images2/image2_2.jpg",
            "/static/images3/image2_3.jpg"
        ],
        image3: [
            "/static/images1/image3.jpg",
            "/static/images2/image3_2.jpg",
            "/static/images3/image3_3.jpg"
        ],
        image4: [
            "/static/images1/image4.jpg",
            "/static/images2/image4_2.jpg",
            "/static/images3/image4_3.jpg"
        ],
        image5: [
            "/static/images1/image5.jpg",
            "/static/images2/image5_2.jpg",
            "/static/images3/image5_3.jpg"
        ]
    };

    const sounds = [
        "/static/sounds1/sound1.mp3",
        "/static/sounds2/sound2.mp3",
        "/static/sounds3/sound3.mp3"
    ];
    
    const places = ["リビング", "キッチン", "本棚", "クローゼット", "洗面所まわり", "寝室", "玄関や廊下"];

    // お片付け場所をランダムにセット
    let randomPlace = places[Math.floor(Math.random() * places.length)];
    let placeDisplay = document.getElementById("place-display");
    if (placeDisplay) {
        placeDisplay.textContent = `今日は「${randomPlace}」を片付けよう！`;
    }

    // 現在のページの画像配列を取得
    const currentPage = window.location.pathname.split('/').pop().split('.')[0]; // 現在のページ名を取得
    const currentImages = images[currentPage] || images.image1; // デフォルトはimage1

    function startCountdown(duration) {
        let timer = duration, minutes, seconds;
        const interval = setInterval(function () {
            minutes = parseInt(timer / 60, 10);
            seconds = parseInt(timer % 60, 10);
            seconds = seconds < 10 ? "0" + seconds : seconds;
            document.getElementById('timer').textContent = minutes + ":" + seconds;

            if (--timer < 0) {
                clearInterval(interval);
                document.getElementById('message').textContent = "一緒に片づけてくれてありがとう！お疲れ様でした！";
                document.getElementById('image').src = currentImages[2]; // 終了時の画像
                new Audio(sounds[2]).play(); // 終了時の音を再生

                // 背景を表示
                document.body.style.backgroundImage = "url('/static/images/background.jpg')"; // 背景画像の設定
                document.body.style.backgroundSize = "cover"; // 背景のサイズを調整
                document.body.style.backgroundPosition = "center"; // 背景の位置を調整
            } else if (timer === 60) { // 残り1分
                document.getElementById('image').src = currentImages[1]; // 残り1分の画像
                new Audio(sounds[1]).play();
                document.getElementById('message').textContent = "あと25分だけ頑張ってみよう！";
            }
        }, 1000);
        new Audio(sounds[0]).play();
    }

    // 無効化せずに使用するページを選択
    const availablePages = [
        "image1.html",
        "image2.html",
        "image3.html",
        //"image4.html",  // 一時的に無効化
        //"image5.html"   // 一時的に無効化
    ];

    // 「開始」ボタンを押したときにランダムなページに遷移
    document.getElementById("start-button")?.addEventListener("click", function() {
        const randomPage = availablePages[Math.floor(Math.random() * availablePages.length)];
        window.location.href = randomPage;
    });

    startCountdown(120);
});
