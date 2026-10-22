/*
  ======================================================
  PANEL DE ADMINISTRACIÓN
  ======================================================
  IMPORTANTE (léelo antes de nada):
  Esta web es 100% estática (sin servidor ni base de datos),
  así que este panel NO guarda los productos "en la nube".
  Lo que hace es dejarte añadir/quitar productos con un
  formulario cómodo y, al final, te genera el archivo
  js/products.js actualizado para que lo descargues y
  sustituyas al que ya tienes en el proyecto. Luego solo
  tienes que volver a subir la web a donde la tengas alojada.

  La contraseña de aquí abajo NO es seguridad real (cualquiera
  que mire el código fuente podría verla). Es solo un cerrojo
  sencillo para que un visitante curioso que encuentre esta
  URL no pueda toquetear el catálogo por accidente. No enlaces
  esta página desde el menú público ni la compartas.
*/

const ADMIN_PASSWORD = "cambia-esta-clave"; // TODO: pon aquí tu propia contraseña

let catalogoActual = [...PRODUCTOS];

document.addEventListener("DOMContentLoaded", () => {
  configurarAcceso();
  document.getElementById("form-producto").addEventListener("submit", anadirProducto);
  document.getElementById("boton-descargar").addEventListener("click", descargarProductsJs);
  pintarListaAdmin();
});

function configurarAcceso() {
  const pantallaLogin = document.getElementById("pantalla-login");
  const panel = document.getElementById("panel-admin");
  const form = document.getElementById("form-login");
  const error = document.getElementById("error-login");

  if (sessionStorage.getItem("webmama-admin-ok") === "si") {
    pantallaLogin.hidden = true;
    panel.hidden = false;
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const valor = document.getElementById("campo-password").value;
    if (valor === ADMIN_PASSWORD) {
      sessionStorage.setItem("webmama-admin-ok", "si");
      pantallaLogin.hidden = true;
      panel.hidden = false;
    } else {
      error.hidden = false;
    }
  });
}

function slugify(texto) {
  return texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function anadirProducto(e) {
  e.preventDefault();

  const nombre = document.getElementById("campo-nombre").value.trim();
  const precio = parseFloat(document.getElementById("campo-precio").value);
  const categoriaSelect = document.getElementById("campo-categoria").value;
  const categoriaNueva = document.getElementById("campo-categoria-nueva").value.trim();
  const categoria = categoriaSelect === "__nueva__" ? categoriaNueva : categoriaSelect;
  const descripcion = document.getElementById("campo-descripcion").value.trim();
  const imagen = document.getElementById("campo-imagen").value.trim();
  const destacado = document.getElementById("campo-destacado").checked;

  if (!nombre || !categoria || isNaN(precio) || !imagen) {
    alert("Rellena al menos: nombre, precio, categoría e imagen.");
    return;
  }

  const nuevo = {
    id: slugify(nombre) + "-" + Date.now(),
    nombre,
    precio,
    categoria,
    descripcion,
    imagen,
    destacado,
  };

  catalogoActual.push(nuevo);
  pintarListaAdmin();
  document.getElementById("form-producto").reset();
  document.getElementById("campo-categoria-nueva").hidden = true;
}

function eliminarProducto(id) {
  catalogoActual = catalogoActual.filter((p) => p.id !== id);
  pintarListaAdmin();
}

function pintarListaAdmin() {
  const contenedor = document.getElementById("lista-admin");
  contenedor.innerHTML = "";
  document.getElementById("contador-admin").textContent = catalogoActual.length;

  if (!catalogoActual.length) {
    contenedor.innerHTML = `<p class="productos-vacio">No hay productos todavía.</p>`;
    return;
  }

  catalogoActual.forEach((p) => {
    const fila = document.createElement("div");
    fila.className = "fila-admin";
    fila.innerHTML = `
      <img src="${p.imagen}" alt="${p.nombre}" onerror="this.style.opacity=0.2">
      <div class="fila-admin__info">
        <strong>${p.nombre}</strong>
        <span>${p.categoria} · ${Number(p.precio).toFixed(2)} €${p.destacado ? " · ⭐ destacado" : ""}</span>
      </div>
      <button type="button" class="boton-eliminar" data-id="${p.id}">Eliminar</button>
    `;
    fila.querySelector(".boton-eliminar").addEventListener("click", () => eliminarProducto(p.id));
    contenedor.appendChild(fila);
  });
}

function descargarProductsJs() {
  const cabecera = `/*
  ======================================================
  CATÁLOGO DE PRODUCTOS — generado desde admin.html
  ======================================================
  Sustituye el archivo js/products.js de tu proyecto por
  este, y vuelve a subir la web a tu hosting.
*/

const PRODUCTOS = `;

  const cuerpo = JSON.stringify(catalogoActual, null, 2);
  const contenido = cabecera + cuerpo + ";\n";

  const blob = new Blob([contenido], { type: "text/javascript" });
  const url = URL.createObjectURL(blob);
  const enlace = document.createElement("a");
  enlace.href = url;
  enlace.download = "products.js";
  enlace.click();
  URL.revokeObjectURL(url);
}

// Muestra/oculta el campo de categoría nueva
document.addEventListener("DOMContentLoaded", () => {
  const select = document.getElementById("campo-categoria");
  const campoNueva = document.getElementById("campo-categoria-nueva");
  select.addEventListener("change", () => {
    campoNueva.hidden = select.value !== "__nueva__";
  });
});
