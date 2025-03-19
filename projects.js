// Typing animation
document.addEventListener('DOMContentLoaded', function () {
    const texts = [
        "Showcasing my creative journey",
        "Exploring technology and innovation",
        "Building solutions that matter"
    ];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    const typingElement = document.querySelector('.typing-text');

    function type() {
        const currentText = texts[textIndex];

        if (isDeleting) {
            typingElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typingElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }

        if (!isDeleting && charIndex === currentText.length) {
            isDeleting = true;
            typingSpeed = 1500; // Pause at the end
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typingSpeed = 500; // Pause before typing next
        }

        setTimeout(type, typingSpeed);
    }

    // Start the typing animation
    setTimeout(type, 1000);
});

// Mobile menu toggle function
function toggleMenu() {
    const sidemenu = document.getElementById("sidemenu");
    sidemenu.classList.toggle("active");
}

// Close mobile navbar when clicking outside
document.addEventListener('DOMContentLoaded', function () {
    // Get the sidemenu element
    const sidemenu = document.getElementById('sidemenu');

    // Add click event listener to document
    document.addEventListener('click', function (event) {
        // Check if the menu is open (active class is present)
        if (sidemenu.classList.contains('active')) {
            // Check if click is outside the sidemenu and not on the menu icon
            const menuIcon = document.querySelector('.menu-icon');

            // If the click is not on the menu icon and not inside the sidemenu
            if (!menuIcon.contains(event.target) && !sidemenu.contains(event.target)) {
                sidemenu.classList.remove('active'); // Close the menu
            }
        }
    });

    // Prevent clicks on the menu from propagating to document
    sidemenu.addEventListener('click', function (event) {
        // If clicking a menu item (link), close the menu
        if (event.target.tagName === 'A') {
            sidemenu.classList.remove('active');
        }

        // Stop propagation to prevent document click handler from firing
        event.stopPropagation();
    });

    // Make sure menu icon click works properly
    const menuIcon = document.querySelector('.menu-icon');
    menuIcon.addEventListener('click', function (event) {
        event.stopPropagation(); // Prevent document click handler from firing
        // toggleMenu function should be called via onclick attribute
    });
});

