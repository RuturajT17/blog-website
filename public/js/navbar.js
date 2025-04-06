document.addEventListener('DOMContentLoaded', function() {
    // Navbar scroll behavior
    const navbar = document.getElementById('mainNavbar');
    let lastScroll = 0;

    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 100) {
            navbar.classList.remove('navbar-hidden');
            return;
        }
        
        if (currentScroll > lastScroll) {
            navbar.classList.add('navbar-hidden');
        } else {
            navbar.classList.remove('navbar-hidden');
        }
        lastScroll = currentScroll;
    });

    // Search functionality
    document.getElementById('searchInput')?.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            alert('Search functionality will be implemented later');
        }
    });

    // Navigation buttons
    document.getElementById('createBlogBtn')?.addEventListener('click', function() {
        alert('Create blog page will be implemented later');
    });

    document.getElementById('myBlogsBtn')?.addEventListener('click', function() {
        alert('My blogs page will be implemented later');
    });

    document.getElementById('likedBlogsBtn')?.addEventListener('click', function() {
        alert('Liked blogs page will be implemented later');
    });
});