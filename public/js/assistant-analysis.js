import AIAssistantForm from './ai-assistant-webhook.js';

const assistantInputType = document.body.dataset.assistantInputType;

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

function initializeInputType() {
    const textInput = document.getElementById('textInput');
    const urlInput = document.getElementById('urlInput');

    if (assistantInputType === 'both') {
        textInput.classList.remove('hidden');
        urlInput.classList.add('hidden');
    } else if (assistantInputType === 'url') {
        textInput.classList.add('hidden');
        urlInput.classList.remove('hidden');
    } else { // 'text'
        textInput.classList.remove('hidden');
        urlInput.classList.add('hidden');
    }
}

function switchTab(tab) {
    if (assistantInputType !== 'both') return; // Only allow switching for 'both' type

    const textInput = document.getElementById('textInput');
    const urlInput = document.getElementById('urlInput');
    const textTab = document.getElementById('textTab');
    const urlTab = document.getElementById('urlTab');

    if (tab === 'text') {
        textInput.classList.remove('hidden');
        urlInput.classList.add('hidden');
        textTab.classList.add('tab-active');
        urlTab.classList.remove('tab-active');
    } else {
        textInput.classList.add('hidden');
        urlInput.classList.remove('hidden');
        textTab.classList.remove('tab-active');
        urlTab.classList.add('tab-active');
    }

    // Update the activeTab in the AIAssistantForm instance
    const assistantForm = window.assistantForm; // Assuming you've made the instance globally accessible
    if (assistantForm) {
        assistantForm.activeTab = tab;
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
    const input = document.getElementById('mainFocus');
    const charCounter = document.getElementById('mainFocusCharCounter');
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
        const assistantForm = new AIAssistantForm('aiAssistantForm');

        // Add click event listeners to operation buttons
        const operationButtons = form.querySelectorAll('button[data-operation-id]');
        operationButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const operationId = button.getAttribute('data-operation-id');
                const languageModel = button.getAttribute('data-language-model');
                const makeBranch = button.getAttribute('data-make-branch');
                
                assistantForm.selectedOperationId = operationId;
                assistantForm.selectedLanguageModel = languageModel;
                assistantForm.selectedMakeBranch = makeBranch;
                
                assistantForm.sendDataToWebhook();
            });
        });
    }

    initializeLoadingAnimation();
});

// Update the character counter for mainFocus
const mainFocusInput = document.getElementById('mainFocus');
const mainFocusCharCounter = document.getElementById('mainFocusCharCounter');

if (mainFocusInput && mainFocusCharCounter) {
    mainFocusInput.addEventListener('input', function() {
        const remainingChars = 100 - this.value.length;
        mainFocusCharCounter.textContent = `${this.value.length} / 100`;
    });
}

async function handleSubmit(event) {
    event.preventDefault();
    // ... (vorheriger Code)

    try {
        const response = await fetch('/assistants/' + assistantId + '/process', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        
        // Aktualisieren des DOM mit den geparsten Daten
        const webhookResponseElement = document.getElementById('webhookResponse');
        
        // Die Ausgabe direkt in das output-Element einfügen
        webhookResponseElement.querySelector('.output').innerHTML = result.output;
        
        // Metadaten aktualisieren
        webhookResponseElement.querySelector('.llm-value').textContent = result.llm;
        webhookResponseElement.querySelector('.prompt-token').textContent = result.prompt_token;
        webhookResponseElement.querySelector('.completion-token').textContent = result.completion_token;
        webhookResponseElement.querySelector('.scrape-token').textContent = result.scrape_token;
        
        webhookResponseElement.classList.remove('hidden');

        // Scroll to the response
        scrollToResponse();

    } catch (error) {
        console.error('Error:', error);
        // Hier könnten Sie eine Fehlermeldung für den Benutzer anzeigen
    }
}

const assistantType = window.assistantType;

// Initialize the form when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    new AIAssistantForm();
});
