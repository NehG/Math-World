$(".game_init").hide();
$(".gameboard").hide(200);
$(".game_init").fadeIn(1000);
$(".game_init_btn").click(function(){
  $(".game_init").slideUp(1000).hide(200);
  $(".gameboard").fadeIn(2000);
});

// Script Credit (line 9 - 79) : Ryan Cardwell (CodePen) - https://codepen.io/jryancard/pen/xYQNZG
// Setup canvas, drawing functions

   const colors = [ '#D8589F', '#EE4523', '#FBE75D', '#4FC5DF'];
   const bubbles = 80;

   const explode = (x, y) => {

       let particles = [];
       let ratio = window.devicePixelRatio;
       let c = document.createElement('canvas');
       let ctx = c.getContext('2d');

       c.style.position = 'absolute';
       c.style.left = (x - 100) + 'px';
       c.style.top = (y - 100) + 'px';
       c.style.pointerEvents = 'none';
       c.style.width = 500 + 'px';
       c.style.height = 500 + 'px';
       c.style.zIndex = 9999;
       c.width = 500 * ratio;
       c.height = 500 * ratio;
       document.body.appendChild(c);

       for(var i = 0; i < bubbles; i++) {
           particles.push({
               x: c.width / 2,
               y: c.height / r(2, 4),
               radius: r(3, 8),
               color: colors[Math.floor(Math.random() * colors.length)],
               rotation: r(230, 310, true),
               speed: r(3, 7),
               friction: .99,
               fade: .03,
               opacity: r(100, 100, true),
               yVel: 0,
               gravity: 0.04
           });
       }

       render(particles, ctx, c.width, c.height);
       setTimeout(() => document.body.removeChild(c), 5000);
   }

   const render = (particles, ctx, width, height) => {
       requestAnimationFrame(() => render(particles, ctx, width, height));
       ctx.clearRect(0, 0, width, height);

       particles.forEach((p, i) => {
           p.x += p.speed * Math.cos(p.rotation * Math.PI / 180);
           p.y += p.speed * Math.sin(p.rotation * Math.PI / 180);

           p.opacity -= 0.005;
           p.speed *= p.friction;
           p.radius -= p.fade;
           p.yVel += p.gravity;
           p.y += p.yVel;

           if(p.opacity < 0 || p.radius < 0) return;

           ctx.beginPath();
           ctx.globalAlpha = p.opacity;
           ctx.fillStyle = p.color;
           ctx.arc(p.x, p.y, p.radius, 0, 2 * Math.PI, false);
           ctx.fill();
       });

       return ctx;
   }

   const r = (a, b, c) => parseFloat((Math.random() * ((a ? a : 1) - (b ? b : 0)) + (b ? b : 0)).toFixed(c ? c : 0));
