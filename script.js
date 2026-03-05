// Datos de productos simulados
const productosData = [
    {
        id: 1,
        nombre: "iPhone 14 Pro Max 256GB",
        marca: "Apple",
        categoria: "Celulares y Smartphones",
        precio: 4599000,
        descuento: 15,
        envioGratis: true,
        nuevo: true,
        icono: "fa-mobile-alt"
    },
    {
        id: 2,
        nombre: "Samsung Smart TV 55'' 4K UHD",
        marca: "Samsung",
        categoria: "Televisores",
        precio: 2299000,
        descuento: 20,
        envioGratis: true,
        nuevo: false,
        icono: "fa-tv"
    },
    {
        id: 3,
        nombre: "PlayStation 5 Digital Edition",
        marca: "Sony",
        categoria: "Consolas",
        precio: 2799000,
        descuento: 0,
        envioGratis: true,
        nuevo: true,
        icono: "fa-gamepad"
    },
    {
        id: 4,
        nombre: "Laptop HP Pavilion 15.6'' i7",
        marca: "HP",
        categoria: "Computación",
        precio: 3499000,
        descuento: 10,
        envioGratis: true,
        nuevo: false,
        icono: "fa-laptop"
    },
    {
        id: 5,
        nombre: "Apple AirPods Pro 2da Gen",
        marca: "Apple",
        categoria: "Audio",
        precio: 899000,
        descuento: 12,
        envioGratis: true,
        nuevo: true,
        icono: "fa-headphones"
    },
    {
        id: 6,
        nombre: "Bicicleta Montaña GW 29''",
        marca: "GW",
        categoria: "Deportes",
        precio: 1299000,
        descuento: 25,
        envioGratis: false,
        nuevo: false,
        icono: "fa-bicycle"
    },
    {
        id: 7,
        nombre: "Nevera Samsung 21 pies",
        marca: "Samsung",
        categoria: "Electrodomésticos",
        precio: 2199000,
        descuento: 18,
        envioGratis: true,
        nuevo: false,
        icono: "fa-snowflake"
    },
    {
        id: 8,
        nombre: "Zapatillas Nike Air Max 2023",
        marca: "Nike",
        categoria: "Calzado",
        precio: 459000,
        descuento: 30,
        envioGratis: true,
        nuevo: true,
        icono: "fa-shoe-prints"
    }
];

const ofertasData = [
    {
        id: 1,
        nombre: "Audífonos Bluetooth JBL",
        precio: 129000,
        descuento: 50,
        icono: "fa-headphones-alt"
    },
    {
        id: 2,
        nombre: "Smartwatch Xiaomi Band 7",
        precio: 179000,
        descuento: 40,
        icono: "fa-clock"
    },
    {
        id: 3,
        nombre: "Mochila para Laptop",
        precio: 89000,
        descuento: 35,
        icono: "fa-backpack"
    },
    {
        id: 4,
        nombre: "Teclado Mecánico RGB",
        precio: 249000,
        descuento: 45,
        icono: "fa-keyboard"
    },
    {
        id: 5,
        nombre: "Mouse Gamer Logitech",
        precio: 159000,
        descuento: 38,
        icono: "fa-mouse"
    },
    {
        id: 6,
        nombre: "Webcam Full HD 1080p",
        precio: 199000,
        descuento: 42,
        icono: "fa-video"
    }
];

// Variables globales
let carrito = [];
let productosCargados = 8;
let navbarInicializado = false;

// Función para formatear precio en pesos colombianos
function formatearPrecio(precio) {
    return new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0
    }).format(precio);
}

// Función para calcular precio con descuento
function calcularPrecioConDescuento(precio, descuento) {
    return precio - (precio * descuento / 100);
}

