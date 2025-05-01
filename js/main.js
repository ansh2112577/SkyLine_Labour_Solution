// Loading Animation
document.addEventListener('DOMContentLoaded', () => {
    const loader = document.querySelector('.loader-wrapper');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }
});

// Scroll Progress Bar
const scrollProgress = document.querySelector('.scroll-progress');
window.addEventListener('scroll', () => {
    const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    scrollProgress.style.transform = `scaleX(${scrolled / 100})`;
});

// Back to Top Button
const backToTop = document.querySelector('.back-to-top');
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
});

backToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenu = document.querySelector('.mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    const authButtons = document.querySelector('.auth-buttons');
    const body = document.body;

    mobileMenu.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        authButtons.classList.toggle('active');
        body.classList.toggle('menu-open');
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navLinks.contains(e.target) && !mobileMenu.contains(e.target)) {
            navLinks.classList.remove('active');
            authButtons.classList.remove('active');
            body.classList.remove('menu-open');
        }
    });

    // Close menu when clicking a link
    const links = document.querySelectorAll('.nav-links a');
    links.forEach(link => {
        link.addEventListener('click', function() {
            navLinks.classList.remove('active');
            authButtons.classList.remove('active');
            body.classList.remove('menu-open');
        });
    });
});

// Smooth Scrolling with Offset
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });

            // Close mobile menu if open
            if (window.innerWidth <= 768) {
                navLinks.classList.remove('active');
                body.classList.remove('menu-open');
            }
        }
    });
});

// Enhanced Navbar Scroll Effect
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll <= 0) {
        navbar.classList.remove('scroll-up');
        return;
    }

    if (currentScroll > lastScroll && !navbar.classList.contains('scroll-down')) {
        // Scroll Down
        navbar.classList.remove('scroll-up');
        navbar.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && navbar.classList.contains('scroll-down')) {
        // Scroll Up
        navbar.classList.remove('scroll-down');
        navbar.classList.add('scroll-up');
    }
    lastScroll = currentScroll;
});

// Enhanced Form Validation and Submission
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Basic form validation
        const inputs = contactForm.querySelectorAll('input, textarea');
        let isValid = true;

        inputs.forEach(input => {
            if (input.required && !input.value.trim()) {
                isValid = false;
                input.classList.add('error');
            } else {
                input.classList.remove('error');
            }
        });

        if (!isValid) {
            showNotification('Please fill in all required fields', 'error');
            return;
        }

        // Email validation
        const emailInput = contactForm.querySelector('input[type="email"]');
        if (emailInput && !isValidEmail(emailInput.value)) {
            emailInput.classList.add('error');
            showNotification('Please enter a valid email address', 'error');
            return;
        }

        // Show loading state
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;

        try {
            // Simulate form submission (replace with actual API call)
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            showNotification('Thank you for your message! We will get back to you soon.', 'success');
            contactForm.reset();
        } catch (error) {
            showNotification('Something went wrong. Please try again later.', 'error');
        } finally {
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }
    });
}

// Notification System
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;

    document.body.appendChild(notification);

    // Trigger animation
    setTimeout(() => notification.classList.add('show'), 100);

    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Email validation helper
function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Enhanced Scroll Animations
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.feature-card, .service-card, .solution-content, .stat-card, .testimonial-card, .security-card, .security-feature');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        const triggerBottom = window.innerHeight * 0.8;
        
        if (elementTop < triggerBottom && elementBottom > 0) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
};

// Initial animation setup with staggered delay
document.querySelectorAll('.feature-card, .service-card, .solution-content, .stat-card, .testimonial-card, .security-card, .security-feature').forEach((element, index) => {
    element.style.opacity = '1';
    element.style.transform = 'none';
    element.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;
});

// Add scroll event listener with debounce
let scrollTimeout;
window.addEventListener('scroll', () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(animateOnScroll, 50);
});

// Trigger initial animation check
animateOnScroll();

// Enhanced Counter Animation
const animateCounter = (element) => {
    const target = parseInt(element.textContent);
    let current = 0;
    const increment = target / 50;
    const duration = 2000;
    const stepTime = duration / 50;

    const updateCounter = () => {
        current += increment;
        if (current < target) {
            element.textContent = Math.round(current) + (element.textContent.includes('+') ? '+' : '');
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target + (element.textContent.includes('+') ? '+' : '');
        }
    };

    requestAnimationFrame(updateCounter);
};

