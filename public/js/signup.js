document.addEventListener('DOMContentLoaded', function() {
    const signupForm = document.getElementById('signupForm');
    const passwordInput = document.getElementById('password');
    const passwordHelp = document.getElementById('passwordHelp');

    // Password strength indicator
    if (passwordInput && passwordHelp) {
        passwordInput.addEventListener('input', function() {
            const password = this.value;
            
            if (password.length > 0 && password.length < 8) {
                passwordHelp.textContent = 'Password too weak (minimum 8 characters)';
                passwordHelp.className = 'form-text password-weak';
            } else if (password.length >= 8) {
                passwordHelp.textContent = 'Good password';
                passwordHelp.className = 'form-text password-good';
            } else {
                passwordHelp.textContent = 'Minimum 8 characters';
                passwordHelp.className = 'form-text text-muted';
            }
        });
    }

    // Form submission handler
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic validation
            const username = document.getElementById('username').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
            if (!username || !email || !password) {
                alert('Please fill in all required fields');
                return;
            }
            
            if (password.length < 8) {
                alert('Password must be at least 8 characters long');
                return;
            }
            
            // Here you would typically send the data to your server
            console.log('Form submitted:', { username, email, password });
            alert('Account created successfully!');
            
            // Reset form
            signupForm.reset();
            passwordHelp.textContent = 'Minimum 8 characters';
            passwordHelp.className = 'form-text text-muted';
        });
    }
});