// Page Loading Effect
document.body.classList.add('loading');
window.addEventListener('load', () => {
    setTimeout(() => {
        document.body.classList.remove('loading');
    }, 500);
});

// Scroll Progress Indicator
const scrollProgress = document.createElement('div');
scrollProgress.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    height: 4px;
    background: linear-gradient(90deg, #ff3366, #9933ff, #00d4ff);
    z-index: 9999;
    transform-origin: left;
    transition: width 0.1s ease;
    box-shadow: 0 0 20px rgba(255, 51, 102, 0.8);
`;
document.body.appendChild(scrollProgress);

window.addEventListener('scroll', () => {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    scrollProgress.style.width = scrolled + '%';
});

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Parallax Scrolling Effect
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        const parallaxSpeed = 0.5;
        hero.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
    }

    // Parallax for cards
    const cards = document.querySelectorAll('.content-card, .preview-card');
    cards.forEach((card, index) => {
        const cardTop = card.offsetTop;
        const cardHeight = card.offsetHeight;
        const windowHeight = window.innerHeight;
        const scrollPosition = window.pageYOffset;

        if (scrollPosition > cardTop - windowHeight && scrollPosition < cardTop + cardHeight) {
            const parallax = (scrollPosition - cardTop + windowHeight) * 0.1;
            card.style.transform = `translateY(-${parallax}px)`;
        }
    });
});

// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}

// Close mobile menu when clicking on a nav link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for navigation links (only for same-page anchors)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        // Only prevent default if it's a same-page anchor
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const offsetTop = target.offsetTop - 70; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// Highlight active navigation item based on current page
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
const navLinks = document.querySelectorAll('.nav-link');

navLinks.forEach(link => {
    const linkHref = link.getAttribute('href');
    // Handle index.html and empty path
    if (linkHref === currentPage || 
        (currentPage === '' && linkHref === 'index.html') ||
        (currentPage === 'index.html' && linkHref === 'index.html') ||
        (currentPage === '' && linkHref === 'index.html')) {
        link.classList.add('active');
    }
});

// Highlight active navigation item on scroll (only for single-page navigation)
const sections = document.querySelectorAll('.content-section, .hero');
if (sections.length > 0) {
    window.addEventListener('scroll', () => {
        let current = '';
        const scrollPosition = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href && href.startsWith('#')) {
                link.classList.remove('active');
                if (href === `#${current}`) {
                    link.classList.add('active');
                }
            }
        });
    });
}

// Add dramatic fade-in animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0) scale(1) rotateX(0deg)';
            entry.target.style.filter = 'blur(0px)';
        }
    });
}, observerOptions);

// Observe content cards with 3D entrance
document.querySelectorAll('.content-card, .feature-item, .preview-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(60px) scale(0.9) rotateX(10deg)';
    card.style.filter = 'blur(5px)';
    card.style.transition = `opacity 0.8s ease ${index * 0.1}s, transform 0.8s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s, filter 0.8s ease ${index * 0.1}s`;
    observer.observe(card);
});

// Mouse tracking glow effect
document.addEventListener('mousemove', (e) => {
    const cards = document.querySelectorAll('.preview-card, .content-card');
    cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        }
    });
});

// Scroll to Top Button
const scrollToTopBtn = document.createElement('button');
scrollToTopBtn.innerHTML = '↑';
scrollToTopBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 55px;
    height: 55px;
    background: linear-gradient(135deg, #ff3366, #9933ff);
    color: white;
    border: none;
    border-radius: 50%;
    font-size: 24px;
    font-weight: bold;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 1000;
    box-shadow: 0 8px 25px rgba(255, 51, 102, 0.6), 0 0 40px rgba(153, 51, 255, 0.4);
`;
document.body.appendChild(scrollToTopBtn);

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        scrollToTopBtn.style.opacity = '1';
        scrollToTopBtn.style.visibility = 'visible';
    } else {
        scrollToTopBtn.style.opacity = '0';
        scrollToTopBtn.style.visibility = 'hidden';
    }
});

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

scrollToTopBtn.addEventListener('mouseenter', () => {
    scrollToTopBtn.style.transform = 'scale(1.15) translateY(-5px)';
    scrollToTopBtn.style.boxShadow = '0 12px 35px rgba(255, 51, 102, 0.8), 0 0 60px rgba(153, 51, 255, 0.6)';
});

scrollToTopBtn.addEventListener('mouseleave', () => {
    scrollToTopBtn.style.transform = 'scale(1) translateY(0)';
    scrollToTopBtn.style.boxShadow = '0 8px 25px rgba(255, 51, 102, 0.6), 0 0 40px rgba(153, 51, 255, 0.4)';
});

// Card navigation function (global)
function navigateCards(gridId, direction) {
    const grid = document.getElementById(gridId);
    if (!grid) return;
    
    const cards = Array.from(grid.children);
    const activeIndex = cards.findIndex(card => card.classList.contains('active'));
    
    if (activeIndex === -1) {
        // No active card, activate first one
        cards[0].classList.add('active');
        updateNavButtons(gridId, 0, cards.length);
        return;
    }
    
    let newIndex = activeIndex + direction;
    
    if (newIndex < 0) newIndex = 0;
    if (newIndex >= cards.length) newIndex = cards.length - 1;
    
    // Remove active from all cards
    cards.forEach(card => card.classList.remove('active'));
    
    // Add active to new card
    cards[newIndex].classList.add('active');
    
    // Update navigation buttons
    updateNavButtons(gridId, newIndex, cards.length);
}

function updateNavButtons(gridId, currentIndex, totalCards) {
    let prevButton, nextButton;
    
    // Map grid IDs to button IDs
    const buttonMap = {
        'preview-grid': { prev: 'prevPreviewBtn', next: 'nextPreviewBtn' },
        'features-grid': { prev: 'prevFeaturesBtn', next: 'nextFeaturesBtn' },
        'food-grid': { prev: 'prevFoodBtn', next: 'nextFoodBtn' },
        'training-plan': { prev: 'prevTrainingBtn', next: 'nextTrainingBtn' }
    };
    
    const buttons = buttonMap[gridId];
    if (!buttons) return;
    
    prevButton = document.getElementById(buttons.prev);
    nextButton = document.getElementById(buttons.next);
    
    if (prevButton) {
        if (currentIndex === 0) {
            prevButton.classList.add('hidden');
        } else {
            prevButton.classList.remove('hidden');
        }
    }
    
    if (nextButton) {
        if (currentIndex === totalCards - 1) {
            nextButton.classList.add('hidden');
        } else {
            nextButton.classList.remove('hidden');
        }
    }
}

// Cards are now visible by default with grid layout - no initialization needed

// Training Modal Functions
function openTrainingModal() {
    const modal = document.getElementById('trainingModal');
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }
}

function closeTrainingModal() {
    const modal = document.getElementById('trainingModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = ''; // Restore scrolling
    }
}

// Close modal when clicking outside of it
window.addEventListener('click', function(event) {
    const modal = document.getElementById('trainingModal');
    if (modal && event.target === modal) {
        closeTrainingModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeTrainingModal();
    }
});

