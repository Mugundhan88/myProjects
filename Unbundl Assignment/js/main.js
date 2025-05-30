// Main JavaScript file for the landing page

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all interactive components
    initNavigation();
    initTestimonialSlider();
    initFormValidation();
    initScrollEffects();
});

// Navigation functionality
function initNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    // Toggle mobile menu
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.classList.toggle('no-scroll');
        });
    }
    
    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Close mobile menu if open
            if (navToggle && navToggle.classList.contains('active')) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.classList.remove('no-scroll');
            }
            
            // Smooth scroll to target section
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop;
                
                window.scrollTo({
                    top: offsetTop - 70, // Adjust for header height
                    behavior: 'smooth'
                });
                
                // Update active link
                navLinks.forEach(link => link.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });
    
    // Sticky header on scroll
    const header = document.querySelector('header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            header.classList.add('sticky');
            
            if (scrollTop > lastScrollTop) {
                // Scrolling down
                header.classList.add('hide');
            } else {
                // Scrolling up
                header.classList.remove('hide');
            }
        } else {
            header.classList.remove('sticky');
            header.classList.remove('hide');
        }
        
        lastScrollTop = scrollTop;
        
        // Update active navigation based on scroll position
        updateActiveNavOnScroll();
    });
}

// Update active navigation link based on scroll position
function updateActiveNavOnScroll() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= (sectionTop - 100)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// Testimonial slider functionality
function initTestimonialSlider() {
    const track = document.querySelector('.testimonial-track');
    const slides = document.querySelectorAll('.testimonial-card');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    if (!track || slides.length === 0) return;
    
    let currentIndex = 0;
    let slideWidth = slides[0].clientWidth;
    let autoplayInterval;
    
    // Set initial position
    updateSliderPosition();
    
    // Update slider position based on current index
    function updateSliderPosition() {
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
        
        // Update active dot
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }
    
    // Next slide function
    function nextSlide() {
        currentIndex = (currentIndex + 1) % slides.length;
        updateSliderPosition();
    }
    
    // Previous slide function
    function prevSlide() {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        updateSliderPosition();
    }
    
    // Event listeners for controls
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    
    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentIndex = index;
            updateSliderPosition();
            resetAutoplay();
        });
    });
    
    // Touch swipe support
    let touchStartX = 0;
    let touchEndX = 0;
    
    track.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
        pauseAutoplay();
    }, { passive: true });
    
    track.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
        resetAutoplay();
    }, { passive: true });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        if (touchStartX - touchEndX > swipeThreshold) {
            nextSlide(); // Swipe left
        } else if (touchEndX - touchStartX > swipeThreshold) {
            prevSlide(); // Swipe right
        }
    }
    
    // Autoplay functionality
    function startAutoplay() {
        autoplayInterval = setInterval(nextSlide, 5000);
    }
    
    function pauseAutoplay() {
        clearInterval(autoplayInterval);
    }
    
    function resetAutoplay() {
        pauseAutoplay();
        startAutoplay();
    }
    
    // Start autoplay
    startAutoplay();
    
    // Pause autoplay on hover
    track.addEventListener('mouseenter', pauseAutoplay);
    track.addEventListener('mouseleave', startAutoplay);
    
    // Update slide width on window resize
    window.addEventListener('resize', () => {
        slideWidth = slides[0].clientWidth;
        updateSliderPosition();
    });
}

// Form validation
function initFormValidation() {
    const contactForm = document.getElementById('contact-form');
    
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form fields
        const nameField = document.getElementById('name');
        const emailField = document.getElementById('email');
        const serviceField = document.getElementById('service');
        const messageField = document.getElementById('message');
        
        // Simple validation
        let isValid = true;
        
        if (!nameField.value.trim()) {
            showError(nameField, 'Please enter your name');
            isValid = false;
        } else {
            clearError(nameField);
        }
        
        if (!emailField.value.trim()) {
            showError(emailField, 'Please enter your email');
            isValid = false;
        } else if (!isValidEmail(emailField.value)) {
            showError(emailField, 'Please enter a valid email');
            isValid = false;
        } else {
            clearError(emailField);
        }
        
        if (serviceField.value === '') {
            showError(serviceField, 'Please select a service');
            isValid = false;
        } else {
            clearError(serviceField);
        }
        
        if (!messageField.value.trim()) {
            showError(messageField, 'Please enter your message');
            isValid = false;
        } else {
            clearError(messageField);
        }
        
        // If form is valid, show success message
        if (isValid) {
            // In a real application, you would send the form data to a server here
            showFormSuccess();
        }
    });
    
    // Helper functions for form validation
    function showError(field, message) {
        // Remove any existing error
        clearError(field);
        
        // Add error class to field
        field.classList.add('error');
        
        // Create error message element
        const errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.textContent = message;
        
        // Insert error message after the field
        field.parentNode.insertBefore(errorElement, field.nextSibling);
    }
    
    function clearError(field) {
        // Remove error class from field
        field.classList.remove('error');
        
        // Remove any existing error message
        const errorElement = field.parentNode.querySelector('.error-message');
        if (errorElement) {
            errorElement.remove();
        }
    }
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    function showFormSuccess() {
        // Hide the form
        contactForm.style.display = 'none';
        
        // Create success message
        const successMessage = document.createElement('div');
        successMessage.className = 'form-success';
        successMessage.innerHTML = `
            <div class="success-icon">
                <i class="fas fa-check-circle"></i>
            </div>
            <h3>Thank You!</h3>
            <p>Your message has been sent successfully. We'll get back to you soon.</p>
            <button class="btn btn-primary" id="reset-form">Send Another Message</button>
        `;
        
        // Insert success message
        contactForm.parentNode.insertBefore(successMessage, contactForm);
        
        // Add event listener to reset button
        document.getElementById('reset-form').addEventListener('click', function() {
            // Remove success message
            successMessage.remove();
            
            // Reset and show form
            contactForm.reset();
            contactForm.style.display = 'block';
        });
    }
}

// Scroll effects
function initScrollEffects() {
    // Reveal animations on scroll
    const revealElements = document.querySelectorAll('.reveal');
    
    function revealOnScroll() {
        const windowHeight = window.innerHeight;
        const revealPoint = 150;
        
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            
            if (elementTop < windowHeight - revealPoint) {
                element.classList.add('revealed');
            }
        });
    }
    
    // Initial check
    revealOnScroll();
    
    // Check on scroll
    window.addEventListener('scroll', revealOnScroll);
}

// Add reveal class to elements for scroll animations
function addRevealClasses() {
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        section.classList.add('reveal');
    });
    
    const cards = document.querySelectorAll('.service-card, .testimonial-card');
    
    cards.forEach((card, index) => {
        card.classList.add('reveal');
        card.style.transitionDelay = `${index * 0.1}s`;
    });
}

// Call this function after DOM is loaded
document.addEventListener('DOMContentLoaded', addRevealClasses);
