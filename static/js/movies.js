
// Loading animation
window.addEventListener('load', () => {
    const loader = document.querySelector('.loader-container');
    setTimeout(() => {
        loader.classList.add('loader-hidden');
    }, 1000);
});

// Animate movie cards on scroll
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 100);
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all movie cards
document.addEventListener('DOMContentLoaded', () => {
    const movieCards = document.querySelectorAll('.movie-card');
    movieCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        observer.observe(card);
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Scroll to top button visibility
    const scrollBtn = document.querySelector('.scroll-top');
    if (window.scrollY > 300) {
        scrollBtn.classList.add('active');
    } else {
        scrollBtn.classList.remove('active');
    }
});

// Scroll to top functionality
document.querySelector('.scroll-top').addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Profile dropdown toggle
function toggleDropdown() {
    const menu = document.getElementById('dropdownMenu');
    menu.classList.toggle('show');
}

// Add click event to user profile to toggle dropdown
document.addEventListener('DOMContentLoaded', () => {
    const userProfile = document.querySelector('.user-profile');
    if (userProfile) {
        userProfile.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleDropdown();
        });
    }
});

document.addEventListener('click', function(e) {
    const profile = document.querySelector('.user-profile');
    const dropdown = document.getElementById('dropdownMenu');
    
    if (profile && !profile.contains(e.target) && dropdown) {
        dropdown.classList.remove('show');
    }
});

// Filter functionality
const filterTags = document.querySelectorAll('.filter-tag');
const movieCards = document.querySelectorAll('.movie-card');

filterTags.forEach(tag => {
    tag.addEventListener('click', () => {
        // Remove active class from all tags
        filterTags.forEach(t => t.classList.remove('active'));
        
        // Add active class to clicked tag
        tag.classList.add('active');
        
        const filter = tag.getAttribute('data-filter');
        
        // Apply filter to movie cards
        movieCards.forEach(card => {
            if (filter === 'all' || card.getAttribute('data-category') === filter) {
                card.closest('.movie-card-link').style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 100);
            } else {
                card.closest('.movie-card-link').style.display = 'none';
                card.style.opacity = '0';
                card.style.transform = 'translateY(30px)';
            }
        });
    });
});

// Hover effect enhancement
movieCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        const watchBtn = card.querySelector('.watch-btn');
        if (watchBtn) {
            watchBtn.style.transform = 'translate(-50%, -50%) scale(1)';
        }
    });
    
    card.addEventListener('mouseleave', () => {
        const watchBtn = card.querySelector('.watch-btn');
        if (watchBtn) {
            watchBtn.style.transform = 'translate(-50%, -50%) scale(0)';
        }
    });
});

// Add dynamic background particles
document.addEventListener('DOMContentLoaded', function() {
    const bodyElement = document.querySelector('body');
    
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random styling
        particle.style.position = 'fixed';
        particle.style.width = Math.random() * 3 + 1 + 'px';
        particle.style.height = particle.style.width;
        particle.style.background = 'rgba(0, 229, 255, ' + (Math.random() * 0.3 + 0.1) + ')';
        particle.style.borderRadius = '50%';
        particle.style.pointerEvents = 'none';
        
        // Random position
        particle.style.left = Math.random() * 100 + 'vw';
        particle.style.top = Math.random() * 100 + 'vh';
        
        // Animation
        particle.style.animation = 'floating ' + (Math.random() * 8 + 5) + 's ease-in-out infinite';
        particle.style.animationDelay = Math.random() * 5 + 's';
        particle.style.opacity = Math.random() * 0.5 + 0.1;
        
        bodyElement.appendChild(particle);
    }
});

// Movie hover rating animation
movieCards.forEach(card => {
    const rating = card.querySelector('.movie-rating');
    if (rating) {
        // Initial setup
        rating.style.transform = 'scale(0)';
        rating.style.opacity = '0';
        
        // Animate on hover
        card.addEventListener('mouseenter', () => {
            rating.style.transform = 'scale(1)';
            rating.style.opacity = '1';
        });
        
        card.addEventListener('mouseleave', () => {
            rating.style.transform = 'scale(0)';
            rating.style.opacity = '0';
        });
    }
});
        
// Dynamic styling for page title
const pageTitle = document.querySelector('.gallery-title');
if (pageTitle) {
    window.addEventListener('mousemove', (e) => {
        const x = e.clientX / window.innerWidth - 0.5;
        const y = e.clientY / window.innerHeight - 0.5;
        
        pageTitle.style.textShadow = 
            `${x * 10}px ${y * 10}px 15px rgba(0, 229, 255, 0.7)`;
    });
}

