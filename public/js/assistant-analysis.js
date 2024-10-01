let isSidepanelOpen = false;

function toggleSidepanel() {
    const sidepanel = document.getElementById('sidepanel');
    const sidepanelContent = document.getElementById('sidepanel-content');
    
    isSidepanelOpen = !isSidepanelOpen;
    
    if (isSidepanelOpen) {
        sidepanel.classList.remove('w-12');
        sidepanel.classList.add('sm:w-full', 'md:w-1/2', 'lg:max-w-1/2');
        sidepanelContent.classList.remove('hidden');
    } else {
        sidepanel.classList.add('w-12');
        sidepanel.classList.remove('sm:w-full', 'md:w-1/2', 'lg:max-w-1/2');
        sidepanelContent.classList.add('hidden');
    }
}

function switchTab(tab) {
    const textInput = document.getElementById('textInput');
    const urlInput = document.getElementById('urlInput');
    const textTab = document.getElementById('textTab');
    const urlTab = document.getElementById('urlTab');

    if (tab === 'text') {
        textInput?.classList.remove('hidden');
        urlInput?.classList.add('hidden');
        textTab?.classList.add('tab-active');
        urlTab?.classList.remove('tab-active');
    } else {
        textInput?.classList.add('hidden');
        urlInput?.classList.remove('hidden');
        textTab?.classList.remove('tab-active');
        urlTab?.classList.add('tab-active');
    }
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    const toggleButton = document.getElementById('toggleSidepanel');
    const textTab = document.getElementById('textTab');
    const urlTab = document.getElementById('urlTab');

    toggleButton?.addEventListener('click', toggleSidepanel);
    textTab?.addEventListener('click', () => switchTab('text'));
    urlTab?.addEventListener('click', () => switchTab('url'));

    // Ensure sidepanel is initially closed
    const sidepanel = document.getElementById('sidepanel');
    const sidepanelContent = document.getElementById('sidepanel-content');
    sidepanel.classList.add('w-12');
    sidepanel.classList.remove('sm:w-full', 'md:w-1/2', 'lg:max-w-1/2');
    sidepanelContent.classList.add('hidden');
});

function pasteFromClipboard() {
    navigator.clipboard.readText()
        .then(text => {
            const textarea = document.getElementById('analysisTextarea');
            if (textarea) {
                const currentText = textarea.value;
                const availableSpace = 2000 - currentText.length;
                const textToInsert = text.slice(0, availableSpace);
                textarea.value = currentText + textToInsert;
                updateCharCounter();
                toggleClearButton();
            }
        })
        .catch(err => {
            console.error('Failed to read clipboard contents: ', err);
        });
}

function clearTextarea() {
    const textarea = document.getElementById('analysisTextarea');
    if (textarea) {
        textarea.value = '';
        updateCharCounter();
        toggleClearButton();
    }
}

function toggleClearButton() {
    const textarea = document.getElementById('analysisTextarea');
    const clearButton = document.getElementById('clear-textarea');
    if (textarea && clearButton) {
        if (textarea.value.trim().length > 0) {
            clearButton.classList.remove('hidden');
        } else {
            clearButton.classList.add('hidden');
        }
    }
}

function updateCharCounter() {
    const textarea = document.getElementById('analysisTextarea');
    const charCounter = document.getElementById('charCounter');
    if (textarea && charCounter) {
        const currentLength = textarea.value.length;
        charCounter.textContent = `${currentLength} / 2000`;
        toggleIcons();
    }
}

function toggleIcons() {
    const textarea = document.getElementById('analysisTextarea');
    const pasteButton = document.getElementById('paste-clipboard');
    const clearButton = document.getElementById('clear-textarea');
    
    if (textarea && pasteButton && clearButton) {
        if (textarea.value.trim().length > 0) {
            pasteButton.classList.add('hidden');
            clearButton.classList.remove('hidden');
        } else {
            pasteButton.classList.remove('hidden');
            clearButton.classList.add('hidden');
        }
    }
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    const pasteButton = document.getElementById('paste-clipboard');
    const clearButton = document.getElementById('clear-textarea');
    const textarea = document.getElementById('analysisTextarea');

    pasteButton?.addEventListener('click', pasteFromClipboard);
    clearButton?.addEventListener('click', clearTextarea);

    textarea?.addEventListener('input', updateCharCounter);

    // Initialize char counter and icon visibility
    updateCharCounter();
    toggleIcons(); // Add this line to ensure correct initial state
});

