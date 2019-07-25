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
