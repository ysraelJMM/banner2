function progreso(number, level) {
  let levels = document.getElementsByClassName('levelYJMM');
  let lights = document.getElementsByClassName('lightYJMM');
  let label = document.getElementById('labelYJMM');

  for (var i = 0; i < 3; i++) {
    if (i < level - 1 || (level == 3 && number == 100)) {
      levels[i].setAttribute('class', 'levelYJMM');
      lights[i].setAttribute('class', 'lightYJMM');
    } else {
      if (i == level - 1) {
        if (number < 100) {
          levels[i].setAttribute('class', 'levelYJMM add');
          lights[i].setAttribute('class', 'lightYJMM add');
        } else {
          levels[i].setAttribute('class', 'levelYJMM');
          lights[i].setAttribute('class', 'lightYJMM');
        }
      } else {
        levels[i].setAttribute('class', 'levelYJMM off');
        lights[i].setAttribute('class', 'lightYJMM off');
      }
    }
  }
  let porcentaje = document.getElementById('porcentaje');
  let progress = document.getElementById('progress');
  porcentaje.innerHTML = Math.trunc(number) + '%';
  porcentaje.setAttribute('fill', barYJMM.color2());
  label.setAttribute('fill', barYJMM.color2());
  porcentaje.setAttribute('stroke', barYJMM.color3());
  label.setAttribute('stroke', barYJMM.color3());
  let index = '';
  let clase = 'add';
  if (number < 25) {
    index = 'Lets go';
  } else if (number < 50) {
    index = 'Continue';
  } else if (number < 75) {
    index = 'Keep going';
  } else if (number < 100) {
    index = 'Almost';
  } else {
    index = 'Completed';
    clase = '';
  }
  progress.innerHTML = index;
  progress.setAttribute('class', clase);
}

const maxParticles = 60;
var canvasBar = document.getElementById("canvasBar");
var ctxBar = canvasBar.getContext("2d");
var counterBar = 0;
var particlesBar = [];
canvasBar.width = 220;
canvasBar.height = 20;

function resetBar() {
ctxBar.fillStyle = "#393947";
ctxBar.fillRect(0, 0, 220, 20);
}

function progressBar(hue, hueMax) {
  this.levels = [34, 77];
  this.progress = 0;
  this.widths = 0;
  this.hueMax = hueMax;
  this.hue = hue;
  this.ini = (hueMax - hue) / 100;
  this.color0 = function() { return 'hsla(' + (this.hue - 20) + ', 90%, 34%, 1)' };
  this.color1 = function() { return 'hsla(' + (this.hue - 10) + ', 100%, 50%, 1)' };
  this.color2 = function() { return 'hsla(' + (this.hue - 1) + ', 100%, 70%, 1)' };
  this.color3 = function() { return 'hsla(' + (this.hue - 1) + ', 90%, 25%, 1)' };
  this.draw = function() {
    ctxBar.lineWidth = 4;
    var gradient = ctxBar.createLinearGradient(0, 0, this.widths, 0);
    gradient.addColorStop("0", this.color0());
    gradient.addColorStop("0.45", this.color1());
    gradient.addColorStop("1", this.color2());
    ctxBar.strokeStyle = this.color3();
    ctxBar.fillStyle = gradient;
    var p = new Path2D('m10 20 a10 10 0 0 1 0 -20 h ' + this.widths + ' a10 10 0 0 1 0 20z');
    ctxBar.fill(p);
    ctxBar.stroke(p)
    var q = new Path2D('m ' + (this.widths + 10) + ',2.8125 a 7.5,7.5 0 0 0 -7.052735,4.978516 l -17.2539062,1.050781 -28.382812,1.470703 28.382812,1.470703 17.2519532,1.050781 a 7.5,7.5 0 0 0 7.054688,4.978516 7.5,7.5 0 0 0 7.5,-7.5 7.5,7.5 0 0 0 -7.5,-7.5 z');
    var grad2 = ctxBar.createLinearGradient(this.widths - 50, 0, this.widths + 10, 0);
    grad2.addColorStop(0, 'hsla(' + this.hue + ', 100%, 40%, 0.25)');
    grad2.addColorStop(1, 'hsla(100, 100%, 100%, 0.65)');
    ctxBar.fillStyle = grad2;
    ctxBar.fill(q);
  }
}