function updateAdditionalCharCounter() {
    const input = document.getElementById('additionalRequirements');
    const charCounter = document.getElementById('additionalCharCounter');
    if (input && charCounter) {
        const currentLength = input.value.length;
        charCounter.textContent = `${currentLength} / 100`;
    }
}

// Fügen Sie diese Zeilen am Ende der bestehenden DOMContentLoaded Event-Listener-Funktion hinzu
document.addEventListener('DOMContentLoaded', () => {
    // ... bestehender Code ...

    const additionalInput = document.getElementById('additionalRequirements');
    additionalInput?.addEventListener('input', updateAdditionalCharCounter);

    // Initialisieren Sie den Zeichenzähler für das zusätzliche Eingabefeld
    updateAdditionalCharCounter();
});

function pasteUrlFromClipboard() {
    navigator.clipboard.readText()
        .then(text => {
            const urlInput = document.getElementById('urlInputField');
            if (urlInput) {
                urlInput.value = text.trim();
                toggleUrlIcons();
            }
        })
        .catch(err => {
            console.error('Failed to read clipboard contents: ', err);
        });
}

function clearUrlInput() {
    const urlInput = document.getElementById('urlInputField');
    if (urlInput) {
        urlInput.value = '';
        toggleUrlIcons();
    }
}

function toggleUrlIcons() {
    const urlInput = document.getElementById('urlInputField');
    const pasteUrlButton = document.getElementById('paste-url');
    const clearUrlButton = document.getElementById('clear-url');
    
    if (urlInput && pasteUrlButton && clearUrlButton) {
        if (urlInput.value.trim().length > 0) {
            pasteUrlButton.classList.add('hidden');
            clearUrlButton.classList.remove('hidden');
        } else {
            pasteUrlButton.classList.remove('hidden');
            clearUrlButton.classList.add('hidden');
        }
    }
}

// Fügen Sie diese Zeilen zur bestehenden DOMContentLoaded Event-Listener-Funktion hinzu
document.addEventListener('DOMContentLoaded', () => {
    // ... bestehender Code ...

    const pasteUrlButton = document.getElementById('paste-url');
    const clearUrlButton = document.getElementById('clear-url');
    const urlInput = document.getElementById('urlInputField');

    pasteUrlButton?.addEventListener('click', pasteUrlFromClipboard);
    clearUrlButton?.addEventListener('click', clearUrlInput);
    urlInput?.addEventListener('input', toggleUrlIcons);

    // Initialize icon visibility for URL input
    toggleUrlIcons();
});

function loadSampleText(filename) {
    fetch(`/api/sample-text/${filename}`)
        .then(response => response.json())
        .then(data => {
            const textarea = document.getElementById('analysisTextarea');
            if (textarea) {
                textarea.value = data.content;
                updateCharCounter();
                toggleClearButton();
            }
        })
        .catch(error => console.error('Error loading sample text:', error));
}

// Fügen Sie dies innerhalb des bestehenden DOMContentLoaded Event Listeners hinzu
document.addEventListener('DOMContentLoaded', () => {
    // ... bestehender Code ...

    // Event-Listener für Beispieltext-Buttons hinzufügen
    const sampleTextButtons = document.querySelectorAll('.load-sample-text');
    sampleTextButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filename = button.dataset.filename;
            loadSampleText(filename);
        });
    });
});

function toggleAdvancedSettings() {
    const advancedSettings = document.getElementById('advancedSettings');
    const toggleButton = document.getElementById('advancedSettingsToggle');
    const icon = toggleButton.querySelector('svg');

    advancedSettings.classList.toggle('hidden');
    icon.classList.toggle('rotate-180');
}

// Add this line to the existing DOMContentLoaded event listener
document.addEventListener('DOMContentLoaded', () => {
    // ... existing code ...

    const advancedSettingsToggle = document.getElementById('advancedSettingsToggle');
    advancedSettingsToggle?.addEventListener('click', toggleAdvancedSettings);
});