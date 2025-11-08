document.addEventListener('DOMContentLoaded', function() {
    const articleContainer = document.querySelector('.articleContainer');
    const navDots = document.querySelectorAll('.navDot');
    const articleCards = document.querySelectorAll('.articleCard');
    
    // Update dots based on scroll position
    articleContainer.addEventListener('scroll', function() {
        const scrollLeft = articleContainer.scrollLeft;
        const containerWidth = articleContainer.offsetWidth;
        const cardWidth = articleCards[0].offsetWidth + 32; // including gap
        
        const activeIndex = Math.round(scrollLeft / cardWidth);
        
        navDots.forEach((dot, index) => {
            dot.classList.toggle('active', index === activeIndex);
        });
    });
    
    // Click dots to scroll to specific card
    navDots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            const cardWidth = articleCards[0].offsetWidth + 32;
            articleContainer.scrollTo({
                left: index * cardWidth,
                behavior: 'smooth'
            });
        });
    });
});