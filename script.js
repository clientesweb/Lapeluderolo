document.addEventListener('DOMContentLoaded', function () {
    // Inicializar Swiper para el hero slider
    new Swiper('#inicio .swiper-container', {
        loop: true,
        pagination: {
            el: '#inicio .swiper-pagination',
            clickable: true,
        },
        autoplay: {
            delay: 5000,
        },
        effect: 'fade',
        fadeEffect: {
            crossFade: true
        },
    });

    // Inicializar Swiper para las reseñas
    new Swiper('#resenas .swiper-container', {
        slidesPerView: 1,
        spaceBetween: 20,
        loop: true,
        autoplay: {
            delay: 3000,
        },
        pagination: {
            el: '#resenas .swiper-pagination',
            clickable: true,
        },
        breakpoints: {
            640: {
                slidesPerView: 2,
            },
            1024: {
                slidesPerView: 3,
            },
        },
    });

    // Efecto de scroll para el header con requestAnimationFrame para optimización
    const header = document.getElementById('header');
    let isScrolling = false;

    window.addEventListener('scroll', () => {
        if (!isScrolling) {
            window.requestAnimationFrame(() => {
                if (window.scrollY > 100) {
                    header.classList.add('bg-purple-700', 'shadow-md');
                } else {
                    header.classList.remove('bg-purple-700', 'shadow-md');
                }
                isScrolling = false;
            });
            isScrolling = true;
        }
    });

    // Animación de entrada para las secciones
    const sections = document.querySelectorAll('section');
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -10% 0px', // Ajuste para mejor percepción
        threshold: 0.25 // Solo cuando el 25% de la sección está visible
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fadeIn');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // Menú hamburguesa
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');

    menuToggle.addEventListener('click', () => {
        const isHidden = mobileMenu.classList.toggle('hidden');
        if (!isHidden) {
            mobileMenu.querySelector('a').focus(); // Foco en el primer enlace del menú
        } else {
            menuToggle.focus(); // Volver el foco al botón
        }
    });

    // Cerrar menú móvil al hacer clic en un enlace
    const mobileMenuLinks = mobileMenu.querySelectorAll('a');
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
        });
    });

    // Smooth scroll para los enlaces de navegación con debounce
    let scrolling = false;
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            if (!scrolling) {
                scrolling = true;
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
                setTimeout(() => scrolling = false, 1000); // 1 segundo de debounce
            }
        });
    });

    // Animación para elementos con la clase hover-grow, solo en dispositivos con hover
    if (window.matchMedia("(hover: hover)").matches) {
        const hoverGrowElements = document.querySelectorAll('.hover-grow');
        hoverGrowElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                element.style.transform = 'scale(1.05)';
            });
            element.addEventListener('mouseleave', () => {
                element.style.transform = 'scale(1)';
            });
        });
    }

    // Lazy loading para imágenes
    const lazyImages = document.querySelectorAll('img[data-src]');
    const lazyImageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('fade-in');
                lazyImageObserver.unobserve(img);
            }
        });
    });

    lazyImages.forEach(img => {
        lazyImageObserver.observe(img);
    });
});