// Start counter animation when stats section is in view
const statsSection = document.querySelector('.stats');
if (statsSection) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                document.querySelectorAll('.stat-card h3').forEach(animateCounter);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    observer.observe(statsSection);
}

// Labour Page Functionality
if (document.querySelector('.labour-grid')) {
    const searchBar = document.querySelector('.search-bar');
    const skillFilter = document.getElementById('skill-filter');
    const locationFilter = document.getElementById('location-filter');
    const availabilityFilter = document.getElementById('availability-filter');
    const experienceFilter = document.getElementById('experience-filter');
    const labourCards = document.querySelectorAll('.labour-card');

    function filterWorkers() {
        const searchTerm = searchBar.value.toLowerCase();
        
        labourCards.forEach(card => {
            const name = card.querySelector('.labour-name').textContent.toLowerCase();
            const title = card.querySelector('.labour-title').textContent.toLowerCase();
            const skills = Array.from(card.querySelectorAll('.skill-tag')).map(tag => tag.textContent.toLowerCase());
            const location = card.querySelector('.detail-item span').textContent.toLowerCase();
            const availability = card.querySelector('.availability').classList.contains('available');
            const experience = parseInt(card.querySelector('.detail-item:nth-child(2) span').textContent);

            const matchesSearch = name.includes(searchTerm) || 
                                title.includes(searchTerm) || 
                                skills.some(skill => skill.includes(searchTerm)) ||
                                location.includes(searchTerm);

            const matchesSkill = !skillFilter.value || 
                                (skillFilter.value === 'skilled' && title.includes('skilled')) ||
                                (skillFilter.value === 'semi-skilled' && title.includes('semi-skilled')) ||
                                (skillFilter.value === 'unskilled' && title.includes('unskilled'));

            const matchesLocation = !locationFilter.value || 
                                  location.includes(locationFilter.value.toLowerCase());

            const matchesAvailability = !availabilityFilter.value ||
                                      (availabilityFilter.value === 'available' && availability) ||
                                      (availabilityFilter.value === 'unavailable' && !availability);

            const matchesExperience = !experienceFilter.value ||
                                    (experienceFilter.value === '0-2' && experience <= 2) ||
                                    (experienceFilter.value === '3-5' && experience > 2 && experience <= 5) ||
                                    (experienceFilter.value === '5+' && experience > 5);

            if (matchesSearch && matchesSkill && matchesLocation && matchesAvailability && matchesExperience) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }

    // Add event listeners for filters
    searchBar.addEventListener('input', filterWorkers);
    skillFilter.addEventListener('change', filterWorkers);
    locationFilter.addEventListener('change', filterWorkers);
    availabilityFilter.addEventListener('change', filterWorkers);
    experienceFilter.addEventListener('change', filterWorkers);
}

// FAQ Toggle Functionality
document.addEventListener('DOMContentLoaded', () => {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Close all other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
        });
    });
});

// Check login status and update header buttons
function updateHeaderButtons() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const userEmail = localStorage.getItem('userEmail');
    const loginBtn = document.getElementById('loginBtn');
    const signupBtn = document.getElementById('signupBtn');
    const userDropdown = document.querySelector('.user-dropdown');
    const logoutBtn = document.querySelector('.logout-btn');

    if (isLoggedIn && userEmail) {
        // User is logged in
        loginBtn.innerHTML = `
            <i class="fas fa-user"></i>
            ${userEmail.split('@')[0]}
        `;
        loginBtn.href = '#';
        signupBtn.style.display = 'none';
        userDropdown.style.display = 'block';

        // Add logout event listener
        if (logoutBtn) {
            logoutBtn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                handleLogout();
            });
        }
    } else {
        // User is not logged in
        loginBtn.innerHTML = '<i class="fas fa-sign-in-alt"></i> Login';
        loginBtn.href = 'login.html';
        signupBtn.style.display = 'flex';
        userDropdown.style.display = 'none';
    }
}

// Handle logout
function handleLogout() {
    // Clear user data from localStorage
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');

    // Show success notification
    showNotification('Successfully logged out', 'success');

    // Redirect to home page after a short delay
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 1000);
}

// Update header buttons when page loads
document.addEventListener('DOMContentLoaded', updateHeaderButtons);

// Update header buttons when storage changes
window.addEventListener('storage', updateHeaderButtons); 