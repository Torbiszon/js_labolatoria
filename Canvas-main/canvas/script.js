const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
const balls = [];
const numBalls = 50; // You can adjust this number based on performance

// Parameters
const minDistance = 50;
const ballRadius = 10;
const maxSpeed = 3;

function start() {
  balls.length = 0; // Clear existing balls
  for (let i = 0; i < numBalls; i++) {
    balls.push({
      x: Math.random() * (canvas.width - 2 * ballRadius) + ballRadius,
      y: Math.random() * (canvas.height - 2 * ballRadius) + ballRadius,
      dx: (Math.random() - 0.5) * maxSpeed * 2,
      dy: (Math.random() - 0.5) * maxSpeed * 2,
    });
  }
  draw();
}

function reset() {
  balls.length = 0; // Clear existing balls
  draw();
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < balls.length; i++) {
    const ballA = balls[i];

    // Move the ball
    ballA.x += ballA.dx;
    ballA.y += ballA.dy;

    // Bounce off the edges
    if (ballA.x - ballRadius < 0 || ballA.x + ballRadius > canvas.width) {
      ballA.dx *= -1;
    }
    if (ballA.y - ballRadius < 0 || ballA.y + ballRadius > canvas.height) {
      ballA.dy *= -1;
    }

    // Draw the ball
    ctx.beginPath();
    ctx.arc(ballA.x, ballA.y, ballRadius, 0, Math.PI * 2);
    ctx.fill();

    // Check distance and draw lines
    for (let j = i + 1; j < balls.length; j++) {
      const ballB = balls[j];
      const distance = Math.sqrt((ballA.x - ballB.x)**2 + (ballA.y - ballB.y)**2);

      if (distance < minDistance) {
        ctx.beginPath();
        ctx.moveTo(ballA.x, ballA.y);
        ctx.lineTo(ballB.x, ballB.y);
        ctx.stroke();
      }
    }
  }

  requestAnimationFrame(draw);
}