function particleBar() {
  barYJMM.level = 1;
  this.x = barYJMM.widths + 16;
  this.y = 12;
  this.vx = 0.8 + Math.random() * 1;
  this.v = Math.random() * 5;
  this.g = 6 + Math.random() * 5;
  this.down = false;
  this.draw = function() {
    ctxBar.fillStyle = "white";
    var size = Math.random() * 2;
    ctxBar.fillRect(this.x, this.y, size, size);
  }
}

const barYJMM = new progressBar(0,120);

function drawBar(t, porcent) {
  resetBar();
  counterBar++
  barYJMM.hue += barYJMM.ini;
  barYJMM.widths += 2;
  if (barYJMM.widths > barYJMM.progress * 2) {
    if (counterBar > porcent + 20 && t) {
      resetBar();
      barYJMM.hue = 0;
      barYJMM.widths = 0;
      counterBar = 0;
      particlesBar = [];
    } else {
      barYJMM.hue -= barYJMM.ini;
      barYJMM.widths = barYJMM.progress * 2;
      barYJMM.draw();
    }
  } else {
    barYJMM.draw();
    for (var i = 0; i < maxParticles; i += 10) {
      particlesBar.push(new particleBar());
    }
  }
  updateBar();
}

function updateBar() {
  for (var i = 0; i < particlesBar.length; i++) {
    var p = particlesBar[i];
    p.x -= p.vx;
    if (p.down == true) {
      p.y += p.g;
    } else {
      if (p.g < 0) {
        p.down = true;
        p.y += p.g;
      } else {
        p.y = p.g;
      }
    }
    p.draw();
  }
}

function playBar(porcent) {
  var label = document.getElementById('labelYJMM');
  var myVar = setInterval(myTimer, 50);
  var porI = barYJMM.progress;
  let time = porcent - barYJMM.progress;
  var increment = 0;
  barYJMM.progress = porcent;

  function myTimer() {
    let porA = porI + increment;
    if (porA < barYJMM.levels[0]) {
      barYJMM.level = 1
    } else if (porA < barYJMM.levels[1]) {
      barYJMM.level = 2;
    } else {
      barYJMM.level = 3;
    }
    if (increment <= time) {
      progreso(porA, barYJMM.level);
      drawBar(true);
    } else {
      drawBar(false);
    }
    if (increment < time + 20) {
      increment += 1;
    } else {
      clearInterval(myVar);
      increment = 0;
    }
  }
}

let root = document.documentElement;

var colors1 = [
  '#3c3c3c',
  '#82ff6f',
  '#108f00',
  '#0c4200',
  '#00ad00',
  '#00ff00',
  '#60ff3f',
  '#9fff88',
  '#bcea8e',
  '#71f03c',
  '#18df1b',
  '#77bdd5',
  '#3077ac'
];

var colors2 = [
  '#659df1',
  '#fed2ef',
  '#8f0071',
  '#ae15a3',
  '#ad00a9',
  '#f900ff',
  '#fe72da',
  '#ffb2e4',
  '#fc7dff',
  '#ec3cf0',
  '#673AB7',
  '#cecf67',
  '#ec5556'
];
var colors3 =[
  '#4ad143',
  '#d2e0fe',
  '#14008f',
  '#2415ae',
  '#4d41ec',
  '#5775e7',
  '#72bcfe',
  '#b2edff',
  '#7d98ff',
  '#6676f4',
  '#3a54b7',
  '#ff8278',
  '#fa0e5e'
];

function CSSbarYJMM(n) {
  let colores = [];
  if (n == 1) {
    colores = colors1;
  } else if (n == 2) {
    colores = colors2;
  } else if (n == 3){
    colores = colors3;
  }
  root.style.setProperty('--fondo', colores[0]);
  root.style.setProperty('--colorL', colores[1]);
  root.style.setProperty('--colorM', colores[2]);
  root.style.setProperty('--colorR', colores[3]);
  root.style.setProperty('--grad0', colores[4]);
  root.style.setProperty('--grad1', colores[5]);
  root.style.setProperty('--grad2', colores[6]);
  root.style.setProperty('--grad3', colores[7]);
  root.style.setProperty('--grad4', colores[8]);
  root.style.setProperty('--grad5', colores[9]);
  root.style.setProperty('--grad6', colores[10]);
  root.style.setProperty('--ter1', colores[11]);
  root.style.setProperty('--ter2', colores[12]);
}
