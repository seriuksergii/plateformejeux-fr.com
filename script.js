// Обработка модального окна проверки возраста
document.addEventListener('DOMContentLoaded', function() {
    const confirmBtn = document.getElementById('confirm-age');
    const rejectBtn = document.getElementById('reject-age');
    const modal = document.querySelector('.age-verification-modal');
    const body = document.body;
    
    // Проверяем, подтверждал ли пользователь возраст ранее
    const ageVerified = localStorage.getItem('ageVerified');
    
    if (ageVerified === 'true') {
        body.classList.add('verified');
    }
    
    // Обработка подтверждения возраста (только если элементы есть на странице)
    if (confirmBtn && modal) {
        confirmBtn.addEventListener('click', function() {
            body.classList.add('verified');
            localStorage.setItem('ageVerified', 'true');
            
            // Плавное исчезновение модального окна
            modal.style.opacity = '0';
            modal.style.transition = 'opacity 0.5s ease';
            
            setTimeout(() => {
                modal.style.display = 'none';
            }, 500);
        });
    }
    
    // Обработка отказа
    if (rejectBtn) {
        rejectBtn.addEventListener('click', function() {
            // Перенаправляем на страницу о responsible gambling
            window.location.href = 'https://www.begambleaware.org';
        });
    }
    
    // 3D Tilt эффект для карточек платформ
    const cardWrappers = document.querySelectorAll('.platform-card-wrapper');
    
    cardWrappers.forEach(wrapper => {
        const card = wrapper.querySelector('.platform-card');
        
        wrapper.addEventListener('mousemove', function(e) {
            const rect = wrapper.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            // Применяем tilt только если карточка не перевернута
            if (!wrapper.matches(':hover')) {
                card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            }
        });
        
        wrapper.addEventListener('mouseleave', function() {
            // Сброс трансформации при уходе мыши
            setTimeout(() => {
                if (!wrapper.matches(':hover')) {
                    card.style.transform = '';
                }
            }, 100);
        });
        
        // Добавляем эффект свечения при движении мыши
        wrapper.addEventListener('mousemove', function(e) {
            const rect = wrapper.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            
            const glow = card.querySelector('.card-glow');
            if (glow) {
                glow.style.background = `
                    radial-gradient(circle at ${x}% ${y}%, 
                        var(--accent) 0%, 
                        var(--secondary) 25%, 
                        var(--primary) 50%, 
                        transparent 70%)
                `;
            }
        });
    });
    
    // Анимация появления карточек при прокрутке
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Наблюдаем за карточками платформ (все появляются одновременно)
    const platformCards = document.querySelectorAll('.platform-card-wrapper');
    platformCards.forEach((card) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(card);
    });
    
    // Наблюдаем за карточками преимуществ и отзывов
    const otherCards = document.querySelectorAll('.advantage-card, .testimonial-card');
    otherCards.forEach((card) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(card);
    });
    
    // Плавная прокрутка для якорных ссылок
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Мобильное меню
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const headerNav = document.querySelector('.header-nav');
    
    if (mobileMenuToggle && headerNav) {
        // Создаём overlay
        const overlay = document.createElement('div');
        overlay.className = 'mobile-menu-overlay';
        document.body.appendChild(overlay);
        
        // Открытие/закрытие меню
        mobileMenuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            headerNav.classList.toggle('active');
            overlay.classList.toggle('active');
            document.body.style.overflow = headerNav.classList.contains('active') ? 'hidden' : '';
        });
        
        // Закрытие по клику на overlay
        overlay.addEventListener('click', function() {
            mobileMenuToggle.classList.remove('active');
            headerNav.classList.remove('active');
            overlay.classList.remove('active');
            document.body.style.overflow = '';
        });
        
        // Закрытие при клике на ссылку
        headerNav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                mobileMenuToggle.classList.remove('active');
                headerNav.classList.remove('active');
                overlay.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }
});
