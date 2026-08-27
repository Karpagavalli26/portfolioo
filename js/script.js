document.addEventListener('DOMContentLoaded', () => {
    // 1. Theme Management (Light / Dark Mode)
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIcon = themeToggleBtn ? themeToggleBtn.querySelector('i') : null;
    
    // Check local storage or prefers-color-scheme
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Default is dark mode, so we check if saved theme is 'light',
    // or if no preference is saved and system prefers-color-scheme is light
    if (savedTheme === 'light' || (!savedTheme && !prefersDark)) {
        document.body.classList.add('light-mode');
        if (themeIcon) {
            themeIcon.className = 'fa-solid fa-moon'; // Show moon icon in light mode to toggle to dark
        }
    } else {
        document.body.classList.remove('light-mode');
        if (themeIcon) {
            themeIcon.className = 'fa-solid fa-sun'; // Show sun icon in dark mode to toggle to light
        }
    }
    
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            // Add temporary transitioning class to smooth toggle
            document.body.classList.add('theme-transitioning');
            
            const isLight = document.body.classList.toggle('light-mode');
            localStorage.setItem('theme', isLight ? 'light' : 'dark');
            
            if (themeIcon) {
                themeIcon.className = isLight ? 'fa-solid fa-moon' : 'fa-solid fa-sun';
            }
            
            setTimeout(() => {
                document.body.classList.remove('theme-transitioning');
            }, 300);
        });
    }

    // 2. Responsive Mobile Menu
    const hamburger = document.getElementById('hamburger-menu');
    const navMenu = document.getElementById('nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('open');
        });
        
        // Close menu when clicking outside of it
        document.addEventListener('click', (e) => {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('open');
            }
        });
    }

    // 3. Active Nav Link Highlighting
    const navLinks = document.querySelectorAll('.nav-link');
    const currentPath = window.location.pathname;
    const currentFile = currentPath.split('/').pop() || 'index.html';
    
    navLinks.forEach(link => {
        const linkFile = link.getAttribute('href');
        if (linkFile === currentFile || (currentFile === '' && linkFile === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // 4. Contact Form Submission Simulation
    const contactForm = document.getElementById('contact-form');
    const successModal = document.getElementById('success-modal');
    const closeModalBtn = document.getElementById('close-modal');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Basic validation check
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();
            
            if (name && email && subject && message) {
                // Show mock success modal
                if (successModal) {
                    successModal.style.display = 'flex';
                }
                
                // Reset form
                contactForm.reset();
            }
        });
    }
    
    if (closeModalBtn && successModal) {
        closeModalBtn.addEventListener('click', () => {
            successModal.style.display = 'none';
        });
        
        // Close modal when clicking on the overlay background
        successModal.addEventListener('click', (e) => {
            if (e.target === successModal) {
                successModal.style.display = 'none';
            }
        });
    }
});
