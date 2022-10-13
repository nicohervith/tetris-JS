//Función nativa de p5 js
const MARGEN_TABLERO = 20;
let regulador_velocidad_teclas = 0;
function setup() {
  createCanvas(900, 600);
  tablero = new Tablero();
  crearMapeo();
  tetrimino = new Tetrimino();
  resizeCanvas(
    tablero.ancho + 2 * MARGEN_TABLERO,
    tablero.alto + 2 * MARGEN_TABLERO + tablero.lado_celda
  );
}

function keyEventsTetris() {
  if (millis() - regulador_velocidad_teclas < 150) {
    return;
  }
  regulador_velocidad_teclas = millis();
  if (keyIsDown(RIGHT_ARROW)) {
    tetrimino.moverDerecha();
  }
  if (keyIsDown(LEFT_ARROW)) {
    tetrimino.moverIzquierda();
  }
  if (keyIsDown(DOWN_ARROW)) {
    tetrimino.moverAbajo();
  }
  if (keyIsDown(UP_ARROW)) {
    tetrimino.moverArriba();
  }
}

function draw() {
  background("lightgray");
  tablero.dibujar();
  tetrimino.dibujar();
  keyEventsTetris();
}

function crearMapeo() {
  tetriminosBase = {
    Z: {
      color: "red",
      mapa: [
        createVector(),
        createVector(-1, -1),
        createVector(0, -1),
        createVector(1, 0),
      ],
    },
    S: {
      color: "lime",
      mapa: [
        createVector(),
        createVector(1, -1),
        createVector(0, -1),
        createVector(-1, 0),
      ],
    },
    J: {
      color: "orange",
      mapa: [
        createVector(),
        createVector(-1, 0),
        createVector(-1, -1),
        createVector(1, 0),
      ],
    },
    L: {
      color: "dodgerblue",
      mapa: [
        createVector(),
        createVector(-1, 0),
        createVector(1, -1),
        createVector(1, 0),
      ],
    },
    T: {
      color: "magenta",
      mapa: [
        createVector(),
        createVector(-1, 0),
        createVector(1, 0),
        createVector(0, -1),
      ],
    },
    O: {
      color: "yellow",
      mapa: [
        createVector(),
        createVector(0, -1),
        createVector(1, -1),
        createVector(1, 0),
      ],
    },
    I: {
      color: "cyan",
      mapa: [
        createVector(),
        createVector(-1, 0),
        createVector(1, 0),
        createVector(2, 0),
      ],
    },
  };
}
class Tetrimino {
  constructor(nombre = "Z") {
    this.nombre = nombre;
    let tetriminoBase = tetriminosBase[nombre];
    this.color = tetriminoBase.color;
    this.mapa = [];

    for (const pmino of tetriminoBase.mapa) {
      this.mapa.push(pmino.copy());
    }
    this.posicion = createVector(int(tablero.columna / 2), 0);
  }
  moverDerecha() {
    this.posicion.x++;
  }
  moverIzquierda() {
    this.posicion.x--;
  }
  moverArriba() {
    this.posicion.y--;
  }
  moverAbajo() {
    this.posicion.y++;
  }

  get mapaTablero() {
    let retorno = [];
    for (const pmino of this.mapa) {
      let copy = pmino.copy().add(this.posicion);
      retorno.push(tablero.coordenada(copy.x, copy.y));
    }
    return retorno;
  }

  dibujar() {
    push();
    fill(this.color);
    for (const pmino of this.mapaTablero) {
      rect(pmino.x, pmino.y, tablero.lado_celda);
      push();
      noStroke();
      fill(255, 255, 255, 80);
      beginShape();
      vertex(pmino.x, pmino.y);
      vertex(pmino.x, pmino.y + this.lado_celda);
      vertex(pmino.x + this.lado_celda, pmino.y);
      endShape(CLOSE);
      pop();
    }
    pop();
  }
}
