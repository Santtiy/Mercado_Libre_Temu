// Datos de productos simulados
const productosData = [
    {
        id: 1,
        nombre: "iPhone 14 Pro Max 256GB",
        precio: 4599000,
        descuento: 15,
        envioGratis: true,
        nuevo: true,
        icono: "fa-mobile-alt"
    },
    {
        id: 2,
        nombre: "Samsung Smart TV 55'' 4K UHD",
        precio: 2299000,
        descuento: 20,
        envioGratis: true,
        nuevo: false,
        icono: "fa-tv"
    },
    {
        id: 3,
        nombre: "PlayStation 5 Digital Edition",
        precio: 2799000,
        descuento: 0,
        envioGratis: true,
        nuevo: true,
        icono: "fa-gamepad"
    },
    {
        id: 4,
        nombre: "Laptop HP Pavilion 15.6'' i7",
        precio: 3499000,
        descuento: 10,
        envioGratis: true,
        nuevo: false,
        icono: "fa-laptop"
    },
    {
        id: 5,
        nombre: "Apple AirPods Pro 2da Gen",
        precio: 899000,
        descuento: 12,
        envioGratis: true,
        nuevo: true,
        icono: "fa-headphones"
    },
    {
        id: 6,
        nombre: "Bicicleta Montaña GW 29''",
        precio: 1299000,
        descuento: 25,
        envioGratis: false,
        nuevo: false,
        icono: "fa-bicycle"
    },
    {
        id: 7,
        nombre: "Nevera Samsung 21 pies",
        precio: 2199000,
        descuento: 18,
        envioGratis: true,
        nuevo: false,
        icono: "fa-snowflake"
    },
    {
        id: 8,
        nombre: "Zapatillas Nike Air Max 2023",
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

    if (query === '') {
        sectionTitle.textContent = 'Productos Destacados';
        loadMoreBtn.style.display = 'block';
        cargarProductos();
        return;
    }

    // Filtrar considerando múltiples factores (nombre, etc.)
    const productosFiltrados = productosData.filter(producto => {
        const matchNombre = producto.nombre.toLowerCase().includes(query);
        // Aquí se podrían agregar más criterios de búsqueda (categorías, marcas)
        return matchNombre;
    });

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
}

// Botón de búsqueda
document.getElementById('searchBtn').addEventListener('click', buscarProductos);

// Búsqueda al presionar Enter
document.getElementById('searchInput').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        buscarProductos();
    }
});

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

function inicializarFotoPerfil() {
    const profilePhoto = document.querySelector('.profile-photo');

    if (!profilePhoto) {
        return;
    }

    profilePhoto.addEventListener('error', () => {
        if (profilePhoto.dataset.fallbackApplied === 'true') {
            return;
        }

        const fallbackSrc = profilePhoto.dataset.fallbackSrc;
        if (fallbackSrc) {
            profilePhoto.dataset.fallbackApplied = 'true';
            profilePhoto.src = fallbackSrc;
        }
    });
}

function inicializarEnlaceGithubDinamico() {
    const githubLinks = document.querySelectorAll('.member-github-link');

    githubLinks.forEach((link) => {
        const label = link.querySelector('.github-link-label');
        const href = link.getAttribute('href') || '';

        if (!label) {
            return;
        }

        let usuario = '';
        try {
            const githubUrl = new URL(href);
            usuario = githubUrl.pathname.replace(/\//g, '');
        } catch (error) {
            usuario = '';
        }

        const textoBase = usuario ? `Ver GitHub @${usuario}` : 'Ver GitHub';
        label.textContent = textoBase;

        link.addEventListener('mouseenter', () => {
            label.textContent = 'Abrir perfil de GitHub';
        });

        link.addEventListener('mouseleave', () => {
            label.textContent = textoBase;
        });
    });
}

// Inicializar la página
document.addEventListener('DOMContentLoaded', () => {
    cargarProductos();
    cargarOfertas();
    iniciarContador();
    inicializarFotoPerfil();
    inicializarEnlaceGithubDinamico();
    
    // Mensaje de bienvenida en consola
    console.log('%c¡Bienvenido a Mercado Secuestrado!', 'color: #3483FA; font-size: 20px; font-weight: bold;');
    console.log('%cDesarrollado con ❤️ por el equipo de desarrollo', 'color: #666; font-size: 14px;');
});

// Eventos para redes sociales
document.querySelectorAll('.member-social a, .social-links a').forEach(link => {
    link.addEventListener('click', (e) => {
        const href = link.getAttribute('href') || '';
        const esEnlaceReal = href.startsWith('http://') || href.startsWith('https://');

        if (!esEnlaceReal) {
            e.preventDefault();
            mostrarNotificacion('Funcionalidad de redes sociales en desarrollo');
        }
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
            cargarProductos();
        }
    }, 500);
});

// Hacer el navbar responsive
const navMenu = document.querySelector('.nav-menu');
if (window.innerWidth < 768) {
    navMenu.style.display = 'none';
}

// Detectar cambio de tamaño de ventana
window.addEventListener('resize', () => {
    if (window.innerWidth < 768) {
        navMenu.style.display = 'none';
    } else {
        navMenu.style.display = 'flex';
    }
});

console.log('✅ Mercado Secuestrado cargado correctamente');
