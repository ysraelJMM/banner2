function progreso(porcent, esto, ult = 'YJMM') {
  let levels = document.getElementsByClassName('level' + ult);
  let lights = document.getElementsByClassName('light' + ult);
  let label = document.getElementById('label' + ult);

  for (var i = 0; i < 3; i++) {
    if (i < esto.level - 1 || (esto.level == 3 && porcent == 100)) {
      levels[i].setAttribute('class', 'level' + ult);
      lights[i].setAttribute('class', 'light' + ult);
    } else {
      if (i == esto.level - 1) {
        if (porcent < 100) {
          levels[i].setAttribute('class', 'level'  + ult + ' add');
          lights[i].setAttribute('class', 'light'  + ult + ' add');
        } else {
          levels[i].setAttribute('class', 'level' + ult);
          lights[i].setAttribute('class', 'light' + ult);
        }
      } else {
        levels[i].setAttribute('class', 'level'  + ult + ' off');
        lights[i].setAttribute('class', 'light'  + ult + ' off');
      }
    }
  }
  let porcentaje = document.getElementById('porcent' + ult);
  let progress = document.getElementById('progress' + ult);
  porcentaje.innerHTML = Math.trunc(porcent) + '%';
  porcentaje.setAttribute('fill', esto.color2());
  label.setAttribute('fill', esto.color2());
  porcentaje.setAttribute('stroke', esto.color3());
  label.setAttribute('stroke', esto.color3());
  let index = '';
  let clase = 'add';
  if (porcent < 25) {
    index = 'Lets go';
  } else if (porcent < 50) {
    index = 'Continue';
  } else if (porcent < 75) {
    index = 'Keep going';
  } else if (porcent < 100) {
    index = 'Almost';
  } else {
    index = 'Completed';
    clase = '';
  }
  progress.innerHTML = index;
  progress.setAttribute('class', clase);
}

const maxParticles = 60;


function progressBar(hue, hueMax, canvas = "canvasBar") {
  this.canvas =  document.getElementById(canvas);
  this.ctx = this.canvas.getContext("2d");
  this.counter = 0;
  this.canvas.width = 220;
  this.canvas.height = 20;
  this.particles = [];
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
  this.ctx.lineWidth = 4;
    var gradient = this.ctx.createLinearGradient(0, 0, this.widths, 0);
    gradient.addColorStop("0", this.color0());
    gradient.addColorStop("0.45", this.color1());
    gradient.addColorStop("1", this.color2());
    this.ctx.strokeStyle = this.color3();
    this.ctx.fillStyle = gradient;
    var p = new Path2D('m10 20 a10 10 0 0 1 0 -20 h ' + this.widths + ' a10 10 0 0 1 0 20z');
    this.ctx.fill(p);
    this.ctx.stroke(p)
    var q = new Path2D('m ' + (this.widths + 10) + ',2.8125 a 7.5,7.5 0 0 0 -7.052735,4.978516 l -17.2539062,1.050781 -28.382812,1.470703 28.382812,1.470703 17.2519532,1.050781 a 7.5,7.5 0 0 0 7.054688,4.978516 7.5,7.5 0 0 0 7.5,-7.5 7.5,7.5 0 0 0 -7.5,-7.5 z');
    var grad2 = this.ctx.createLinearGradient(this.widths - 50, 0, this.widths + 10, 0);
    grad2.addColorStop(0, 'hsla(' + this.hue + ', 100%, 40%, 0.25)');
    grad2.addColorStop(1, 'hsla(100, 100%, 100%, 0.65)');
    this.ctx.fillStyle = grad2;
    this.ctx.fill(q);
  };
  this.update = function() {
    for (var i = 0; i < this.particles.length; i++) {
      var p = this.particles[i];
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
};

  this.drawBar = function(t, porcent) {
    this.resetBar();
    this.counter++
    this.hue += this.ini;
    this.widths += 2;
    if (this.widths > this.progress * 2) {
      if (this.counter > porcent + 20 && t) {
        this.resetBar();
        this.hue = 0;
        this.widths = 0;
        this.counter = 0;
        this.particles = [];
      } else {
        this.hue -= this.ini;
        this.widths = this.progress * 2;
        this.draw();
      }
    } else {
      this.draw();
      for (var i = 0; i < maxParticles; i += 10) {
        this.particles.push(new particleBar(this));
      }
    }
    this.update();
  }
  this.resetBar = function() {
  this.ctx.fillStyle = "#393947";
  this.ctx.fillRect(0, 0, 220, 20);
  }

}

function particleBar(esto) {
  esto.level = 1;
  this.x = esto.widths + 16;
  this.y = 12;
  this.vx = 0.8 + Math.random() * 1;
  this.v = Math.random() * 5;
  this.g = 6 + Math.random() * 5;
  this.down = false;
  this.draw = function() {
    esto.ctx.fillStyle = "white";
    var size = Math.random() * 2;
    esto.ctx.fillRect(this.x, this.y, size, size);
  }
}

const barYJMM = new progressBar(0,120);



function playBar(porcent) {
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
      progreso(porA, barYJMM);
      barYJMM.drawBar(true);
    } else {
      barYJMM.drawBar(false);
    }
    if (increment < time + 20) {
      increment += 1;
    } else {
      clearInterval(myVar);
      increment = 0;
    }
  }
}
playBar(50);


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