// Función para crear tarjeta de producto
function crearProductoCard(producto) {
    const precioFinal = producto.descuento > 0 
        ? calcularPrecioConDescuento(producto.precio, producto.descuento)
        : producto.precio;

    return `
        <div class="product-card" data-id="${producto.id}">
            ${producto.nuevo ? '<span class="product-badge">NUEVO</span>' : ''}
            <div class="product-image">
                <i class="fas ${producto.icono}"></i>
            </div>
            <h3 class="product-title">${producto.nombre}</h3>
            <div class="product-price">${formatearPrecio(precioFinal)}</div>
            ${producto.descuento > 0 ? `
                <div class="product-discount">${producto.descuento}% OFF</div>
            ` : ''}
            ${producto.envioGratis ? `
                <div class="product-shipping">
                    <i class="fas fa-truck"></i>
                    Envío gratis
                </div>
            ` : ''}
        </div>
    `;
}

// Función para crear tarjeta de oferta
function crearOfertaCard(oferta) {
    const precioOriginal = oferta.precio;
    const precioFinal = calcularPrecioConDescuento(oferta.precio, oferta.descuento);

    return `
        <div class="deal-card" data-id="${oferta.id}">
            <div class="deal-image">
                <i class="fas ${oferta.icono}"></i>
            </div>
            <div class="deal-discount">${oferta.descuento}% OFF</div>
            <h4>${oferta.nombre}</h4>
            <div class="deal-price">${formatearPrecio(precioFinal)}</div>
            <div style="text-decoration: line-through; color: #999; font-size: 0.9rem;">
                ${formatearPrecio(precioOriginal)}
            </div>
        </div>
    `;
}

// Cargar productos en la página
function cargarProductos() {
    const productsGrid = document.getElementById('productsGrid');
    const productosHTML = productosData.map(producto => crearProductoCard(producto)).join('');
    productsGrid.innerHTML = productosHTML;
}

// Cargar ofertas en la página
function cargarOfertas() {
    const dealsGrid = document.getElementById('dealsGrid');
    const ofertasHTML = ofertasData.map(oferta => crearOfertaCard(oferta)).join('');
    dealsGrid.innerHTML = ofertasHTML;
}

