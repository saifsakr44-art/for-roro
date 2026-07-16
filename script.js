// 1. حساب الوقت بدقة من يوم 11 يونيو 2026
const startDate = new Date("June 11, 2026 00:00:00"); 

function updateTimer() {
    const now = new Date();
    const difference = now - startDate;

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((difference / 1000 / 60) % 60);
    const seconds = Math.floor((difference / 1000) % 60);

    document.getElementById("countdown").innerHTML = 
        days + " يوم و " + hours + " ساعة و " + minutes + " دقيقة و " + seconds + " ثانية ";
}
setInterval(updateTimer, 1000);
updateTimer();

// 2. كود صفحة الترحيب وتشغيل الموسيقى التلقائي
const welcomeScreen = document.getElementById('welcome-screen');
const mainContent = document.getElementById('main-content');
const entryBtn = document.getElementById('entry-heart-btn');
const music = document.getElementById('bg-music');
const musicBtn = document.getElementById('music-btn');

entryBtn.addEventListener('click', () => {
    // تشغيل الموسيقى تلقائياً بمجرد ضغطها على قلب الدخول
    music.play().then(() => {
        musicBtn.innerHTML = '<i class="fas fa-pause"></i>';
        musicBtn.style.background = '#ff4d6d';
        musicBtn.style.color = '#fff';
    }).catch(error => {
        console.log("تشغيل الصوت يحتاج تفاعل: ", error);
    });

    welcomeScreen.style.opacity = '0';
    welcomeScreen.style.transform = 'scale(0.9)';
    
    setTimeout(() => {
        welcomeScreen.style.display = 'none';
        mainContent.style.display = 'block';
        setTimeout(() => {
            mainContent.style.opacity = '1';
        }, 50);
    }, 800);
});

// التحكم اليدوي في الموسيقى (للطوارئ)
musicBtn.addEventListener('click', () => {
    if (music.paused) {
        music.play();
        musicBtn.innerHTML = '<i class="fas fa-pause"></i>';
        musicBtn.style.background = '#ff4d6d';
        musicBtn.style.color = '#fff';
    } else {
        music.pause();
        musicBtn.innerHTML = '<i class="fas fa-music"></i>';
        musicBtn.style.background = 'rgba(255, 255, 255, 0.95)';
        musicBtn.style.color = '#ff4d6d';
    }
});

// 3. ألبوم الصور والفيديو التفاعلي الجديد (الكتاب - 4 صفحات)
let currentPage = 0;
const pages = document.querySelectorAll('.book-page');
const pageNumText = document.getElementById('page-number');
const prevBtn = document.getElementById('prev-page-btn');
const nextBtn = document.getElementById('next-page-btn');
const loveVideo = document.getElementById('love-video');

function showPage(index) {
    if (pages.length === 0) return;
    
    // إخفاء الصفحة الحالية
    pages.forEach(page => page.classList.remove('active'));
    
    // ضبط الحدود لتكرار الصفحات بشكل دائري
    currentPage = (index + pages.length) % pages.length;
    
    // إظهار الصفحة الجديدة
    pages[currentPage].classList.add('active');
    
    // تحديث رقم الصفحة ديناميكياً (1 / 4)
    pageNumText.textContent = (currentPage + 1) + " / " + pages.length;

    // تشغيل الفيديو تلقائياً عند الوصول لصفحته دون المساس بموسيقى الخلفية
    const isVideoPage = pages[currentPage].classList.contains('video-page');
    if (isVideoPage) {
        loveVideo.play().catch(e => console.log("تشغيل الفيديو تلقائياً محجوب: ", e));
    } else {
        if (loveVideo && !loveVideo.paused) {
            loveVideo.pause();
            loveVideo.currentTime = 0; // إعادة الفيديو للبداية عند الخروج من الصفحة
        }
    }
}

// تشغيل أزرار التقليب
prevBtn.addEventListener('click', () => {
    showPage(currentPage - 1);
});

nextBtn.addEventListener('click', () => {
    showPage(currentPage + 1);
});

// تقليب تلقائي ببطء كل 6 ثوانٍ، ويقف تماماً لو وصلنا لصفحة الفيديو عشان تتفرج عليه براحتها
let autoFlip = setInterval(() => {
    const isVideoPage = pages[currentPage].classList.contains('video-page');
    if (!isVideoPage) {
        showPage(currentPage + 1);
    }
}, 6000);

// إيقاف التقليب التلقائي لو رورو بدأت تقلب بنفسها
function stopAutoFlip() {
    clearInterval(autoFlip);
}
prevBtn.addEventListener('click', stopAutoFlip);
nextBtn.addEventListener('click', stopAutoFlip);

// تشغيل الصفحة الأولى تلقائياً عند فتح الموقع
showPage(0);

// 4. أسباب الحب التفاعلية
const reasons = [
    "لأنك انتي... وده لوحده سبب كفاية. 🤍",
    "لأنك دايمًا معايا وبتدعميني وبتشجعيني. 💪❤️",
    "لأنك بتحكيلي تفاصيل يومك، ودي من أكتر الحاجات اللي بحبها. 🗣️✨",
    "لأن وجودك بيخليني مبسوط حتى من غير سبب. 😊💖",
    "لأنك بقيتي الأمان بالنسبة ليا. 🏠🌸",
    "لأن كل يوم معاكي بيكون أحلى من اللي قبله. 🌅💌",
    "لأنك ببساطة... أحلى بنت في عيني. 🤍👑"
];

let reasonIndex = 0;
const reasonText = document.getElementById('reason-text');
const nextBtnReason = document.getElementById('next-reason-btn');

nextBtnReason.addEventListener('click', () => {
    reasonText.style.opacity = 0;
    setTimeout(() => {
        reasonText.textContent = reasons[reasonIndex];
        reasonText.style.opacity = 1;
        reasonIndex = (reasonIndex + 1) % reasons.length;
    }, 400);
});

// 5. تساقط القلوب التلقائي
const container = document.getElementById('heartsContainer');

function createHeart() {
    const heart = document.createElement('div');
    heart.classList.add('heart');
    heart.innerHTML = '❤️';
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.animationDuration = Math.random() * 3 + 2 + 's';
    heart.style.opacity = Math.random();
    heart.style.fontSize = Math.random() * 20 + 10 + 'px';
    
    container.appendChild(heart);
    setTimeout(() => { heart.remove(); }, 5000);
}
setInterval(createHeart, 350);
