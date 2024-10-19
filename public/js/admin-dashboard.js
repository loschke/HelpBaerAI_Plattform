document.addEventListener('DOMContentLoaded', function() {
    const userTable = document.getElementById('userTable');
    if (userTable) {
        userTable.addEventListener('click', function(event) {
            const target = event.target;
            if (target.classList.contains('add-credits-btn')) {
                const userId = target.dataset.userId;
                addCredits(userId, 100);
            } else if (target.classList.contains('delete-user-btn')) {
                const userId = target.dataset.userId;
                deleteUser(userId);
            } else if (target.classList.contains('add-to-mautic-btn')) {
                const userId = target.dataset.userId;
                const firstname = target.dataset.firstname;
                const email = target.dataset.email;
                addToMautic(userId, firstname, email);
            }
        });
    }
});

async function addCredits(userId, amount) {
    if (confirm(`Möchten Sie wirklich ${amount} Credits zum Benutzer hinzufügen?`)) {
        try {
            const response = await fetch('/admin/add-credits', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId, amount }),
            });
            if (response.ok) {
                alert('Credits erfolgreich hinzugefügt');
                location.reload();
            } else {
                alert('Fehler beim Hinzufügen der Credits');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Ein Fehler ist aufgetreten');
        }
    }
}

async function deleteUser(userId) {
    if (confirm('Möchten Sie diesen Benutzer wirklich löschen? Diese Aktion kann nicht rückgängig gemacht werden.')) {
        try {
            const response = await fetch('/admin/delete-user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId }),
            });
            if (response.ok) {
                alert('Benutzer erfolgreich gelöscht');
                location.reload();
            } else {
                alert('Fehler beim Löschen des Benutzers');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Ein Fehler ist aufgetreten');
        }
    }
}

async function addToMautic(userId, firstname, email) {
    if (confirm(`Möchten Sie die Daten von ${firstname} (${email}) wirklich an Mautic übertragen?`)) {
        try {
            const response = await fetch('/admin/add-to-mautic', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId, firstname, email, makeBranch: 'crmOps' }),
            });
            if (response.ok) {
                alert('Daten erfolgreich an Mautic übertragen');
            } else {
                alert('Fehler bei der Übertragung der Daten an Mautic');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Ein Fehler ist aufgetreten bei der Übertragung an Mautic');
        }
    }
}
