
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
        
        // Rating hover text
        const ratingLabels = {
            1: "Very Poor",
            2: "Poor",
            3: "Below Average",
            4: "Average",
            5: "Slightly Above Average",
            6: "Good",
            7: "Very Good",
            8: "Great",
            9: "Excellent",
            10: "Masterpiece"
        };
        
        const stars = document.querySelectorAll('.rating-group input');
        const ratingText = document.getElementById('rating-text');
        
        stars.forEach(star => {
            star.addEventListener('change', function() {
                if (this.checked) {
                    ratingText.textContent = ratingLabels[this.value];
                    ratingText.style.opacity = 1;
                }
            });
        });
        
        // Character counter
        const textarea = document.getElementById('review_text');
        const charCount = document.getElementById('char-count');
        
        textarea.addEventListener('input', function() {
            const count = this.value.length;
            charCount.textContent = count;
            
            if (count > 450) {
                charCount.style.color = '#ff9800';
            } else {
                charCount.style.color = 'rgba(255, 255, 255, 0.6)';
            }
        });
        
        // Form submission animation
        const form = document.querySelector('form');
        const submitButton = document.querySelector('.submit-button');
        
        form.addEventListener('submit', function(e) {
            if (form.checkValidity()) {
                submitButton.innerHTML = 'Submitting...';
                submitButton.style.pointerEvents = 'none';
                submitButton.style.opacity = 0.8;
            }
        });
    });