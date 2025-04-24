// Add this to your existing script.js file

document.addEventListener("DOMContentLoaded", () => {
  // --- Your existing typing effect code ---
  const typingElement = document.getElementById("typing-effect");
  const textToType = "Hello, I'm Eric.";
  let charIndex = 0;
  const typingSpeed = 120;

  if (typingElement) {
    // Check if the element exists
    typingElement.textContent = ""; // Clear it initially

    function type() {
      if (charIndex < textToType.length) {
        typingElement.textContent += textToType.charAt(charIndex);
        charIndex++;
        setTimeout(type, typingSpeed);
      } else {
        typingElement.classList.add("typing-done");
      }
    }
    setTimeout(type, 500); // Start typing
  } else {
    console.error("Element with ID 'typing-effect' not found.");
  }

  // --- Non-interactive particle background effect ---
  const canvas = document.createElement("canvas");
  canvas.id = "particle-canvas";
  const landing = document.getElementById("landing");
  landing.insertBefore(canvas, landing.firstChild);

  const ctx = canvas.getContext("2d");

  // Set canvas dimensions to match parent
  function resizeCanvas() {
    canvas.width = landing.offsetWidth;
    canvas.height = landing.offsetHeight;
  }

  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  // Particle properties
  const particleCount = 80;
  const particles = [];
  const connectionDistance = 150;

  // Particle class
  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 2 + 1;
      this.speedX = (Math.random() - 0.5) * 1;
      this.speedY = (Math.random() - 0.5) * 1;
      this.color = "#ffffff";
    }

    update() {
      // Move particle
      this.x += this.speedX;
      this.y += this.speedY;

      // Bounce off edges
      if (this.x > canvas.width || this.x < 0) {
        this.speedX = -this.speedX;
      }
      if (this.y > canvas.height || this.y < 0) {
        this.speedY = -this.speedY;
      }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.fill();
    }
  }

  // Create particles
  function init() {
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }
  }

  // Connect particles with lines
  function connect() {
    for (let a = 0; a < particles.length; a++) {
      for (let b = a; b < particles.length; b++) {
        const dx = particles[a].x - particles[b].x;
        const dy = particles[a].y - particles[b].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < connectionDistance) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(255, 255, 255, ${
            1 - distance / connectionDistance
          })`;
          ctx.lineWidth = 1;
          ctx.moveTo(particles[a].x, particles[a].y);
          ctx.lineTo(particles[b].x, particles[b].y);
          ctx.stroke();
        }
      }
    }
  }

  // Animation loop
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (const particle of particles) {
      particle.update();
      particle.draw();
    }

    connect();
    requestAnimationFrame(animate);
  }

  init();
  animate();
});
