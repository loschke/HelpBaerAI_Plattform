document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('loginForm');
    const email = document.getElementById('email');
    const password = document.getElementById('password');

    form.addEventListener('submit', function(event) {
        if (!validateForm()) {
            event.preventDefault();
        }
    });

    function validateForm() {
        let isValid = true;
        clearErrors();

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.value)) {
            displayError(email, 'Bitte geben Sie eine gültige E-Mail-Adresse ein');
            isValid = false;
        }

        if (password.value.trim() === '') {
            displayError(password, 'Passwort ist erforderlich');
            isValid = false;
        }

        return isValid;
    }

    function displayError(input, message) {
        input.classList.add('border-error');
        const error = document.createElement('div');
        error.className = 'text-error text-sm mt-1';
        error.textContent = message;
        input.parentNode.insertBefore(error, input.nextSibling);
    }

    function clearErrors() {
        document.querySelectorAll('.text-error').forEach(el => el.remove());
        document.querySelectorAll('.border-error').forEach(el => el.classList.remove('border-error'));
    }
});