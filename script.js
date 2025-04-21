
// Education Tabs Functionality
document.addEventListener('DOMContentLoaded', function () {
    const tabs = document.querySelectorAll('.tab');
    const contents = document.querySelectorAll('.education-content');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const target = tab.getAttribute('data-edu');

            // Update active tab
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            // Show corresponding content
            contents.forEach(content => {
                content.classList.remove('active');
                if (content.id === `${target}-content`) {
                    content.classList.add('active');
                }
            });
        });
    });

    // Pagination functionality
    const pageIndicators = document.querySelectorAll('.page-indicator');

    pageIndicators.forEach(indicator => {
        indicator.addEventListener('click', () => {
            const targetSection = indicator.getAttribute('data-page');
            document.getElementById(targetSection).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});

// Mobile menu toggle function
function toggleMenu() {
    const sidemenu = document.getElementById("sidemenu");
    sidemenu.classList.toggle("active");
}

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
// This function should be placed in your existing JavaScript section
// It replaces your existing scroll event handler for the pagination
function setupPagination() {
    const pageIndicators = document.querySelectorAll('.page-indicator');
    const sections = [
        document.getElementById('hero'),
        document.getElementById('education'),
        document.getElementById('certifications'),
        document.getElementById('projects'),
        document.getElementById('hobbies'),
        document.getElementById('contact')
    ];

    // Click event for navigation
    pageIndicators.forEach(indicator => {
        indicator.addEventListener('click', () => {
            const targetPage = indicator.getAttribute('data-page');
            const targetElement = document.getElementById(targetPage);

            if (targetElement) {
                // Smooth scroll to target
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });

                // Update active state (optional - the scroll event will also handle this)
                pageIndicators.forEach(ind => ind.classList.remove('active'));
                indicator.classList.add('active');
            }
        });
    });

    // Scroll event to update active indicator
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        const windowHeight = window.innerHeight;
        let current = '';

        // Find which section is currently in view
        sections.forEach(section => {
            if (!section) return;

            const sectionId = section.getAttribute('id');
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;

            // Check if the section is in view (with offset to trigger earlier)
            if (scrollPosition >= sectionTop - windowHeight / 3 &&
                scrollPosition < sectionTop + sectionHeight - windowHeight / 3) {
                current = sectionId;
            }
        });

        // Update active indicator
        if (current) {
            pageIndicators.forEach(indicator => {
                indicator.classList.remove('active');
                if (indicator.getAttribute('data-page') === current) {
                    indicator.classList.add('active');
                }
            });
        }
    });

    // Run once on page load to set initial active state
    window.dispatchEvent(new Event('scroll'));
}

// Call this function when the DOM is loaded
document.addEventListener('DOMContentLoaded', setupPagination);

