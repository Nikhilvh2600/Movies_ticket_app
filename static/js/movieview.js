
    // Create floating particles
    document.addEventListener('DOMContentLoaded', function() {
        const particlesContainer = document.getElementById('particles');
        const particleCount = window.innerWidth < 768 ? 15 : 30;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            
            // Random size
            const size = Math.random() * 8 + 2;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            
            // Random position
            const posX = Math.random() * 100;
            const posY = Math.random() * 100;
            particle.style.left = `${posX}%`;
            particle.style.top = `${posY}%`;
            
            // Random animation duration and delay
            const duration = Math.random() * 20 + 10;
            const delay = Math.random() * 15;
            particle.style.animationDuration = `${duration}s`;
            particle.style.animationDelay = `${delay}s`;
            
            particlesContainer.appendChild(particle);
        }

        // Add hover effect to reviews
        const reviews = document.querySelectorAll('.review');
        reviews.forEach((review, index) => {
            review.style.animationDelay = `${0.8 + (index * 0.1)}s`;
        });
    });

    // Progressive loading of reviews
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    document.addEventListener('DOMContentLoaded', function() {
        const reviews = document.querySelectorAll('.review');
        reviews.forEach(review => {
            review.style.opacity = 0;
            review.style.transform = 'translateY(20px)';
            review.style.transition = 'all 0.5s ease';
            observer.observe(review);
        });
    });
