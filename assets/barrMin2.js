    var hue = 0;
    function progreso(number, level) {
      let levels = document.getElementsByClassName('levelYJMM');
      let lights = document.getElementsByClassName('lightYJMM');

      for (var i = 0; i < 5; i++) {
        if (i < level - 1 || (level == 5 && number == 100)) {
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
      let index = '';
      let clase = 'add';
      if (number < 25) {
        index = 'Lets go';
        hue += 1.2;
      } else if (number < 50) {
        index = 'Continue';
        hue += 1.2;
      } else if (number < 75) {
        index = 'Keep going';
        hue += 1.2;
      } else if (number < 100) {
        index = 'Almost';
        hue += 1.2;
      } else {
        index = 'Completed';
        clase = '';
        hue = 0;
      }
      progress.innerHTML = index;
      progress.setAttribute('class', clase);

    }
    //////////////////////////////////////////////////
    var myVar = setInterval(myTimer, 50);
    var increment = 0;
    var nivel = 1;


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

    function CSS(n) {
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
n_max = 60;
var canvas = document.getElementById("canvasBar");
var ctx = canvas.getContext("2d");
var counter = 0;
var particles = [];
var w = 220,
  h = 20;
canvas.width = w;
canvas.height = h;

function reset() {
  ctx.fillStyle = "#393947";
  ctx.fillRect(0, 0, w, h);
}

function progressbar() {
  this.widths = 0;
  this.hue = 0;
  this.draw = function() {
    ctx.lineWidth = 4;
    var gradient = ctx.createLinearGradient(0, 0, this.widths, 0);
    gradient.addColorStop("0", 'hsla(' + (this.hue - 20) + ', 90%, 34%, 1)');
    gradient.addColorStop("0.45", 'hsla(' + (this.hue - 10) + ', 100%, 50%, 1)');
    gradient.addColorStop("1", 'hsla(' + (this.hue - 1) + ', 100%, 60%, 1)');
    ctx.strokeStyle = 'hsla(' + (this.hue - 1) + ', 90%, 25%, 1)';
    ctx.fillStyle = gradient;
    console.log('hsla(' + this.hue + ', 100%, 40%, 1)');
    var p = new Path2D('m10 20 a10 10 0 0 1 0 -20 h ' + this.widths + ' a10 10 0 0 1 0 20z');
    ctx.fill(p);
    ctx.stroke(p)
    var q = new Path2D('m ' + (this.widths + 10) + ',2.8125 a 7.5,7.5 0 0 0 -7.052735,4.978516 l -17.2539062,1.050781 -28.382812,1.470703 28.382812,1.470703 17.2519532,1.050781 a 7.5,7.5 0 0 0 7.054688,4.978516 7.5,7.5 0 0 0 7.5,-7.5 7.5,7.5 0 0 0 -7.5,-7.5 z');
    var grad2 = ctx.createLinearGradient(this.widths - 50, 0, this.widths + 10, 0);
    grad2.addColorStop(0, 'hsla(' + this.hue + ', 100%, 40%, 0.25)');
    grad2.addColorStop(1, 'hsla(100, 100%, 100%, 0.65)');
    ctx.fillStyle = grad2;
    ctx.fill(q);
    ctx.fill(q);
  }
}

function particle() {
  this.x = bar.widths + 16;
  this.y = 12;
  this.vx = 0.8 + Math.random() * 1;
  this.v = Math.random() * 5;
  this.g = 6 + Math.random() * 5;
  this.down = false;

  this.draw = function() {
    ctx.fillStyle = "white";
    var size = Math.random() * 2;
    ctx.fillRect(this.x, this.y, size, size);
  }
}

bar = new progressbar();

function draw(t) {
  reset();
  counter++
  bar.hue += 1.2;
  bar.widths += 2;
  if (bar.widths > 200) {
    if (counter > 120 && t) {
      reset();
      bar.hue = 0;
      bar.widths = 0;
      counter = 0;
      particles = [];
    } else {
      bar.hue = 120;
      bar.widths = 200;
      bar.draw();
    }
  } else {
    bar.draw();
    for (var i = 0; i < n_max; i += 10) {
      particles.push(new particle());
    }
  }
  update();
}

function update() {
  for (var i = 0; i < particles.length; i++) {
    var p = particles[i];
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



    function myTimer() {
      if(increment <= 100){
        progreso(increment, nivel);
        draw(true);
      }else{
        draw(false);
      }

      if (increment < 120) {
        increment += 1;
      } else {
        if (nivel == 5) {
          clearInterval(myVar);
        }
        nivel += 1;
        increment = 0;
      }
    }
