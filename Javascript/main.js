document.addEventListener("DOMContentLoaded", function (){class NavigationManager {
    constructor() {
        this.bottomNav = document.getElementById('sticky');
        this.lastScrollY = window.scrollY;
        this.isHidden = false;
        this.scrollTimeout = null;
        this.isAnimating = false;
        
        this.init();
    }
    
    init() {
        // Check if GSAP is loaded
        if (typeof gsap === 'undefined') {
            console.error('GSAP is not loaded. Please include GSAP in your HTML.');
            return;
        }
        
        // Set initial state
        gsap.set(this.bottomNav, { 
            y: 0, 
            opacity: 1 
        });
        
        // Add scroll event listener
        window.addEventListener('scroll', this.handleScroll.bind(this));
        
        console.log('Navigation Manager initialized with GSAP');
    }
    
    handleScroll() {
        const currentScrollY = window.scrollY;
        const scrollDirection = currentScrollY > this.lastScrollY ? 'down' : 'up';
        
        // Throttle scroll events
        if (this.scrollTimeout) {
            clearTimeout(this.scrollTimeout);
        }
        
        this.scrollTimeout = setTimeout(() => {
            this.processScroll(scrollDirection, currentScrollY);
        }, 50);
        
        this.lastScrollY = currentScrollY;
    }
    
    processScroll(direction, scrollPosition) {
        // Don't process if already animating
        if (this.isAnimating) return;
        
        if (direction === 'up' && scrollPosition > 100 && this.isHidden) {
            this.showBottomNav();
        } else if (direction === 'down' && scrollPosition > 100 && !this.isHidden) {
            this.hideBottomNav();
        }
    }
    
    showBottomNav() {
        this.isAnimating = true;
        
        const tl = gsap.timeline({
            onComplete: () => {
                this.isAnimating = false;
                this.isHidden = false;
                this.bottomNav.classList.remove('hidden');
            }
        });
        
        tl.to(this.bottomNav, {
            y: 0,
            opacity: 1,
            duration: 0.4,
            ease: "power2.out"
        });
        
        console.log('Showing bottom navigation');
    }
    
    hideBottomNav() {
        this.isAnimating = true;
        
        const tl = gsap.timeline({
            onComplete: () => {
                this.isAnimating = false;
                this.isHidden = true;
                this.bottomNav.classList.add('hidden');
            }
        });
        
        tl.to(this.bottomNav, {
            y: -100,
            opacity: 0,
            duration: 0.3,
            ease: "power2.in"
        });
        
        console.log('Hiding bottom navigation');
    }
    
    // Public method to manually show/hide nav
    toggleNavigation(show) {
        if (show) {
            this.showBottomNav();
        } else {
            this.hideBottomNav();
        }
    }
    
    // Clean up method
    destroy() {
        window.removeEventListener('scroll', this.handleScroll);
        if (this.scrollTimeout) {
            clearTimeout(this.scrollTimeout);
        }
    }
}});
    