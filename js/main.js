// Esperar a que el DOM esté cargado
document.addEventListener('DOMContentLoaded', function() {
    
    // ===== SLIDER =====
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    let currentSlide = 0;
    let slideInterval;
    
    function showSlide(n) {
        // Ocultar todas las slides
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        // Calcular el índice de la slide a mostrar
        currentSlide = (n + slides.length) % slides.length;
        
        // Mostrar la slide actual
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }
    
    function nextSlide() {
        showSlide(currentSlide + 1);
    }
    
    function prevSlide() {
        showSlide(currentSlide - 1);
    }
    
    function startSlider() {
        slideInterval = setInterval(nextSlide, 5000); // Cambiar cada 5 segundos
    }
    
    function stopSlider() {
        clearInterval(slideInterval);
    }
    
    // Event listeners para controles del slider
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            stopSlider();
            nextSlide();
            startSlider();
        });
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            stopSlider();
            prevSlide();
            startSlider();
        });
    }
    
    // Event listeners para dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            stopSlider();
            showSlide(index);
            startSlider();
        });
    });
    
    // Pausar slider al pasar el mouse
    const slider = document.querySelector('.slider');
    if (slider) {
        slider.addEventListener('mouseenter', stopSlider);
        slider.addEventListener('mouseleave', startSlider);
    }
    
    // Iniciar slider
    if (slides.length > 0) {
        startSlider();
    }
    
    // ===== MENU MOVIL =====
    const mobileToggle = document.querySelector('.mobile-toggle');
    const mainMenu = document.querySelector('.main-menu');
    
    if (mobileToggle && mainMenu) {
        mobileToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            mainMenu.classList.toggle('active');
            document.body.style.overflow = mainMenu.classList.contains('active') ? 'hidden' : '';
        });
        
        const menuLinks = document.querySelectorAll('.main-menu a');
        menuLinks.forEach(link => {
            link.addEventListener('click', () => {
                // No cerrar si el enlace tiene submenú
                if (link.parentElement.classList.contains('has-submenu')) return;
                
                mobileToggle.classList.remove('active');
                mainMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
        
        // Cerrar menu al hacer click fuera
        document.addEventListener('click', function(event) {
            if (!mobileToggle.contains(event.target) && !mainMenu.contains(event.target)) {
                mobileToggle.classList.remove('active');
                mainMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
    
    // ===== SMOOTH SCROLL =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Solo aplicar smooth scroll para enlaces internos
            if (href === '#' || href === '#home') {
                e.preventDefault();
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
                return;
            }
            
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetElement = document.querySelector(href);
                if (targetElement) {
                    const headerHeight = document.querySelector('.main-navigation') ? document.querySelector('.main-navigation').offsetHeight : 0;
                    window.scrollTo({
                        top: targetElement.offsetTop - headerHeight,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // ===== ANIMACIONES AL SCROLL =====
    function animateOnScroll() {
        const elements = document.querySelectorAll('.service-card, .team-card, .project-card');
        const windowHeight = window.innerHeight;
        const revealPoint = 150;
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            
            if (elementTop < windowHeight - revealPoint) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Inicializar elementos con animación
    document.querySelectorAll('.service-card, .team-card, .project-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Ejecutar al cargar y al hacer scroll
    window.addEventListener('load', animateOnScroll);
    window.addEventListener('scroll', animateOnScroll);
    
    // ===== GALERIA CON LIGHTBOX =====
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const imgSrc = this.querySelector('img').src;
            const imgAlt = this.querySelector('img').alt;
            
            // Crear lightbox
            const lightbox = document.createElement('div');
            lightbox.className = 'lightbox';
            lightbox.innerHTML = `
                <div class="lightbox-content">
                    <span class="close-lightbox">&times;</span>
                    <img src="${imgSrc}" alt="${imgAlt}">
                    <p>${imgAlt}</p>
                </div>
            `;
            
            document.body.appendChild(lightbox);
            document.body.style.overflow = 'hidden';
            
            // Cerrar lightbox
            const closeBtn = lightbox.querySelector('.close-lightbox');
            closeBtn.addEventListener('click', () => {
                document.body.removeChild(lightbox);
                document.body.style.overflow = '';
            });
            
            lightbox.addEventListener('click', (e) => {
                if (e.target === lightbox) {
                    document.body.removeChild(lightbox);
                    document.body.style.overflow = '';
                }
            });
        });
    });
    
    // ===== ESTILOS PARA LIGHTBOX =====
    const lightboxStyles = document.createElement('style');
    lightboxStyles.textContent = `
        .lightbox {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.9);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
            padding: 20px;
        }
        
        .lightbox-content {
            position: relative;
            max-width: 90%;
            max-height: 90%;
        }
        
        .lightbox-content img {
            max-width: 100%;
            max-height: 70vh;
            border-radius: 10px;
        }
        
        .lightbox-content p {
            color: white;
            text-align: center;
            margin-top: 15px;
            font-size: 18px;
        }
        
        .close-lightbox {
            position: absolute;
            top: -40px;
            right: 0;
            color: white;
            font-size: 40px;
            cursor: pointer;
            background: none;
            border: none;
            line-height: 1;
        }
        
        .close-lightbox:hover {
            color: #e40008;
        }
    `;
    document.head.appendChild(lightboxStyles);
    
    // ===== CONTADOR DE AÑO EN FOOTER =====
    const yearSpan = document.querySelector('#current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
    
    // ===== BOTON VOLVER ARRIBA =====
    const backToTopButton = document.querySelector('.back-to-top');
    if (backToTopButton) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTopButton.classList.add('show');
                backToTopButton.style.opacity = '1';
                backToTopButton.style.visibility = 'visible';
            } else {
                backToTopButton.classList.remove('show');
                backToTopButton.style.opacity = '0';
                backToTopButton.style.visibility = 'hidden';
            }
        });
        
        backToTopButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // ===== WHATSAPP BUTTON ANIMATION =====
    const whatsappBtn = document.querySelector('.whatsapp-float');
    if (whatsappBtn) {
        whatsappBtn.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
        });
        
        whatsappBtn.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    }
    
});

// ===== FUNCIONES AUXILIARES =====
function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}




// Submenú táctil en móvil
document.querySelectorAll('.has-submenu > a').forEach(link => {
    link.addEventListener('click', function(e) {
        if (window.innerWidth <= 992) {
            e.preventDefault();
            this.parentElement.classList.toggle('active');
        }
    });
});



// ===== CARRUSEL CLIENTES =====
const itemCarrusel = document.querySelector('.item-carrusel');
const imagenes = document.querySelectorAll('.item-carrusel img');
const btnPrev = document.querySelector('.carrusel-btn.prev');
const btnNext = document.querySelector('.carrusel-btn.next');


const imagenesPorPagina = 6; // cuántas imágenes se ven a la vez
let indice = 0;              // en qué imagen estamos parados

function mostrarImagenes() {
    imagenes.forEach((img, i) => {
        // ocultar todas
        img.style.display = 'none';
        
        // mostrar solo las del grupo actual
        if (i >= indice && i < indice + imagenesPorPagina) {
            img.style.display = 'block';
        }
    });
}

btnNext.addEventListener('click', function() {
    indice += imagenesPorPagina;
    
    // si pasamos el final, volver al inicio
    if (indice >= imagenes.length) {
        indice = 0;
    }
    
    mostrarImagenes();
});

btnPrev.addEventListener('click', function() {
    indice -= imagenesPorPagina;
    
    // si pasamos el inicio, ir al final
    if (indice < 0) {
        indice = imagenes.length - imagenesPorPagina;
    }
    
    mostrarImagenes();
});

// mostrar el primer grupo al cargar
mostrarImagenes();