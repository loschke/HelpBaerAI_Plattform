import AIAssistantForm from './ai-assistant-webhook.js';

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

function updateAdditionalCharCounter() {
    const input = document.getElementById('additionalRequirements');
    const charCounter = document.getElementById('additionalCharCounter');
    if (input && charCounter) {
        const currentLength = input.value.length;
        charCounter.textContent = `${currentLength} / 100`;
    }
}

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

function toggleAdvancedSettings() {
    const advancedSettings = document.getElementById('advancedSettings');
    const toggleButton = document.getElementById('advancedSettingsToggle');
    const icon = toggleButton.querySelector('svg');

    advancedSettings.classList.toggle('hidden');
    icon.classList.toggle('rotate-180');
}

function scrollToResponse() {
    const responseContainer = document.getElementById('webhookResponse');
    if (responseContainer) {
        responseContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOMContentLoaded event fired');
    const toggleButton = document.getElementById('toggleSidepanel');
    const textTab = document.getElementById('textTab');
    const urlTab = document.getElementById('urlTab');
    const pasteButton = document.getElementById('paste-clipboard');
    const clearButton = document.getElementById('clear-textarea');
    const textarea = document.getElementById('analysisTextarea');
    const additionalInput = document.getElementById('additionalRequirements');
    const pasteUrlButton = document.getElementById('paste-url');
    const clearUrlButton = document.getElementById('clear-url');
    const urlInput = document.getElementById('urlInputField');
    const advancedSettingsToggle = document.getElementById('advancedSettingsToggle');

    toggleButton?.addEventListener('click', toggleSidepanel);
    textTab?.addEventListener('click', () => switchTab('text'));
    urlTab?.addEventListener('click', () => switchTab('url'));
    pasteButton?.addEventListener('click', pasteFromClipboard);
    clearButton?.addEventListener('click', clearTextarea);
    textarea?.addEventListener('input', updateCharCounter);
    additionalInput?.addEventListener('input', updateAdditionalCharCounter);
    pasteUrlButton?.addEventListener('click', pasteUrlFromClipboard);
    clearUrlButton?.addEventListener('click', clearUrlInput);
    urlInput?.addEventListener('input', toggleUrlIcons);
    advancedSettingsToggle?.addEventListener('click', toggleAdvancedSettings);

    // Ensure sidepanel is initially closed
    const sidepanel = document.getElementById('sidepanel');
    const sidepanelContent = document.getElementById('sidepanel-content');
    sidepanel.classList.add('w-12');
    sidepanel.classList.remove('sm:w-full', 'md:w-1/2', 'lg:max-w-1/2');
    sidepanelContent.classList.add('hidden');

    // Initialize char counter and icon visibility
    updateCharCounter();
    toggleIcons();
    updateAdditionalCharCounter();
    toggleUrlIcons();

    // Event-Listener für Beispieltext-Buttons hinzufügen
    const sampleTextButtons = document.querySelectorAll('.load-sample-text');
    sampleTextButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filename = button.dataset.filename;
            loadSampleText(filename);
        });
    });

    // Initialize AIAssistantForm
    const form = document.getElementById('analysisForm');
    if (form) {
        console.log('Analysis form found');
        const assistantForm = new AIAssistantForm('analysisForm');
        console.log('AIAssistantForm initialized:', assistantForm);

        // Extend the handleWebhookResponse method to scroll to the response
        const originalHandleWebhookResponse = assistantForm.handleWebhookResponse;
        assistantForm.handleWebhookResponse = (result) => {
            console.log('Custom handleWebhookResponse called');
            originalHandleWebhookResponse.call(assistantForm, result);
            scrollToResponse();
        };

        // Prevent default form submission
        form.addEventListener('submit', (e) => {
            e.preventDefault();
        });

        // Add click event listeners to operation buttons
        const operationButtons = form.querySelectorAll('button[data-operation-id]');
        operationButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                console.log('Operation button clicked');
                assistantForm.sendDataToWebhook().catch(error => {
                    console.error('Error sending data to webhook:', error);
                    // Display error message to the user
                    const responseContainer = document.getElementById('webhookResponse');
                    if (responseContainer) {
                        responseContainer.innerHTML = `<div class="text-error">Error: ${error.message}</div>`;
                        responseContainer.classList.remove('hidden');
                        scrollToResponse();
                    }
                }).finally(() => {
                    assistantForm.hideLoadingAnimation();
                });
            });
        });
    } else {
        console.error('Analysis form not found');
    }
});

// Add this line at the end of the file
console.log('assistant-analysis.js loaded');