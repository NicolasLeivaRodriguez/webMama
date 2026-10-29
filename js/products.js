/*
  ======================================================
  CATÁLOGO DE PRODUCTOS — edita solo este bloque
  ======================================================
  Cada producto es un bloque { ... } dentro de la lista PRODUCTOS.
  Puedes copiar un bloque, pegarlo y cambiar los datos para
  añadir uno nuevo a mano, o usar el panel de administración
  (admin.html) para hacerlo con un formulario.

  CAMPOS:
    id          -> texto único, sin espacios (ej: "letrero-gonzalo")
    nombre      -> nombre del producto
    precio      -> número, sin símbolo de euro (ej: 25 o 25.50)
    categoria   -> "Letreros", "Chupeteros", "Doudous" u otra que inventes
    descripcion -> frase corta describiendo el producto
    imagen      -> ruta del archivo de imagen (ver img/productos/)
    destacado   -> true/false, los destacados pueden resaltarse en el futuro

  IMÁGENES:
    Sube tus fotos a la carpeta  img/productos/
    y escribe aquí la ruta, por ejemplo:  "img/productos/mi-foto.jpg"

  Las 4 entradas de abajo son EJEMPLOS con fotos de muestra.
  Bórralas o edítalas cuando tengas tus productos reales.
*/

const PRODUCTOS = [
  {
    id: "ejemplo-letrero-1",
    nombre: "Letrero personalizado",
    precio: 24.9,
    categoria: "Letreros",
    descripcion: "Letrero tejido a mano con el nombre que quieras, ideal para decorar la habitación.",
    imagen: "img/productos/ejemplo-letrero-1.jpg",
    destacado: true,
  },
  {
    id: "ejemplo-letrero-2",
    nombre: "Letrero con lazo",
    precio: 27.5,
    categoria: "Letreros",
    descripcion: "Letrero colgante con detalles de lazo, perfecto para un regalo especial.",
    imagen: "img/productos/ejemplo-letrero-2.jpg",
    destacado: false,
  },
  {
    id: "ejemplo-chupeteros",
    nombre: "Chupetero tejido",
    precio: 9.9,
    categoria: "Chupeteros",
    descripcion: "Sujeta chupetes de crochet, disponible en varios colores y diseños.",
    imagen: "img/productos/ejemplo-chupeteros.jpg",
    destacado: false,
  },
  {
    id: "ejemplo-doudou",
    nombre: "Doudou conejito",
    precio: 19.9,
    categoria: "Doudous",
    descripcion: "Muñeco con manta de apego, super suave, ideal para los más pequeños.",
    imagen: "img/productos/ejemplo-doudou.jpg",
    destacado: true,
  },
  {
    id: "letrero-ambar",
    nombre: "Letrero Ámbar",
    precio: 24.9,
    categoria: "Letreros",
    descripcion: "Guirnalda tejida a mano con el nombre Ámbar, en tonos rosa y blanco con flores y borlas de remate.",
    imagen: "img/productos/letrero-ambar.png",
    destacado: false,
  },
];