// Función de búsqueda estilo Mercado Libre (feature/product-search)
function buscarProductos() {
    const searchInput = document.getElementById('searchInput');
    const query = searchInput.value.toLowerCase().trim();
    const sectionTitle = document.querySelector('#productos .section-title');
    const productsGrid = document.getElementById('productsGrid');
    const loadMoreBtn = document.getElementById('loadMoreBtn');

    const heroBanner = document.querySelector('.hero-banner');
    const categoriesSection = document.querySelector('.categories');

    if (query === '') {
        sectionTitle.textContent = 'Productos Destacados';
        loadMoreBtn.style.display = 'block';
        if (heroBanner) heroBanner.style.display = 'block';
        if (categoriesSection) categoriesSection.style.display = 'block';
        cargarProductos();
        return;
    }

    // Filtrar considerando múltiples factores (nombre, categorías, etc.)
    const productosFiltrados = productosData.filter(producto => {
        const queryWords = query.split(' ');
        const productoTexto = `${producto.nombre} ${producto.marca || ''} ${producto.categoria || ''}`.toLowerCase();
        
        // Verifica si TODAS las palabras de búsqueda están en el texto del producto
        return queryWords.every(word => productoTexto.includes(word));
    });

    // Ocultar elementos que no son relevantes durante la búsqueda (estilo Mercado Libre)
    if (heroBanner) heroBanner.style.display = 'none';
    if (categoriesSection) categoriesSection.style.display = 'none';

    // Actualizar título con cantidad de resultados al estilo ML
    sectionTitle.innerHTML = `<span style="font-weight: normal; font-size: 1.2rem;">${productosFiltrados.length} resultados para </span>"${searchInput.value}"`;
    loadMoreBtn.style.display = 'none'; // Ocultar botón de cargar más en búsquedas
    
    if (productosFiltrados.length === 0) {
        productsGrid.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 60px 20px; background: white; border-radius: 8px; box-shadow: var(--shadow);">
                <i class="fas fa-search" style="font-size: 4rem; color: #e6e6e6; margin-bottom: 20px;"></i>
                <h3 style="font-size: 1.5rem; color: var(--dark-color); margin-bottom: 10px;">No hay publicaciones que coincidan con tu búsqueda.</h3>
                <ul style="list-style: none; color: #666; font-size: 1rem; text-align: left; max-width: 400px; margin: 0 auto;">
                    <li style="margin-bottom: 8px;">• <strong>Revisa la ortografía</strong> de la palabra.</li>
                    <li style="margin-bottom: 8px;">• Utiliza <strong>palabras más genéricas</strong> o menos palabras.</li>
                    <li>• Navega por las <strong>categorías</strong> para encontrar un producto similar.</li>
                </ul>
            </div>
        `;
    } else {
        // Ordenar resultados por relevancia (simulado) y renderizar
        const productosHTML = productosFiltrados.map(producto => crearProductoCard(producto)).join('');
        productsGrid.innerHTML = productosHTML;
    }

    // Al buscar, hacer scroll suave hacia la sección de productos si no está visible
    const productosSection = document.getElementById('productos');
    if (productosSection) {
        productosSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// Botón de búsqueda
document.getElementById('searchBtn').addEventListener('click', buscarProductos);

// Búsqueda al presionar Enter
document.getElementById('searchInput').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        buscarProductos();
    }
});

// Navbar: menu movil, seccion activa y navegacion principal
function inicializarNavbar() {
    if (navbarInicializado) {
        return;
    }

    const navMenu = document.querySelector('.nav-menu');
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.querySelectorAll('.nav-menu > li > a');
    const submenuLinks = document.querySelectorAll('.submenu a');
    const submenuContainer = document.querySelector('.has-submenu');
    const submenuToggle = document.querySelector('.submenu-toggle');
    const logo = document.querySelector('.logo');
    const heroButton = document.querySelector('.btn-primary');

    if (!navMenu || !navToggle) {
        return;
    }

    const actualizarEstadoBoton = (abierto) => {
        navToggle.setAttribute('aria-expanded', abierto ? 'true' : 'false');
        navToggle.setAttribute('aria-label', abierto ? 'Cerrar menu' : 'Abrir menu');
        navToggle.innerHTML = abierto
            ? '<i class="fas fa-times"></i>'
            : '<i class="fas fa-bars"></i>';
    };

    const setSubmenuOpen = (abierto) => {
        if (!submenuContainer || !submenuToggle) {
            return;
        }
        submenuContainer.classList.toggle('open', abierto);
        submenuToggle.setAttribute('aria-expanded', abierto ? 'true' : 'false');
    };

    const cerrarMenuMovil = () => {
        navMenu.classList.remove('show');
        actualizarEstadoBoton(false);
        setSubmenuOpen(false);
    };

    navToggle.addEventListener('click', () => {
        const abierto = navMenu.classList.toggle('show');
        actualizarEstadoBoton(abierto);
    });

    const setActiveLink = (idSeccion) => {
        navLinks.forEach(link => {
            const activo = link.getAttribute('href') === `#${idSeccion}`;
            link.classList.toggle('active', activo);
        });
    };

    const activarSeccionActual = () => {
        const topOffset = window.scrollY + 140;
        const sections = [...navLinks]
            .map(link => link.getAttribute('href'))
            .filter(href => href && href.startsWith('#'))
            .map(href => document.querySelector(href))
            .filter(Boolean);

        let seccionActiva = sections[0];
        sections.forEach(section => {
            if (topOffset >= section.offsetTop) {
                seccionActiva = section;
            }
        });

        if (seccionActiva) {
            setActiveLink(seccionActiva.id);
        }
    };

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const href = link.getAttribute('href');
            if (!href || !href.startsWith('#')) {
                return;
            }

            const target = document.querySelector(href);
            if (!target) {
                return;
            }

            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });

            setActiveLink(href.slice(1));
            if (window.innerWidth <= 768) {
                cerrarMenuMovil();
            }
        });
    });

    if (submenuToggle && submenuContainer) {
        submenuToggle.addEventListener('click', () => {
            const abierto = submenuToggle.getAttribute('aria-expanded') === 'true';
            setSubmenuOpen(!abierto);
        });
    }

    submenuLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector('#productos');
            const categoryName = link.dataset.category || '';
            const searchInput = document.getElementById('searchInput');

            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }

            if (searchInput && categoryName) {
                searchInput.value = categoryName;
                buscarProductos();
            }

            setActiveLink('productos');
            if (window.innerWidth <= 768) {
                cerrarMenuMovil();
            } else {
                setSubmenuOpen(false);
            }
        });
    });

    const sections = [...navLinks]
        .map(link => link.getAttribute('href'))
        .filter(href => href && href.startsWith('#'))
        .map(href => document.querySelector(href))
        .filter(Boolean);

    const navbarObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setActiveLink(entry.target.id);
            }
        });
    }, {
        threshold: 0.35,
        rootMargin: '-80px 0px -45% 0px'
    });

    sections.forEach(section => navbarObserver.observe(section));
    activarSeccionActual();

    if (logo) {
        logo.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
            activarSeccionActual();
            if (window.innerWidth <= 768) {
                cerrarMenuMovil();
            }
        });
    }

    if (heroButton) {
        heroButton.addEventListener('click', () => {
            const ofertas = document.getElementById('ofertas');
            if (ofertas) {
                ofertas.scrollIntoView({ behavior: 'smooth', block: 'start' });
                setActiveLink('ofertas');
            }
        });
    }

    document.addEventListener('click', (event) => {
        const clickDentroNavbar = event.target.closest('.nav-bottom');
        if (!clickDentroNavbar && window.innerWidth <= 768 && navMenu.classList.contains('show')) {
            cerrarMenuMovil();
        }

        const clickEnSubmenu = event.target.closest('.has-submenu');
        if (!clickEnSubmenu && submenuContainer && submenuContainer.classList.contains('open')) {
            setSubmenuOpen(false);
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            if (navMenu.classList.contains('show')) {
                cerrarMenuMovil();
            }
            setSubmenuOpen(false);
        }
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            navMenu.classList.remove('show');
            actualizarEstadoBoton(false);
            setSubmenuOpen(false);
        }
        activarSeccionActual();
    });

    window.addEventListener('scroll', activarSeccionActual, { passive: true });

    navbarInicializado = true;
}

