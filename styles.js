let currentSlide = 0;
let slides = [];

// Ініціалізація при завантаженні
document.addEventListener('DOMContentLoaded', function() {
    slides = document.querySelectorAll('.slide');
    
    if (slides.length > 0) {
        showSlide(0);
        createIndicators();
        updateCounter();
    }
    
    // Навігація з клавіатури
    document.addEventListener('keydown', handleKeyPress);
    
    // Навігація з гендлерів миші
    document.addEventListener('click', handleClick);
});

// Показати слайд
function showSlide(n) {
    if (n >= slides.length) {
        currentSlide = 0;
    } else if (n < 0) {
        currentSlide = slides.length - 1;
    } else {
        currentSlide = n;
    }
    
    // Приховати всі слайди
    slides.forEach(slide => {
        slide.classList.remove('active');
    });
    
    // Показати поточний слайд
    slides[currentSlide].classList.add('active');
    
    // Оновити індикатори
    updateIndicators();
    updateCounter();
}

// Змінити слайд
function changeSlide(n) {
    showSlide(currentSlide + n);
}

// Обробка клавіш
function handleKeyPress(event) {
    switch(event.key) {
        case 'ArrowRight':
        case ' ':
            event.preventDefault();
            changeSlide(1);
            break;
        case 'ArrowLeft':
            event.preventDefault();
            changeSlide(-1);
            break;
        case 'Home':
            event.preventDefault();
            showSlide(0);
            break;
        case 'End':
            event.preventDefault();
            showSlide(slides.length - 1);
            break;
    }
}

// Обробка кліків (для мобільних)
function handleClick(event) {
    const target = event.target;
    
    // Не обробляти клік на кнопках та індикаторах
    if (target.classList.contains('nav-btn') || 
        target.classList.contains('indicator')) {
        return;
    }
    
    // Клік ліворуч = назад, праворуч = далі
    if (event.clientX < window.innerWidth / 2) {
        changeSlide(-1);
    } else {
        changeSlide(1);
    }
}

// Створити індикатори
function createIndicators() {
    const indicatorsContainer = document.getElementById('indicators');
    
    for (let i = 0; i < slides.length; i++) {
        const indicator = document.createElement('div');
        indicator.classList.add('indicator');
        if (i === 0) {
            indicator.classList.add('active');
        }
        
        // Клік на індикатор
        indicator.addEventListener('click', function() {
            showSlide(i);
        });
        
        indicatorsContainer.appendChild(indicator);
    }
}

// Оновити індикатори
function updateIndicators() {
    const indicators = document.querySelectorAll('.indicator');
    
    indicators.forEach((indicator, index) => {
        indicator.classList.remove('active');
        if (index === currentSlide) {
            indicator.classList.add('active');
        }
    });
}

// Оновити лічильник
function updateCounter() {
    const counter = document.getElementById('slideCounter');
    counter.textContent = `${currentSlide + 1} / ${slides.length}`;
}

// Гарячі клавіші (додатково)
document.addEventListener('keydown', function(event) {
    // Ctrl+Home = перший слайд
    if (event.ctrlKey && event.key === 'Home') {
        event.preventDefault();
        showSlide(0);
    }
    
    // Ctrl+End = останній слайд
    if (event.ctrlKey && event.key === 'End') {
        event.preventDefault();
        showSlide(slides.length - 1);
    }
});

// Поддержка свайпу на мобільних
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', function(event) {
    touchStartX = event.changedTouches[0].screenX;
}, false);

document.addEventListener('touchend', function(event) {
    touchEndX = event.changedTouches[0].screenX;
    handleSwipe();
}, false);

function handleSwipe() {
    const threshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > threshold) {
        if (diff > 0) {
            // Свайп ліворуч = далі
            changeSlide(1);
        } else {
            // Свайп праворуч = назад
            changeSlide(-1);
        }
    }
}
