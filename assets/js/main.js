const songs = [
    {
        title: "Kind of Blue",
        artist: "Miles Davis",
        img: "assets/img/kind-of-blue.jpg",
        url: "assets/audio/kind-of-blue.mp3"
    },
    {
        title: "Abbey Road",
        artist: "The Beatles",
        img: "assets/img/abbey-road.jpg",
        url: "assets/audio/abbey-road.mp3"
    },
    {
        title: "Rumours",
        artist: "Fleetwood Mac",
        img: "assets/img/rumours.jpg",
        url: "assets/audio/rumours.mp3"
    },
    {
        title: "Blue Train",
        artist: "John Coltrane",
        img: "assets/img/blue-train.jpg",
        url: "assets/audio/blue-train.mp3"
    },
    {
        title: "The Dark Side of the Moon",
        artist: "Pink Floyd",
        img: "assets/img/dark-side-of-the-moon.jpg",
        url: "assets/audio/dark-side-of-the-moon.mp3"
    },
    {
        title: "Back to Black",
        artist: "Amy Winehouse",
        img: "assets/img/back-to-black.jpg",
        url: "assets/audio/back-to-black.mp3"
    },
    {
        title: "Nevermind",
        artist: "Nirvana",
        img: "assets/img/nevermind.jpg",
        url: "assets/audio/nevermind.mp3"
    },
    {
        title: "Thriller",
        artist: "Michael Jackson",
        img: "assets/img/thriller.jpg",
        url: "assets/audio/thriller.mp3"
    },
    {
        title: "Born to Run",
        artist: "Bruce Springsteen",
        img: "assets/img/born-to-run.jpg",
        url: "assets/audio/born-to-run.mp3"
    }
];

/* Referencias DOM */
const player = document.querySelector(".player");
const disc = player.querySelector(".disc");
const playBtn = player.querySelector(".play");
const prevBtn = player.querySelector(".btn-prev");
const nextBtn = player.querySelector(".btn-next");
const playIcon = playBtn.querySelector("i");
const currentSong = document.getElementById("current-song");
const audio = document.getElementById("player-audio");
const cards = document.querySelectorAll(".disco-card");
const sampleBtns = document.querySelectorAll(".btn-play-sample");

let currentIndex = 0;

/* Cargar canción en el reproductor */
function loadSong(index) {
    const s = songs[index];
    currentIndex = index;

    disc.style.backgroundImage = `url('${s.img}')`;
    disc.style.backgroundSize = "cover";
    disc.style.backgroundPosition = "center";

    currentSong.textContent = `${s.title} — ${s.artist}`;

    audio.src = s.url;
    audio.load();

    cards.forEach((card, i) => {
        card.classList.toggle("activo", i === index);
    });

    sampleBtns.forEach((btn, i) => {
        btn.classList.toggle("activo", i === index);
        const icono = btn.querySelector("i");
        icono.className = (i === index && player.classList.contains("playing"))
            ? "fa fa-pause"
            : "fa fa-play";
    });
}

/* Reproducir */
function playSong() {
    player.classList.add("playing");
    playIcon.className = "fa fa-pause";

    audio.play().catch((err) => {
        console.warn("No se pudo reproducir el audio:", err);
    });

    sampleBtns[currentIndex].querySelector("i").className = "fa fa-pause";
}

/* Pausar */
function pauseSong() {
    player.classList.remove("playing");
    playIcon.className = "fa fa-play";
    audio.pause();
    sampleBtns[currentIndex].querySelector("i").className = "fa fa-play";
}

/* Botón principal play / pausa */
playBtn.addEventListener("click", function (e) {
    e.preventDefault();

    if (player.classList.contains("playing")) {
        pauseSong();
    } else {
        playSong();
    }
});

/* Botón anterior */
prevBtn.addEventListener("click", function (e) {
    e.preventDefault();

    const wasPlaying = player.classList.contains("playing");
    if (wasPlaying) pauseSong();

    loadSong((currentIndex - 1 + songs.length) % songs.length);

    if (wasPlaying) playSong();
});

/* Botón siguiente */
nextBtn.addEventListener("click", function (e) {
    e.preventDefault();

    const wasPlaying = player.classList.contains("playing");
    if (wasPlaying) pauseSong();

    loadSong((currentIndex + 1) % songs.length);

    if (wasPlaying) playSong();
});

/* Cuando termina una canción, pasa a la siguiente */
audio.addEventListener("ended", function () {
    loadSong((currentIndex + 1) % songs.length);
    playSong();
});

/* Botones Play Sample del catálogo */
sampleBtns.forEach((btn, index) => {
    btn.addEventListener("click", function () {
        if (player.classList.contains("playing") && currentIndex === index) {
            pauseSong();
        } else {
            if (player.classList.contains("playing")) pauseSong();
            loadSong(index);
            playSong();

            document.getElementById("jukebox").scrollIntoView({
                behavior: "smooth",
                block: "nearest"
            });
        }
    });
});

/* Estado inicial */
loadSong(0);

/* ── Menú hamburguesa ── */
const navToggle = document.querySelector('.nav-toggle');
const navMenu   = document.querySelector('header nav');

if (navToggle && navMenu) {
  navToggle.addEventListener('click', function () {
    const abierto = navMenu.classList.toggle('abierto');
    navToggle.classList.toggle('abierto');
    navToggle.setAttribute('aria-expanded', abierto);
  });

  /* Cierra el menú al pulsar un enlace */
  navMenu.querySelectorAll('a').forEach(function(link) {
    link.addEventListener('click', function () {
      navMenu.classList.remove('abierto');
      navToggle.classList.remove('abierto');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}
