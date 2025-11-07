class NavigationManager {
    constructor() {
        this.body = document.body;
        this.stickyNav = document.getElementById('sticky');
        this.lastScrollY = window.scrollY;
        this.scrollTimeout = null;
        this.isCombined = false;
        
        this.init();
    }
    
    init() {
        window.addEventListener('scroll', this.handleScroll.bind(this));
    }
    
    handleScroll() {
        const currentScrollY = window.scrollY;
        const scrollDirection = currentScrollY > this.lastScrollY ? 'down' : 'up';
        
        // Clear existing timeout
        if (this.scrollTimeout) {
            clearTimeout(this.scrollTimeout);
        }
        
        if (scrollDirection === 'down' && currentScrollY > 100) {
            // Scrolling down - hide bottom nav after 1 second
            this.scrollTimeout = setTimeout(() => {
                this.combineNavigation();
            }, 1000);
        } else {
            // Scrolling up - show bottom nav immediately
            this.expandNavigation();
        }
        
        this.lastScrollY = currentScrollY;
    }
    
    combineNavigation() {
        if (!this.isCombined) {
            this.body.classList.add('nav-combined');
            this.isCombined = true;
        }
    }
    
    expandNavigation() {
        if (this.isCombined) {
            this.body.classList.remove('nav-combined');
            this.isCombined = false;
        }
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    new NavigationManager();
    
    // Your existing article carousel code
    const articleContainer = document.querySelector('.articleContainer');
    const navDots = document.querySelectorAll('.navDot');
    const articleCards = document.querySelectorAll('.articleCard');
    
    if (articleContainer && navDots.length > 0) {
        articleContainer.addEventListener('scroll', function() {
            const scrollLeft = articleContainer.scrollLeft;
            const containerWidth = articleContainer.offsetWidth;
            const cardWidth = articleCards[0].offsetWidth + 32;
            
            const activeIndex = Math.round(scrollLeft / cardWidth);
            
            navDots.forEach((dot, index) => {
                dot.classList.toggle('active', index === activeIndex);
            });
        });
        
        navDots.forEach((dot, index) => {
            dot.addEventListener('click', function() {
                const cardWidth = articleCards[0].offsetWidth + 32;
                articleContainer.scrollTo({
                    left: index * cardWidth,
                    behavior: 'smooth'
                });
            });
        });
    }
});