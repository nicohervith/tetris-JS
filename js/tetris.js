const MARGEN_TABLERO = 10;
let regulador_velocidad_teclas = 0;
let regulador_de_caida = 0;
let lineas_hechas = 0;
let pausado = false;
let puedeJugar = true;

const $btnPausar = document.querySelector("#btnPausar"),
  $btnIniciar = document.querySelector("#btnIniciar"),
  $btnRotar = document.querySelector("#btnRotar"),
  $btnAbajo = document.querySelector("#btnAbajo"),
  $btnDerecha = document.querySelector("#btnDerecha"),
  $btnIzquierda = document.querySelector("#btnIzquierda");

/* 
        Generación de fondo dinámico
        */
let angulo_fondo = Math.random() * 360;
let tono_fondo = Math.random() * 360;

/* 
        Dificultad, hacer caer las piezas cada determinada cantidad de tiempo,
        simulando una especie de gravedad, esto se hace fácilmente con un setInterval
        */
setInterval(() => {
  if (millis() - regulador_de_caida < 300) {
    return;
  }
  regulador_de_caida = millis();
  tetrimino.moverAbajo();
}, 500);

/* 
        La función setup es nativa de p5.js
        y sirve para ajustar las propiedades iniciales de nuestros objetos 
        y variables
        */
function setup() {
  createCanvas(900, 600); //crea un canvas
  /* 
            VARIABLES GLOBALES
            es importante que no le pongan let, ni var, ni const a las siguientes 
            variables. Para que puedan ser identificadas como globales
            */
  tablero = new Tablero();
  crearMapeo();
  tetrimino = new Tetrimino();
  resizeCanvas(
    tablero.ancho + 2 * MARGEN_TABLERO,
    tablero.alto + 2 * MARGEN_TABLERO + 2 * tablero.lado_celda
  );
}

/* 
        La función draw es nativa de p5.js
        y sirve para dar instrucciones precisas de dibujo sobre el canvas
        */
function draw() {
  clear();
  iniciarJuego();
  dibujarPuntaje();
  tablero.dibujar();
  tetrimino.dibujar();
  keyEventsTetris();
  }

function dibujarPuntaje() {
  push();
  textSize(20);
  strokeWeight(2);
  stroke("black");
  fill("white");
  text(
    "Líneas: " + lineas_hechas,
    tablero.posicion.x,
    tablero.posicion.y - tablero.lado_celda / 2
  );
  pop();
}

const iniciarJuego = () => {
  pausado = false;
  puedeJugar = true;
  // idInterval = setInterval(loop, regulador_de_caida);
};

const pausar = () => {
  pausado = true;
  puedeJugar = false;
  // clearInterval(idInterval);
};

const pausarOReanudar = () => {
  if (pausado) {
    iniciarJuego();
    $btnIniciar.hidden = true;
    $btnPausar.hidden = false;
  } else {
    pausar();
    $btnIniciar.hidden = false;
    $btnPausar.hidden = true;
  }
};

//let idInterval;
const loop = () => {
  if (!puedeJugar) {
    return;
  }
};

document.addEventListener("keydown", (e) => {
  const { code } = e;
  if (!puedeJugar && code !== "KeyP") {
    return;
  }
  switch (code) {
    case "KeyP":
      pausarOReanudar();
      break;
  }
});

let limite_regulador_velocidad_teclas = 100;

function keyEventsTetris() {
  if (
    millis() - regulador_velocidad_teclas <
    limite_regulador_velocidad_teclas
  ) {
    return;
  }
  limite_regulador_velocidad_teclas = 100;
  regulador_velocidad_teclas = millis();

  if (keyIsDown(RIGHT_ARROW)) {
    tetrimino.moverDerecha();
    regulador_de_caida = millis();
  }
  if (keyIsDown(LEFT_ARROW)) {
    tetrimino.moverIzquierda();
    regulador_de_caida = millis();
  }
  if (keyIsDown(DOWN_ARROW)) {
    tetrimino.moverAbajo();
    regulador_de_caida = millis();
  }
  if (keyIsDown(UP_ARROW)) {
    limite_regulador_velocidad_teclas = 150;
    tetrimino.girar();
    regulador_de_caida = millis();
  }
  if (keyIsDown(32)) {
    limite_regulador_velocidad_teclas = 200;
    tetrimino.ponerEnElFondo();
    regulador_de_caida = millis();
  }
}

function buttonEvents (){
$btnAbajo.addEventListener("click", () => {
  tetrimino.moverAbajo();
});
this.$btnDerecha.addEventListener("click", () => {
  tetrimino.moverDerecha();

});
$btnIzquierda.addEventListener("click", () => {
  if (!puedeJugar) return;
  moverIzquierda();
});
$btnRotar.addEventListener("click", () => {
  if (!puedeJugar) return;
  girar();
});
[$btnPausar, $btnIniciar].forEach(($btn) =>
  $btn.addEventListener("click", pausarOReanudar)
);
}
