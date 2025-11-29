// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
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

// Add fade-in animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe content cards
document.querySelectorAll('.content-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
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

