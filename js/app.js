document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Mobile Menu Toggle ---
    const hamburger = document.getElementById('mobile-menu-btn');
    const navMenu = document.getElementById('nav-menu');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Update ARIA for accessibility
        const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
        hamburger.setAttribute('aria-expanded', !isExpanded);
    });

    // Close menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
        });
    });

    // --- 2. Dark Mode Toggle & Persistence ---
    const themeToggleBtn = document.getElementById('theme-toggle');
    const body = document.body;
    
    // Check local storage for preference
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'dark') {
        body.classList.add('dark-mode');
        themeToggleBtn.textContent = 'Dark';
    }

    themeToggleBtn.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        let theme = 'light';
        
        if (body.classList.contains('dark-mode')) {
            theme = 'dark';
            themeToggleBtn.textContent = 'Dark';
        } else {
            themeToggleBtn.textContent = 'Light';
        }
        
        // Persist to local storage
        localStorage.setItem('theme', theme);
    });

    // --- 3. Form Validation ---
    const form = document.getElementById('contact-form');
    
    form.addEventListener('submit', (e) => {
        e.preventDefault(); // Prevent submission until validated
        
        let isValid = true;
        
        // Get field values
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();
        
        // Get error display elements
        const nameError = document.getElementById('name-error');
        const emailError = document.getElementById('email-error');
        const messageError = document.getElementById('message-error');
        const successMessage = document.getElementById('form-success');

        // Reset errors
        nameError.textContent = '';
        emailError.textContent = '';
        messageError.textContent = '';
        successMessage.classList.add('hidden');

        // Name Validation (Required)
        if (name === '') {
            nameError.textContent = 'Name is required.';
            isValid = false;
        }

        // Email Validation (Required + Regex Format)
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email === '') {
            emailError.textContent = 'Email is required.';
            isValid = false;
        } else if (!emailPattern.test(email)) {
            emailError.textContent = 'Please enter a valid email address.';
            isValid = false;
        }

        // Message Validation (Required)
        if (message === '') {
            messageError.textContent = 'Message is required.';
            isValid = false;
        }

        // Success State
        if (isValid) {
            successMessage.classList.remove('hidden');
            form.reset();
            // In a real scenario, you'd trigger a fetch/axios POST request here.
        }
    });
});