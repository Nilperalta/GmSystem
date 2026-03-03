// script.js - Funcionalidades interactivas para MYG SERVICES

// Smooth scroll para los enlaces del menú
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        if (this.parentElement.classList.contains('has-submenu')) return;

        e.preventDefault();
        const href = this.getAttribute('href');
        if (href === '#') return;
        
        const target = document.querySelector(href);
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            if (mainMenu && mainMenu.classList.contains('active')) {
                mobileToggle.classList.remove('active');
                mainMenu.classList.remove('active');
            }
        }
    });
});

// Menú móvil
const mobileToggle = document.querySelector('.mobile-toggle');
const mainMenu = document.querySelector('.main-menu');

function cerrarMenu() {
    mobileToggle.classList.remove('active');
    mainMenu.classList.remove('active');
    document.querySelectorAll('.has-submenu').forEach(item => {
        item.classList.remove('active');
    });
}

if (mobileToggle && mainMenu) {

    // Abrir/cerrar con botón hamburguesa
    mobileToggle.addEventListener('click', function(e) {
        e.stopPropagation();
        this.classList.toggle('active');
        mainMenu.classList.toggle('active');
    });

    // ✅ CORREGIDO: Cerrar al hacer clic en links que NO son el padre del submenú
    mainMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (link.parentElement.classList.contains('has-submenu') &&
                link.parentElement.querySelector('.submenu')) return;
            cerrarMenu();
        });
    });

    // ✅ CORREGIDO: Submenú táctil en móvil - ya no interfiere con el cierre del nav
    document.querySelectorAll('.has-submenu > a').forEach(link => {
        link.addEventListener('click', function(e) {
            if (window.innerWidth <= 992) {
                e.preventDefault();
                e.stopPropagation();
                const parent = this.parentElement;
                // Cerrar otros submenús abiertos
                document.querySelectorAll('.has-submenu').forEach(item => {
                    if (item !== parent) item.classList.remove('active');
                });
                parent.classList.toggle('active');
            }
        });
    });

    // ✅ Cerrar al hacer clic fuera del nav
    document.addEventListener('click', function(event) {
        if (!mobileToggle.contains(event.target) && !mainMenu.contains(event.target)) {
            cerrarMenu();
        }
    });

    // Cerrar al hacer scroll
    window.addEventListener('scroll', function() {
        if (mainMenu.classList.contains('active')) {
            cerrarMenu();
        }
    });
}

// Back to top button
const backToTop = document.querySelector('.back-to-top');

if (backToTop) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Actualizar año en copyright
const yearElement = document.getElementById('current-year');
if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}

// Marcar enlace activo en el menú basado en la sección visible
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.main-menu a');

function updateActiveLink() {
    let current = '';
    const scrollPosition = window.scrollY + 200;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.offsetHeight;

        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        if (href === `#${current}` || (current === '' && href === '/')) {
            link.classList.add('active');
        }
    });
}

if (sections.length > 0 && navLinks.length > 0) {
    window.addEventListener('scroll', updateActiveLink);
    window.addEventListener('load', updateActiveLink);
}

// Animación de entrada para elementos al hacer scroll
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.service-card, .project-card, .team-card, .safety-item');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        const windowHeight = window.innerHeight;

        if (elementTop < windowHeight - 100 && elementBottom > 0) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
};

document.querySelectorAll('.service-card, .project-card, .team-card, .safety-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
});

window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);

// Validación simple para formulario de newsletter (si existe)
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const emailInput = newsletterForm.querySelector('input[type="email"]');
        if (emailInput && emailInput.value) {
            alert('¡Gracias por suscribirte! Pronto recibirás nuestras novedades.');
            emailInput.value = '';
        } else {
            alert('Por favor, ingresa un email válido.');
        }
    });
}

// Manejar clics en botones de WhatsApp
document.querySelectorAll('.btn-whatsapp, .team-btn, .btn-primary[href*="wa.me"]').forEach(btn => {
    btn.addEventListener('click', function() {
        console.log('Click a WhatsApp desde:', this.textContent.trim());
    });
});