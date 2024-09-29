document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('registrationForm');
    const firstname = document.getElementById('firstname');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const passwordConfirmation = document.getElementById('password_confirmation');

    form.addEventListener('submit', function(event) {
        if (!validateForm()) {
            event.preventDefault();
        }
    });

    function validateForm() {
        let isValid = true;
        clearErrors();

        if (firstname.value.trim() === '') {
            displayError(firstname, 'Vorname ist erforderlich');
            isValid = false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.value)) {
            displayError(email, 'Bitte geben Sie eine gültige E-Mail-Adresse ein');
            isValid = false;
        }

        if (password.value.length < 8) {
            displayError(password, 'Das Passwort muss mindestens 8 Zeichen lang sein');
            isValid = false;
        }

        if (password.value !== passwordConfirmation.value) {
            displayError(passwordConfirmation, 'Die Passwörter stimmen nicht überein');
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