// Enhanced interactive background with particles, waves, and interactive elements
document.addEventListener('DOMContentLoaded', function () {
    // Create canvas for the interactive background
    const backgroundCanvas = document.createElement('canvas');
    backgroundCanvas.id = 'background-canvas';
    backgroundCanvas.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: -2;
        background-color: #000;
    `;
    document.body.insertBefore(backgroundCanvas, document.body.firstChild);

    const canvas = document.getElementById('background-canvas');
    const ctx = canvas.getContext('2d');

    // Set canvas size
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Mouse position tracking
    let mouseX = 0;
    let mouseY = 0;
    let mouseRadius = 100;

    document.addEventListener('mousemove', function (e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    // Create particles
    const particles = [];
    const particleCount = 70;
    const colors = ['#FFFFFF', '#F0F0F0', '#E0E0E0', '#D8D8D8', '#CCCCCC'];

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 5 + 1;
            this.baseSize = this.size;
            this.color = colors[Math.floor(Math.random() * colors.length)];
            this.speedX = (Math.random() * 0.8 - 0.4) * 0.5;
            this.speedY = (Math.random() * 0.8 - 0.4) * 0.5;
            this.maxSpeed = 0.8;
            this.alpha = Math.random() * 0.6 + 0.2;
        }

        update() {
            // Calculate distance from mouse
            const dx = mouseX - this.x;
            const dy = mouseY - this.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            // Interactive behavior based on mouse position
            if (distance < mouseRadius) {
                const angle = Math.atan2(dy, dx);
                const force = (mouseRadius - distance) / mouseRadius;

                // Repel particles from mouse - gentler effect
                this.speedX -= Math.cos(angle) * force * 0.2;
                this.speedY -= Math.sin(angle) * force * 0.2;

                // Increase size when near mouse
                this.size = this.baseSize + (force * 5);
            } else {
                // Return to base size
                this.size = this.baseSize;
            }

            // Limit speed
            if (this.speedX > this.maxSpeed) this.speedX = this.maxSpeed;
            else if (this.speedX < -this.maxSpeed) this.speedX = -this.maxSpeed;

            if (this.speedY > this.maxSpeed) this.speedY = this.maxSpeed;
            else if (this.speedY < -this.maxSpeed) this.speedY = -this.maxSpeed;

            // Update position
            this.x += this.speedX;
            this.y += this.speedY;

            // Wrap around edges
            if (this.x < 0) this.x = canvas.width;
            else if (this.x > canvas.width) this.x = 0;

            if (this.y < 0) this.y = canvas.height;
            else if (this.y > canvas.height) this.y = 0;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.globalAlpha = this.alpha;
            ctx.fill();
            ctx.globalAlpha = 1;
        }
    }

    // Create wave effect
    class Wave {
        constructor(amplitude, period, color, width = 1) {
            this.amplitude = amplitude;
            this.period = period;
            this.color = color;
            this.width = width;
            this.offset = Math.random() * 100;
        }

        draw() {
            ctx.beginPath();
            ctx.lineWidth = this.width;
            ctx.strokeStyle = this.color;

            const frequency = 2 * Math.PI / this.period;

            // Start at the left edge
            ctx.moveTo(0, canvas.height / 2 + Math.sin(this.offset) * this.amplitude);

            // Draw the wave
            for (let x = 0; x < canvas.width; x++) {
                // Calculate wave y position
                // Add mouse influence to make waves react to mouse position
                const mouseInfluence = mouseX ? (1 - Math.min(1, Math.abs(x - mouseX) / 300)) * 30 : 0;
                const y = canvas.height / 2 +
                    Math.sin((x * frequency) + this.offset) * this.amplitude +
                    (mouseInfluence * Math.sin((x * frequency * 2) + this.offset));

                ctx.lineTo(x, y);
            }

            ctx.globalAlpha = 0.3;
            ctx.stroke();
            ctx.globalAlpha = 1;
        }

        update() {
            this.offset += 0.01;
        }
    }

    // Create grid effect
    class Grid {
        constructor() {
            this.spacing = 40;
            this.dotSize = 1;
            this.color = 'rgba(255, 255, 255, 0.1)';
        }

        draw() {
            ctx.fillStyle = this.color;

            // Calculate grid perspective based on mouse position
            const perspectiveX = (mouseX / canvas.width - 0.5) * 20;
            const perspectiveY = (mouseY / canvas.height - 0.5) * 20;

            for (let x = 0; x < canvas.width; x += this.spacing) {
                for (let y = 0; y < canvas.height; y += this.spacing) {
                    // Calculate distance from mouse
                    const dx = mouseX - x;
                    const dy = mouseY - y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    // Adjust dot size based on mouse proximity
                    let size = this.dotSize;
                    if (distance < 150) {
                        size = this.dotSize + ((150 - distance) / 150) * 3;
                    }

                    // Apply perspective distortion
                    const distortedX = x + (x - canvas.width / 2) * (perspectiveX / 1000);
                    const distortedY = y + (y - canvas.height / 2) * (perspectiveY / 1000);

                    ctx.beginPath();
                    ctx.arc(distortedX, distortedY, size, 0, Math.PI * 2);
                    ctx.fill();
                }
            }
        }
    }

    // Initialize objects
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }

    const waves = [
        new Wave(30, 200, 'rgba(255, 255, 255, 0.7)', 2),
        new Wave(20, 150, 'rgba(240, 240, 240, 0.6)', 1.5),
        new Wave(40, 300, 'rgba(220, 220, 220, 0.5)', 1)
    ];

    const grid = new Grid();

    // Animation loop
    function animate() {
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw grid
        grid.draw();

        // Draw and update waves
        waves.forEach(wave => {
            wave.draw();
            wave.update();
        });

        // Draw and update particles
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });

        // Connect nearby particles with lines
        connectParticles();

        requestAnimationFrame(animate);
    }

    // Connect particles that are close to each other
    function connectParticles() {
        const maxDistance = 150;
        ctx.lineWidth = 0.3;

        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < maxDistance) {
                    // Set opacity based on distance
                    const opacity = 1 - (distance / maxDistance);

                    // Create gradient line
                    const gradient = ctx.createLinearGradient(
                        particles[i].x, particles[i].y,
                        particles[j].x, particles[j].y
                    );
                    gradient.addColorStop(0, particles[i].color);
                    gradient.addColorStop(1, particles[j].color);

                    ctx.beginPath();
                    ctx.strokeStyle = gradient;
                    ctx.globalAlpha = opacity * 0.5;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                    ctx.globalAlpha = 1;
                }
            }
        }
    }

    // Add interactive events
    document.addEventListener('click', function (e) {
        // Create explosion effect on click
        for (let i = 0; i < 10; i++) {
            const particle = new Particle();
            particle.x = e.clientX;
            particle.y = e.clientY;
            particle.speedX = (Math.random() - 0.5) * 10;
            particle.speedY = (Math.random() - 0.5) * 10;
            particle.size = Math.random() * 8 + 2;
            particle.baseSize = particle.size;
            particles.push(particle);
        }

        // Remove older particles if there are too many
        if (particles.length > 200) {
            particles.splice(0, 10);
        }
    });

    // Start animation
    animate();

    // Remove old particles container if it exists
    const oldParticlesContainer = document.querySelector('.particles');
    if (oldParticlesContainer) {
        oldParticlesContainer.remove();
    }

    // Remove old grid if it exists
    const oldGrid = document.querySelector('.grid');
    if (oldGrid) {
        oldGrid.remove();
    }
});

// Project card hover effects
document.addEventListener('DOMContentLoaded', function () {
    const projectCards = document.querySelectorAll('.project-card');

    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function () {
            this.classList.add('active');
        });

        card.addEventListener('mouseleave', function () {
            this.classList.remove('active');
        });
    });
});

// Scroll reveal animation
document.addEventListener('DOMContentLoaded', function () {
    const projectCards = document.querySelectorAll('.project-card');

    function checkScroll() {
        projectCards.forEach(card => {
            const cardTop = card.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            if (cardTop < windowHeight * 0.9) {
                card.classList.add('reveal');
            }
        });
    }

    // Add initial class to all cards
    projectCards.forEach(card => {
        card.classList.add('hidden');
    });

    // Check on scroll
    window.addEventListener('scroll', checkScroll);

    // Check on load
    checkScroll();
});

// Add scroll reveal animation to CSS
const revealStyle = document.createElement('style');
revealStyle.textContent = `
    .project-card.hidden {
        opacity: 0;
        transform: translateY(50px);
        transition: opacity 0.8s ease, transform 0.8s ease;
    }
    
    .project-card.reveal {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(revealStyle);
