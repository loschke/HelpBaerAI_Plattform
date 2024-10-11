document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('newsletterForm');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const messageDiv = document.getElementById('newsletterMessage');

            fetch('/newsletter-signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(Object.fromEntries(formData))
            })
            .then(response => response.json())
            .then(data => {
                messageDiv.textContent = data.message;
                messageDiv.classList.remove('hidden', 'text-error');
                messageDiv.classList.add('text-success');
                this.reset(); // Reset form fields
            })
            .catch(error => {
                messageDiv.textContent = 'Es gab einen Fehler bei der Anmeldung. Bitte versuchen Sie es später erneut.';
                messageDiv.classList.remove('hidden', 'text-success');
                messageDiv.classList.add('text-error');
            });
        });
    }
});
