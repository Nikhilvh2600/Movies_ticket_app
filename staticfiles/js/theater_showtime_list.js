
    document.addEventListener('DOMContentLoaded', function() {
        // Detect when elements enter viewport for additional animations
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {threshold: 0.2});
        
        // Apply to all theater boxes
        document.querySelectorAll('.theater-box').forEach(box => {
            observer.observe(box);
        });
        
        // Add animation to show times
        const showTimes = document.querySelectorAll('.show-time');
        showTimes.forEach((time, index) => {
            time.style.animationDelay = `${0.1 + (index * 0.05)}s`;
        });
        
        // Smooth scroll behavior
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                if(this.getAttribute('href').startsWith('#')) {
                    e.preventDefault();
                    const target = document.querySelector(this.getAttribute('href'));
                    if(target) {
                        target.scrollIntoView({
                            behavior: 'smooth'
                        });
                    }
                }
            });
        });
        
        // Add parallax effect
        window.addEventListener('scroll', function() {
            const scrollY = window.scrollY;
            document.querySelectorAll('.theater-box').forEach((box, index) => {
                const speed = 0.05;
                const yPos = -(scrollY * speed * (index * 0.1 + 1));
                box.style.transform = `translateY(${yPos}px)`;
            });
        });
    });