// Contador de tiempo para ofertas
function iniciarContador() {
    const countdownElement = document.getElementById('countdown');
    
    // Establecer tiempo final (24 horas desde ahora)
    const ahora = new Date().getTime();
    const tiempoFinal = ahora + (24 * 60 * 60 * 1000);

    const intervalo = setInterval(() => {
        const ahora = new Date().getTime();
        const diferencia = tiempoFinal - ahora;

        if (diferencia < 0) {
            clearInterval(intervalo);
            countdownElement.innerHTML = "¡Ofertas terminadas!";
            return;
        }

        const horas = Math.floor((diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
        const segundos = Math.floor((diferencia % (1000 * 60)) / 1000);

        countdownElement.innerHTML = `${String(horas).padStart(2, '0')}:${String(minutos).padStart(2, '0')}:${String(segundos).padStart(2, '0')}`;
    }, 1000);
}

// Botón scroll to top
const scrollTopBtn = document.getElementById('scrollTopBtn');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollTopBtn.classList.add('show');
    } else {
        scrollTopBtn.classList.remove('show');
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Smooth scroll para enlaces internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        if (this.closest('.nav-menu')) {
            return;
        }
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Animación al hacer scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observar elementos cuando se cargan
function observarElementos() {
    document.querySelectorAll('.product-card, .deal-card, .service-card, .team-member').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.5s ease-out';
        observer.observe(el);
    });
}

