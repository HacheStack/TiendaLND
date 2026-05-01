# 🎵 Hache's Records

Proyecto académico desarrollado para la asignatura de **Lenguaje de Marcas**.

Se trata de una **tienda web de vinilos de segunda mano**, desarrollada como una página estática utilizando **HTML, CSS y JavaScript vanilla**, ampliada con una sección de catálogo generada mediante transformación **XML + XSLT**.

🔗 **Web desplegada:**
[https://viniloslnd.bluecrab615.workers.dev/](https://viniloslnd.bluecrab615.workers.dev/)

🔗 **Repositorio:**
[https://github.com/HacheStack/TiendaLND](https://github.com/HacheStack/TiendaLND)

***

## 📌 Características

* Catálogo de vinilos con página de detalle por álbum
* Reproductor de audio integrado tipo *jukebox*
* Carrito de compra simulado
* Diseño responsive
* Menú hamburguesa para dispositivos móviles
* Navegación entre páginas HTML enlazadas
* Catálogo XML con transformación XSLT y consultas XPath avanzadas

***

## 🛠️ Tecnologías utilizadas

* HTML5
* CSS3
* JavaScript (vanilla)
* XML + DTD
* XSLT 1.0
* Python (lxml) — transformación XML → HTML
* Cloudflare Pages / Workers
* GitHub

***

## 📁 Estructura del proyecto

```text
TiendaLND/
├── index.html
├── detalle.html
├── catalogo-tabla.html
├── transformar.py
├── pages/
├── xml/
│   ├── catalogo.xml
│   ├── catalogo.dtd
│   └── catalogo.xsl
└── assets/
    ├── css/
    │   ├── style.css
    │   ├── detalle.css
    │   └── tabla.css
    ├── js/
    │   ├── main.js
    │   └── detalle.js
    ├── img/
    ├── audio/
    └── fonts/
```

***

## 👤 Autor

Hache