// Featured Slider Functionality
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.slide-dot');
const totalSlides = slides.length;

// Initialize slider
function showSlide(index) {
    // Hide all slides
    slides.forEach((slide) => {
        slide.classList.remove('active-slide');
    });
    
    // Remove active class from all dots
    dots.forEach((dot) => {
        dot.classList.remove('active');
    });
    
    // Show current slide and activate corresponding dot
    slides[index].classList.add('active-slide');
    dots[index].classList.add('active');
    
    // Update slide container position
    document.querySelector('.slides-container').style.transform = 
        `translateX(-${index * 100}%)`;
}

// Auto slide functionality
let slideInterval = setInterval(() => {
    nextSlide();
}, 5000);

function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    showSlide(currentSlide);
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    showSlide(currentSlide);
}

// Add event listeners to dots
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentSlide = index;
        showSlide(currentSlide);
        resetSlideInterval();
    });
});

// Add event listeners to arrows
document.querySelector('.next-slide').addEventListener('click', () => {
    nextSlide();
    resetSlideInterval();
});

document.querySelector('.prev-slide').addEventListener('click', () => {
    prevSlide();
    resetSlideInterval();
});

// Reset interval when manually changing slides
function resetSlideInterval() {
    clearInterval(slideInterval);
    slideInterval = setInterval(() => {
        nextSlide();
    }, 5000);
}

// Pause slider on hover
const slider = document.querySelector('.featured-slider');
slider.addEventListener('mouseenter', () => {
    clearInterval(slideInterval);
});

slider.addEventListener('mouseleave', () => {
    resetSlideInterval();
});

// Glow effect following cursor
const glow = document.querySelector('.glow');

document.addEventListener('mousemove', (e) => {
    const x = e.clientX;
    const y = e.clientY;
    
    glow.style.opacity = '1';
    glow.style.left = `${x}px`;
    glow.style.top = `${y}px`;
});

document.addEventListener('mouseout', () => {
    glow.style.opacity = '0';
});

// Add hover effects to trending cards
const trendingCards = document.querySelectorAll('.trending-card');

