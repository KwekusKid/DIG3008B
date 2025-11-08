document.addEventListener("DOMContentLoaded", function (){

    // Build the site navigation dynamically so pages only need a <nav></nav> container.
    function buildNav() {
        console.log('[nav] buildNav start');
        const nav = document.querySelector('nav');
        if (!nav) return;

        // Clear existing content
        nav.innerHTML = '';

        const navBar = document.createElement('div');
        navBar.className = 'NavBar';

        // topNav
        const topNav = document.createElement('div');
        topNav.className = 'topNav';

        const homeLink = document.createElement('a');
        homeLink.href = 'index.html';
        const h2 = document.createElement('h2');
        h2.id = 'Home';
        h2.textContent = 'ROLE CALL';
    const logo = document.createElement('img');
    logo.className = 'logo';
    // Compute a small prefix so images resolve correctly from pages in subfolders
    const pathPrefix = (window.location.pathname.includes('/Articles/') || window.location.pathname.includes('/Portfolio/') ) ? '../' : '';
    logo.src = pathPrefix + 'Images/logo.png';
    logo.alt = 'logo for the website Role Call';
        h2.appendChild(logo);
        homeLink.appendChild(h2);

        // search container
        const searchContainer = document.createElement('div');
        searchContainer.className = 'searchContainer';

        const searchButton = document.createElement('button');
        searchButton.id = 'searchButton';
        const icon = document.createElement('i');
        icon.className = 'fa-solid fa-magnifying-glass';
        searchButton.appendChild(icon);

        const searchInput = document.createElement('input');
        searchInput.type = 'text';
        searchInput.className = 'search-input';
        searchInput.placeholder = 'Search...';
        searchInput.setAttribute('aria-label', 'Search');

        searchContainer.appendChild(searchButton);
        searchContainer.appendChild(searchInput);

        topNav.appendChild(homeLink);
        topNav.appendChild(searchContainer);

        // sticky nav (second half)
        const sticky = document.createElement('div');
        sticky.id = 'sticky';

        const ul = document.createElement('ul');
        const items = [
            { href: 'dataPage.html', label: 'Data and Stats' },
            { href: 'playerProfileHome.html', label: 'Player Profiles' },
            { href: 'latest.html', label: 'The Latest' },
            { href: 'about.html', label: 'About' }
        ];
        items.forEach(it => {
            const li = document.createElement('li');
            li.className = 'navOp';
            const a = document.createElement('a');
            a.href = it.href;
            const h = document.createElement('h2');
            h.textContent = it.label;
            a.appendChild(h);
            li.appendChild(a);
            ul.appendChild(li);
        });

        sticky.appendChild(ul);

        navBar.appendChild(topNav);
        navBar.appendChild(sticky);
    nav.appendChild(navBar);
    console.log('[nav] built navBar, sticky exists?', !!document.getElementById('sticky'));

        // Ensure page content doesn't sit underneath the fixed nav: set body padding-top
        // Use requestAnimationFrame so layout is measured after insertion
        requestAnimationFrame(() => {
            try {
                const navHeight = navBar.getBoundingClientRect().height || 140;
                document.body.style.paddingTop = navHeight + 'px';
                console.log('[nav] navHeight set to', navHeight);
            } catch (e) {
                // ignore
            }
        });

        // Add a small click handler for the search button to focus the input
        searchButton.addEventListener('click', () => searchInput.focus());

        // Friendly fallback for the search icon if Font Awesome isn't loaded on this page
        // (some pages include the kit; others may not). If no font icon appears, show a plain emoji.
        requestAnimationFrame(() => {
            const faCheck = document.querySelector('.fa-solid.fa-magnifying-glass');
            if (!faCheck) {
                // replace empty icon with emoji
                searchButton.textContent = '🔍';
            }
        });
    }

    // build nav first
    buildNav();

class NavigationManager {
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
        console.log('[nav] bottomNav element:', this.bottomNav);
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
}

    // instantiate GSAP-powered navigation manager so it actually runs
    try {
        new NavigationManager();
    } catch (err) {
        console.error('Failed to initialize GSAP NavigationManager:', err);
    }
});
    