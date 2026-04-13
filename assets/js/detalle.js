/* =============================================
   HACHE'S RECORDS — detalle.js
   Cargado desde: assets/js/detalle.js

   Flujo:
     1. Lee el parámetro ?id=N de la URL
     2. Busca el disco en el array `catalogo`
     3. Rellena el HTML con sus datos
     4. Gestiona el modal de carrito y la pasarela simulada

   Cuando el catálogo venga de un XML, solo hay que
   sustituir el array `catalogo` por la lectura del XML.
   El resto del código no cambia.
============================================= */

/* ── Datos del catálogo ─────────────────────────────────────────────
   Misma estructura que main.js.
   Cuando llegue el XML, este array se generará leyendo el fichero.
   ─────────────────────────────────────────────────────────────────── */
const catalogo = [
  {
    id:          "kind-of-blue",
    titulo:      "Kind of Blue",
    artista:     "Miles Davis",
    estado:      "VG+",
    precio:      "18,00 €",
    img:         "assets/img/kind-of-blue.jpg",
    descripcion: "Considerado el disco de jazz más vendido de todos los tiempos. Grabado en 1959, Kind of Blue definió el jazz modal con improvisaciones atemporales que siguen sonando igual de frescas hoy. Una pieza imprescindible para cualquier coleccionista."
  },
  {
    id:          "abbey-road",
    titulo:      "Abbey Road",
    artista:     "The Beatles",
    estado:      "Mint",
    precio:      "25,00 €",
    img:         "assets/img/abbey-road.jpg",
    descripcion: "El penúltimo álbum de The Beatles, publicado en 1969. Contiene algunas de sus canciones más memorables — Come Together, Something, Here Comes the Sun — y el célebre medley del lado B. Un cierre de época hecho obra de arte."
  },
  {
    id:          "rumours",
    titulo:      "Rumours",
    artista:     "Fleetwood Mac",
    estado:      "VG",
    precio:      "14,00 €",
    img:         "assets/img/rumours.jpg",
    descripcion: "Grabado en plena crisis personal de todos los miembros de la banda en 1977. Uno de los álbumes de rock más vendidos de la historia, con clásicos como Go Your Own Way y The Chain. Una obra que convirtió el dolor en música perfecta."
  },
  {
    id:          "blue-train",
    titulo:      "Blue Train",
    artista:     "John Coltrane",
    estado:      "VG+",
    precio:      "20,00 €",
    img:         "assets/img/blue-train.jpg",
    descripcion: "La única grabación de Coltrane para Blue Note Records (1958). Considerado uno de los pilares del hard bop, Blue Train muestra a un Coltrane en plena madurez con una sección rítmica de primera línea. Esencial en cualquier colección de jazz."
  },
  {
    id:          "dark-side-of-the-moon",
    titulo:      "The Dark Side of the Moon",
    artista:     "Pink Floyd",
    estado:      "Mint",
    precio:      "30,00 €",
    img:         "assets/img/dark-side-of-the-moon.jpg",
    descripcion: "Publicado en 1973, permaneció en las listas del Billboard durante más de 950 semanas. Una obra maestra del rock progresivo que explora el tiempo, la avaricia y la locura con una producción sonora que aún no ha sido superada."
  },
  {
    id:          "back-to-black",
    titulo:      "Back to Black",
    artista:     "Amy Winehouse",
    estado:      "VG+",
    precio:      "16,00 €",
    img:         "assets/img/back-to-black.jpg",
    descripcion: "El segundo y último álbum de estudio de Amy Winehouse (2006). Ganador de cinco premios Grammy, fusiona soul, R&B y sonidos Motown con una voz y una honestidad emocional que no se han vuelto a escuchar igual."
  },
  {
    id:          "nevermind",
    titulo:      "Nevermind",
    artista:     "Nirvana",
    estado:      "VG+",
    precio:      "22,00 €",
    img:         "assets/img/nevermind.jpg",
    descripcion: "El segundo álbum de Nirvana (1991) que catapultó el grunge al mainstream mundial y cambió para siempre el rumbo del rock. Smells Like Teen Spirit se convirtió en himno de una generación. Treinta años después sigue sin envejecer."
  },
  {
    id:          "thriller",
    titulo:      "Thriller",
    artista:     "Michael Jackson",
    estado:      "Mint",
    precio:      "28,00 €",
    img:         "assets/img/thriller.jpg",
    descripcion: "El álbum más vendido de la historia con más de 70 millones de copias. Publicado en 1982, contiene siete sencillos que llegaron al top 10, producidos por Quincy Jones. Un hito de la música pop que definió los años 80."
  },
  {
    id:          "born-to-run",
    titulo:      "Born to Run",
    artista:     "Bruce Springsteen",
    estado:      "VG",
    precio:      "19,00 €",
    img:         "assets/img/born-to-run.jpg",
    descripcion: "Tercer álbum de Springsteen (1975), considerado uno de los mejores discos de rock de todos los tiempos. La canción que da título al álbum se convirtió en el himno de toda una clase trabajadora americana. Épico, cinematográfico, inmortal."
  }
];