trendingCards.forEach((card, index) => {
    card.addEventListener('mouseenter', () => {
        // Add subtle rotation based on position
        const direction = index % 2 === 0 ? 1 : -1;
        card.style.transform = `translateY(-10px) rotate(${direction * 1}deg)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) rotate(0)';
    });
});

// Horizontal scroll for trending section with mouse wheel
const trendingContainer = document.querySelector('.trending-container');

trendingContainer.addEventListener('wheel', (e) => {
    if (e.deltaY !== 0) {
        e.preventDefault();
        trendingContainer.scrollLeft += e.deltaY;
    }
}, { passive: false });

// Add parallax effect to movie posters
const moviePosters = document.querySelectorAll('.movie-poster');

moviePosters.forEach((poster) => {
    poster.addEventListener('mousemove', (e) => {
        const img = poster.querySelector('img');
        const rect = poster.getBoundingClientRect();
        
        // Calculate mouse position relative to poster
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        // Calculate movement as percentage of poster dimensions
        const xPercent = (x / rect.width - 0.5) * 10;
        const yPercent = (y / rect.height - 0.5) * 10;
        
        // Apply slight movement to create parallax effect
        img.style.transform = `scale(1.1) translate(${xPercent}px, ${yPercent}px)`;
    });
    
    poster.addEventListener('mouseleave', () => {
        const img = poster.querySelector('img');
        img.style.transform = 'scale(1)';
    });
});

// Add entrance animations on page load
document.addEventListener('DOMContentLoaded', () => {
    const featuredSlider = document.querySelector('.featured-slider');
    const trendingSection = document.querySelector('.trending-section');
    
    setTimeout(() => {
        if (featuredSlider) featuredSlider.style.opacity = '1';
    }, 300);
    
    setTimeout(() => {
        if (trendingSection) trendingSection.style.opacity = '1';
    }, 600);
    
    // Initialize first slide
    showSlide(currentSlide);
    
    // Add animation to page elements
    const pageHeader = document.querySelector('.page-header');
    const filterContainer = document.querySelector('.filter-container');
    
    if (pageHeader) {
        setTimeout(() => {
            pageHeader.style.opacity = '1';
            pageHeader.style.transform = 'translateY(0)';
        }, 900);
    }
    
    if (filterContainer) {
        setTimeout(() => {
            filterContainer.style.opacity = '1';
            filterContainer.style.transform = 'translateY(0)';
        }, 1200);
    }
    
    // Make sure search bar is functional
    const searchForm = document.querySelector('.search-bar');
    if (searchForm) {
        searchForm.addEventListener('submit', (e) => {
            const searchInput = searchForm.querySelector('input[name="query"]');
            if (!searchInput.value.trim()) {
                e.preventDefault();
                // Add a subtle shake animation to indicate empty search
                searchInput.style.animation = 'shake 0.5s ease-in-out';
                setTimeout(() => {
                    searchInput.style.animation = '';
                }, 500);
            }
        });
    }
    
    // Add smooth transitions for filter tags
    const filterTags = document.querySelectorAll('.filter-tag');
    filterTags.forEach((tag, index) => {
        setTimeout(() => {
            tag.style.opacity = '1';
            tag.style.transform = 'translateY(0)';
        }, 1300 + (index * 100));
    });
});

// Add keydown event for arrow keys to navigate slider
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        prevSlide();
        resetSlideInterval();
    } else if (e.key === 'ArrowRight') {
        nextSlide();
        resetSlideInterval();
    }
});

// Add touch support for slider
let touchStartX = 0;
let touchEndX = 0;

slider.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
}, false);

slider.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
}, false);

function handleSwipe() {
    const swipeThreshold = 50;
    if (touchEndX < touchStartX - swipeThreshold) {
        // Swipe left, show next slide
        nextSlide();
        resetSlideInterval();
    } else if (touchEndX > touchStartX + swipeThreshold) {
        // Swipe right, show previous slide
        prevSlide();
        resetSlideInterval();
    }
}

// Add animation for the featured slider buttons
const sliderArrows = document.querySelectorAll('.slide-arrow');
sliderArrows.forEach(arrow => {
    arrow.addEventListener('mouseenter', () => {
        arrow.style.transform = 'scale(1.2)';
    });
    
    arrow.addEventListener('mouseleave', () => {
        arrow.style.transform = 'scale(1)';
    });
});

// Add CSS animation class for keyframe animations if not already in CSS
if (!document.querySelector('#movie-animations')) {
    const styleSheet = document.createElement('style');
    styleSheet.id = 'movie-animations';
    styleSheet.innerHTML = `
        @keyframes floating {
            0% { transform: translateY(0) translateX(0); }
            50% { transform: translateY(-20px) translateX(10px); }
            100% { transform: translateY(0) translateX(0); }
        }
        
        @keyframes shake {
            0% { transform: translateX(0); }
            25% { transform: translateX(-5px); }
            50% { transform: translateX(5px); }
            75% { transform: translateX(-5px); }
            100% { transform: translateX(0); }
        }
        
        .loader-hidden {
            animation: fadeOut 1s;
            animation-fill-mode: forwards;
        }
        
        @keyframes fadeOut {
            0% { opacity: 1; }
            100% { opacity: 0; visibility: hidden; }
        }
    `;
    document.head.appendChild(styleSheet);
}

// Implement lazy loading for images
document.addEventListener('DOMContentLoaded', () => {
    const lazyImages = document.querySelectorAll('img');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    const src = img.getAttribute('data-src');
                    
                    if (src) {
                        img.src = src;
                        img.removeAttribute('data-src');
                    }
                    
                    imageObserver.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => {
            const src = img.getAttribute('src');
            if (src && !src.includes('placeholder')) {
                img.setAttribute('data-src', src);
                img.setAttribute('src', 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 400"%3E%3C/svg%3E');
                imageObserver.observe(img);
            }
        });
    }
});

// Dynamically add smooth scrolling to all anchor links
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Enhance accessibility
document.addEventListener('DOMContentLoaded', () => {
    // Add proper role attributes
    const sliderArrows = document.querySelectorAll('.slide-arrow');
    sliderArrows.forEach(arrow => {
        arrow.setAttribute('role', 'button');
        arrow.setAttribute('tabindex', '0');
        arrow.setAttribute('aria-label', arrow.classList.contains('prev-slide') ? 'Previous slide' : 'Next slide');
        
        // Allow keyboard interaction
        arrow.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                arrow.click();
            }
        });
    });
    
    // Make filter tags keyboard accessible
    const filterTags = document.querySelectorAll('.filter-tag');
    filterTags.forEach(tag => {
        tag.setAttribute('role', 'button');
        tag.setAttribute('tabindex', '0');
        tag.setAttribute('aria-label', `Filter by ${tag.textContent}`);
        
        tag.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                tag.click();
            }
        });
    });
    
    // Add aria-labels to interactive elements
    document.querySelectorAll('.scroll-top').forEach(btn => {
        btn.setAttribute('aria-label', 'Scroll to top');
    });
});

// Finalize page setup
window.addEventListener('load', () => {
    console.log('MovieZone initialized successfully.');
});