// Función para agregar al carrito
function agregarAlCarrito(productoId) {
    const producto = productosData.find(p => p.id === productoId);
    if (producto) {
        carrito.push(producto);
        actualizarContadorCarrito();
        mostrarNotificacion('Producto agregado al carrito');
    }
}

// Actualizar contador del carrito
function actualizarContadorCarrito() {
    const cartCount = document.querySelector('.cart-count');
    cartCount.textContent = carrito.length;
    
    // Animación del contador
    cartCount.style.transform = 'scale(1.3)';
    setTimeout(() => {
        cartCount.style.transform = 'scale(1)';
    }, 200);
}

// Mostrar notificación
function mostrarNotificacion(mensaje) {
    // Crear elemento de notificación
    const notificacion = document.createElement('div');
    notificacion.textContent = mensaje;
    notificacion.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background-color: var(--success-color);
        color: white;
        padding: 15px 25px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        z-index: 10000;
        animation: slideIn 0.3s ease-out;
    `;
    
    document.body.appendChild(notificacion);
    
    // Eliminar después de 3 segundos
    setTimeout(() => {
        notificacion.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => {
            document.body.removeChild(notificacion);
        }, 300);
    }, 3000);
}

// Event listeners para productos
document.addEventListener('click', (e) => {
    if (e.target.closest('.product-card')) {
        const productCard = e.target.closest('.product-card');
        const productoId = parseInt(productCard.dataset.id);
        agregarAlCarrito(productoId);
    }
});

// Botón cargar más productos
document.getElementById('loadMoreBtn').addEventListener('click', () => {
    mostrarNotificacion('Cargando más productos...');
    // Aquí se podrían cargar más productos desde una API
    setTimeout(() => {
        mostrarNotificacion('No hay más productos disponibles por ahora');
    }, 1000);
});

// Efecto hover en categorías
document.querySelectorAll('.category-item').forEach(item => {
    item.addEventListener('click', function() {
        const categoria = this.querySelector('h3').textContent;
        mostrarNotificacion(`Explorando categoría: ${categoria}`);
    });
});

// Animación de entrada para las secciones
window.addEventListener('load', () => {
    observarElementos();
});

// Efecto parallax en el hero banner
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroContent = document.querySelector('.banner-content');
    if (heroContent) {
        heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
        heroContent.style.opacity = 1 - (scrolled / 500);
    }
});

// Agregar animaciones CSS dinámicamente
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Inicializar la página
document.addEventListener('DOMContentLoaded', () => {
    inicializarNavbar();
    cargarProductos();
    cargarOfertas();
    iniciarContador();
    
    // Mensaje de bienvenida en consola
    console.log('%c¡Bienvenido a Mercado Secuestrado!', 'color: #3483FA; font-size: 20px; font-weight: bold;');
    console.log('%cDesarrollado con ❤️ por el equipo de desarrollo', 'color: #666; font-size: 14px;');
});

// Eventos para redes sociales
document.querySelectorAll('.member-social a, .social-links a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        mostrarNotificacion('Funcionalidad de redes sociales en desarrollo');
    });
});

// Prevenir comportamiento por defecto en links de ejemplo
document.querySelectorAll('.footer-section a, .app-badge').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const texto = link.textContent.trim();
        if (texto) {
            mostrarNotificacion(`Navegando a: ${texto}`);
        }
    });
});

// Efecto de escritura en tiempo real para el buscador
let searchTimeout;
document.getElementById('searchInput').addEventListener('input', () => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
        const query = document.getElementById('searchInput').value;
        if (query.length > 2) {
            buscarProductos();
        } else if (query.length === 0) {
            buscarProductos();
        }
    }, 500);
});

console.log('✅ Mercado Secuestrado cargado correctamente');