/* ── Leer parámetro ?id= de la URL ── */
const params = new URLSearchParams(window.location.search);
const discoId = params.get('id');

/* ── Buscar el disco en el array ── */
const disco = catalogo.find(function(d) { return d.id === discoId; });

/* ── Rellenar el HTML ── */
if (disco) {
  document.title = disco.titulo + " — Hache's Records";

  document.getElementById('detalle-img').src        = disco.img;
  document.getElementById('detalle-img').alt        = disco.titulo + ', ' + disco.artista;
  document.getElementById('detalle-artista').textContent  = disco.artista;
  document.getElementById('detalle-titulo').textContent   = disco.titulo;
  document.getElementById('detalle-estado').textContent   = 'Estado: ' + disco.estado;
  document.getElementById('detalle-precio').textContent   = disco.precio;
  document.getElementById('detalle-descripcion').textContent = disco.descripcion;

  /* Rellenar también el modal del carrito */
  document.getElementById('modal-img').src          = disco.img;
  document.getElementById('modal-img').alt          = disco.titulo;
  document.getElementById('modal-nombre').textContent    = disco.titulo;
  document.getElementById('modal-artista').textContent   = disco.artista;
  document.getElementById('modal-precio').textContent    = disco.precio;
  document.getElementById('modal-total').textContent     = disco.precio;

} else {
  /* Disco no encontrado → mostrar mensaje */
  document.querySelector('.detalle-main').innerHTML =
    '<p style="text-align:center;padding:4rem;color:var(--texto-s)">Disco no encontrado. <a href="index.html">Volver al catálogo</a></p>';
}

/* ── Referencias a los modales ── */
const modalCarrito = document.getElementById('modal-carrito');
const modalPago    = document.getElementById('modal-pago');

/* ── Abrir carrito al pulsar "Añadir al carrito" ── */
document.getElementById('btn-comprar').addEventListener('click', function() {
  modalCarrito.classList.add('activo');
});

/* ── Cerrar carrito ── */
document.getElementById('btn-cerrar-carrito').addEventListener('click', function() {
  modalCarrito.classList.remove('activo');
});

/* Cerrar al hacer clic fuera del modal */
modalCarrito.addEventListener('click', function(e) {
  if (e.target === modalCarrito) modalCarrito.classList.remove('activo');
});

/* ── Proceder al pago → abrir pasarela de mantenimiento ── */
document.getElementById('btn-pagar').addEventListener('click', function() {
  modalCarrito.classList.remove('activo');
  modalPago.classList.add('activo');
});

/* ── Cerrar pasarela ── */
document.getElementById('btn-cerrar-pago').addEventListener('click', function() {
  modalPago.classList.remove('activo');
});

/* ── Volver al carrito desde la pasarela ── */
document.getElementById('btn-volver').addEventListener('click', function() {
  modalPago.classList.remove('activo');
  modalCarrito.classList.add('activo');
});

/* Cerrar pasarela al hacer clic fuera */
modalPago.addEventListener('click', function(e) {
  if (e.target === modalPago) modalPago.classList.remove('activo');
});

/* ── Tecla Escape cierra cualquier modal abierto ── */
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    modalCarrito.classList.remove('activo');
    modalPago.classList.remove('activo');
  }
});