// Section reveal animations on scroll
document.addEventListener('DOMContentLoaded', function () {
    const allSections = document.querySelectorAll('.section-container');
    const eduCards = document.querySelectorAll('.tab');
    const certCards = document.querySelectorAll('.cert-card');
    const hobbyCards = document.querySelectorAll('.hobby-card');
    const projectCards = document.querySelectorAll('.project-card');

    // Add initial classes
    allSections.forEach(section => {
        if (section.id !== 'hero') { // Keep the first section visible
            section.classList.add('hidden-section');
        }
    });

    eduCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        card.style.transitionDelay = `${index * 0.1}s`;
    });

    certCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        card.style.transitionDelay = `${index * 0.1}s`;
    });

    projectCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        card.style.transitionDelay = `${index * 0.1}s`;
    });

    hobbyCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        card.style.transitionDelay = `${index * 0.1}s`;
    });

    // Reveal function
    function revealOnScroll() {
        const triggerBottom = window.innerHeight * 0.85;

        allSections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;

            if (sectionTop < triggerBottom) {
                section.classList.remove('hidden-section');
                section.classList.add('show-section');

                // Reveal cards within the visible section
                if (section.id === 'education') {
                    eduCards.forEach(card => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    });
                } else if (section.id === 'certifications') {
                    certCards.forEach(card => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    });
                } else if (section.id === 'projects') {
                    projectCards.forEach(card => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    });
                } else if (section.id === 'hobbies') {
                    hobbyCards.forEach(card => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    });
                }
            }
        });
    }

    // Contact form validation
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Basic validation
            let valid = true;
            const inputs = contactForm.querySelectorAll('input, textarea');

            inputs.forEach(input => {
                if (!input.value.trim()) {
                    valid = false;
                    input.style.borderColor = 'red';
                } else {
                    input.style.borderColor = '';
                }
            });

            if (valid) {
                // Submit form or show success message
                const submitBtn = contactForm.querySelector('.submit-btn');
                const originalText = submitBtn.innerHTML;

                submitBtn.innerHTML = '<span>Message Sent!</span> <i class="fas fa-check"></i>';
                submitBtn.style.background = 'linear-gradient(to right, #2ecc71, #27ae60)';

                // Reset form
                contactForm.reset();

                // Reset button after delay
                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.style.background = '';
                }, 3000);
            }
        });
    }

    // Close mobile navbar when clicking outside
    document.addEventListener('click', function (event) {
        // Check if the menu is open (active class is present)
        const sidemenu = document.getElementById('sidemenu');
        if (sidemenu && sidemenu.classList.contains('active')) {
            // Check if click is outside the sidemenu and not on the menu icon
            const menuIcon = document.querySelector('.menu-icon');

            // If the click is not on the menu icon and not inside the sidemenu
            if (menuIcon && !menuIcon.contains(event.target) && !sidemenu.contains(event.target)) {
                sidemenu.classList.remove('active'); // Close the menu
            }
        }
    });

    // Check on scroll
    window.addEventListener('scroll', revealOnScroll);

    // Check on load
    revealOnScroll();
});

// Background animation from your original code can be added here
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
                // background-color: #322d4a;
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

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }

    // Connect nearby particles with lines
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

                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.5})`;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
    }

    // Animation loop
    function animate() {
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw grid or other background elements if needed

        // Draw and update particles
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });

        // Connect particles
        connectParticles();

        requestAnimationFrame(animate);
    }

    // Start animation
    animate();
});
// Script to handle the checkered border visibility
document.addEventListener('DOMContentLoaded', function () {
    // Get reference to the body element
    const body = document.body;

    // Add a class to control the checkered border visibility
    body.classList.add('show-checkered-border');

    // Listen to scroll events
    window.addEventListener('scroll', function () {
        // If we've scrolled more than 70% of the viewport height
        if (window.scrollY > window.innerHeight * 0.7) {
            // Hide the checkered border
            body.classList.remove('show-checkered-border');
        } else {
            // Show the checkered border
            body.classList.add('show-checkered-border');
        }
    });
});

document.addEventListener('DOMContentLoaded', function () {
    // Check if we're on a touch device
    const isTouchDevice = 'ontouchstart' in window ||
        navigator.maxTouchPoints > 0 ||
        navigator.msMaxTouchPoints > 0;

    if (isTouchDevice) {
        // Add a class to the body for touch-specific CSS if needed
        document.body.classList.add('touch-device');

        // Make links and buttons more touch-friendly
        const touchTargets = document.querySelectorAll('a, button, .tab, .project-card, .cert-card, .hobby-card');

        touchTargets.forEach(target => {
            // Add touch feedback
            target.addEventListener('touchstart', function () {
                this.style.transform = 'scale(0.98)';
                this.style.transition = 'transform 0.2s';
            }, { passive: true });

            target.addEventListener('touchend', function () {
                this.style.transform = '';
                // Small delay to ensure the animation completes
                setTimeout(() => {
                    this.style.transition = '';
                }, 200);
            }, { passive: true });
        });
    }

    // Fix iOS 100vh issues (if needed)
    function fixIOSHeight() {
        if (/iPhone|iPad|iPod/.test(navigator.userAgent)) {
            const vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);

            // Update any 100vh elements to use the custom property
            const fullHeightElements = document.querySelectorAll('.hero-section');
            fullHeightElements.forEach(el => {
                el.style.height = 'calc(var(--vh, 1vh) * 100)';
            });
        }
    }

    // Run once on load
    fixIOSHeight();

    // Update on resize and orientation change
    window.addEventListener('resize', fixIOSHeight);
    window.addEventListener('orientationchange', fixIOSHeight);
});
