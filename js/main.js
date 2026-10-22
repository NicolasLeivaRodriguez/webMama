/*
  Lógica de la página pública: pinta el catálogo, gestiona los
  filtros por categoría, el menú móvil y las animaciones al hacer scroll.
  No hace falta tocar este archivo para cambiar textos o productos
  (eso se edita en config.js y products.js).
*/

document.addEventListener("DOMContentLoaded", () => {
  aplicarConfiguracion();
  pintarProductos(PRODUCTOS);
  configurarFiltros();
  configurarMenuMovil();
  configurarRevelarAlScroll();
  configurarLightbox();
});

function aplicarConfiguracion() {
  document.title = CONFIG.nombreNegocio;

  document.querySelectorAll("[data-config]").forEach((el) => {
    const clave = el.getAttribute("data-config");
    if (CONFIG[clave]) el.textContent = CONFIG[clave];
  });

  document.querySelectorAll("[data-config-html]").forEach((el) => {
    const clave = el.getAttribute("data-config-html");
    if (CONFIG[clave]) el.innerHTML = CONFIG[clave];
  });

  const sobreMiImg = document.getElementById("sobre-mi-img");
  if (sobreMiImg && CONFIG.sobreMiImagen) sobreMiImg.src = CONFIG.sobreMiImagen;

  // WhatsApp flotante + enlaces de contacto
  const mensaje = encodeURIComponent(CONFIG.mensajeWhatsappGeneral || "Hola!");
  const urlWhatsapp = `https://wa.me/${CONFIG.whatsapp}?text=${mensaje}`;
  document.querySelectorAll(".js-whatsapp-general").forEach((a) => {
    a.href = urlWhatsapp;
  });

  const linkInstagram = document.getElementById("link-instagram");
  if (linkInstagram) {
    if (CONFIG.instagram) {
      linkInstagram.href = `https://instagram.com/${CONFIG.instagram}`;
    } else {
      linkInstagram.style.display = "none";
    }
  }

  const linkEmail = document.getElementById("link-email");
  if (linkEmail) {
    if (CONFIG.email) {
      linkEmail.href = `mailto:${CONFIG.email}`;
      linkEmail.textContent = CONFIG.email;
    } else {
      linkEmail.style.display = "none";
    }
  }
}

function formatearPrecio(precio) {
  return Number(precio).toLocaleString("es-ES", {
    style: "currency",
    currency: "EUR",
  });
}

function crearTarjetaProducto(producto) {
  const mensaje = encodeURIComponent(
    `¡Hola! Me interesa este producto: ${producto.nombre} (${formatearPrecio(producto.precio)})`
  );
  const urlWhatsapp = `https://wa.me/${CONFIG.whatsapp}?text=${mensaje}`;

  const articulo = document.createElement("article");
  articulo.className = "tarjeta-producto reveal";
  articulo.dataset.categoria = producto.categoria;

  articulo.innerHTML = `
    <div class="tarjeta-producto__imagen-wrap">
      <img src="${producto.imagen}" alt="${producto.nombre}" loading="lazy" class="tarjeta-producto__imagen js-lightbox-img">
      <span class="tarjeta-producto__categoria">${producto.categoria}</span>
    </div>
    <div class="tarjeta-producto__info">
      <h3 class="tarjeta-producto__nombre">${producto.nombre}</h3>
      <p class="tarjeta-producto__descripcion">${producto.descripcion}</p>
      <div class="tarjeta-producto__pie">
        <span class="tarjeta-producto__precio">${formatearPrecio(producto.precio)}</span>
        <a href="${urlWhatsapp}" target="_blank" rel="noopener" class="boton boton--whatsapp boton--pequeno">
          Preguntar
        </a>
      </div>
    </div>
  `;
  return articulo;
}

function pintarProductos(lista) {
  const contenedor = document.getElementById("grid-productos");
  const vacio = document.getElementById("productos-vacio");
  if (!contenedor) return;

  contenedor.innerHTML = "";

  if (!lista.length) {
    if (vacio) vacio.hidden = false;
    return;
  }
  if (vacio) vacio.hidden = true;

  lista.forEach((producto) => {
    contenedor.appendChild(crearTarjetaProducto(producto));
  });

  configurarRevelarAlScroll();
  configurarLightbox();
}

function configurarFiltros() {
  const contenedorFiltros = document.getElementById("filtros-categoria");
  if (!contenedorFiltros) return;

  const categorias = ["Todos", ...new Set(PRODUCTOS.map((p) => p.categoria))];

  contenedorFiltros.innerHTML = categorias
    .map(
      (cat, i) =>
        `<button class="pildora-filtro ${i === 0 ? "activa" : ""}" data-categoria="${cat}">${cat}</button>`
    )
    .join("");

  contenedorFiltros.addEventListener("click", (e) => {
    const boton = e.target.closest(".pildora-filtro");
    if (!boton) return;

    contenedorFiltros.querySelectorAll(".pildora-filtro").forEach((b) => b.classList.remove("activa"));
    boton.classList.add("activa");

    const categoria = boton.dataset.categoria;
    const filtrados = categoria === "Todos" ? PRODUCTOS : PRODUCTOS.filter((p) => p.categoria === categoria);
    pintarProductos(filtrados);
  });
}

function configurarMenuMovil() {
  const boton = document.getElementById("boton-menu");
  const nav = document.getElementById("nav-principal");
  if (!boton || !nav) return;

  boton.addEventListener("click", () => {
    nav.classList.toggle("abierto");
    boton.classList.toggle("activo");
  });

  nav.querySelectorAll("a").forEach((enlace) => {
    enlace.addEventListener("click", () => {
      nav.classList.remove("abierto");
      boton.classList.remove("activo");
    });
  });
}

function configurarRevelarAlScroll() {
  const elementos = document.querySelectorAll(".reveal:not(.reveal--visto)");
  if (!("IntersectionObserver" in window)) {
    elementos.forEach((el) => el.classList.add("reveal--visto"));
    return;
  }

  const observador = new IntersectionObserver(
    (entradas) => {
      entradas.forEach((entrada) => {
        if (entrada.isIntersecting) {
          entrada.target.classList.add("reveal--visto");
          observador.unobserve(entrada.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  elementos.forEach((el) => observador.observe(el));
}

function configurarLightbox() {
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  if (!lightbox || !lightboxImg) return;

  document.querySelectorAll(".js-lightbox-img").forEach((img) => {
    img.addEventListener("click", () => {
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
      lightbox.classList.add("visible");
    });
  });

  lightbox.addEventListener("click", () => {
    lightbox.classList.remove("visible");
  });
}
