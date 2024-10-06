class AIAssistantForm {
    constructor(formId) {
        console.log(`Initializing AIAssistantForm with formId: ${formId}`);
        this.form = document.getElementById(formId);
        if (!this.form) {
            console.error(`Form with id ${formId} not found`);
            return;
        }
        this.webhookUrl = null;
        this.textTab = document.getElementById('textTab');
        this.urlTab = document.getElementById('urlTab');
        this.textInput = document.getElementById('textInput');
        this.urlInput = document.getElementById('urlInput');
        this.analysisTextarea = document.getElementById('analysisTextarea');
        this.urlInputField = document.getElementById('urlInputField');
        this.mainFocus = document.getElementById('mainFocus');
        this.outputLanguage = document.getElementById('outputLanguage');
        this.outputFormat = document.getElementById('outputFormat');
        this.languageModel = document.getElementById('languageModel');
        this.operationButtons = document.querySelectorAll('.btn[data-operation-id]');

        this.activeTab = 'text';
        this.selectedOperationId = null;
        this.selectedLanguageModel = null;
        this.promptTemplateContent = null;
        this.selectedMakeBranch = null;

        this.initEventListeners();
        this.initWebhookUrl().then(() => {
            console.log('Webhook URL initialized:', this.webhookUrl);
        }).catch(error => {
            console.error('Failed to initialize webhook URL:', error);
        });

        this.loadingAnimation = document.getElementById('loadingAnimation');
        this.loadingFactElement = document.getElementById('loadingFact');
        this.loadingFactInterval = null;

        // Laden der Facts vom Server
        this.loadingFacts = [];
        this.fetchLoadingFacts();

        // Behalten Sie die Login-Popup-Initialisierung bei
        this.loginPopup = document.getElementById('loginPopup');
        this.closePopupButton = document.getElementById('closePopup');
        if (this.closePopupButton) {
            this.closePopupButton.addEventListener('click', this.hideLoginPopup.bind(this));
        }
    }

    async initWebhookUrl() {
        try {
            console.log('Fetching webhook URL');
            const response = await fetch('/api/webhook-url');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            this.webhookUrl = data.url;
            console.log('Webhook URL set:', this.webhookUrl);
        } catch (error) {
            console.error('Failed to fetch webhook URL:', error);
            throw error;
        }
    }

    initEventListeners() {
        console.log('Initializing event listeners');
        if (this.textTab) this.textTab.addEventListener('click', () => this.switchTab('text'));
        if (this.urlTab) this.urlTab.addEventListener('click', () => this.switchTab('url'));

        this.operationButtons.forEach(button => {
            button.addEventListener('click', this.handleOperationClick.bind(this));
        });
    }

    switchTab(tab) {
        console.log(`Switching to ${tab} tab`);
        this.activeTab = tab;
        if (tab === 'text') {
            this.textInput.classList.remove('hidden');
            this.urlInput.classList.add('hidden');
        } else {
            this.textInput.classList.add('hidden');
            this.urlInput.classList.remove('hidden');
        }
    }

    async handleOperationClick(e) {
        console.log('Operation button clicked');
        const button = e.target.closest('button');
        if (button) {
            e.preventDefault();
            if (!this.isUserLoggedIn()) {
                this.showLoginPopup();
            } else {
                this.selectedOperationId = button.dataset.operationId;
                this.selectedLanguageModel = button.dataset.languageModel;
                this.selectedMakeBranch = button.dataset.makeBranch;
                console.log('Selected operation:', this.selectedOperationId);
                console.log('Selected language model:', this.selectedLanguageModel);
                console.log('Selected make branch:', this.selectedMakeBranch);
                this.sendDataToWebhook();
            }
        }
    }

    async readPromptTemplate(templatePath) {
        try {
            console.log('Attempting to read prompt template:', templatePath);
            const response = await fetch(templatePath);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const content = await response.text();
            console.log('Prompt template content:', content.substring(0, 100) + '...'); // Log first 100 characters
            return content;
        } catch (error) {
            console.error('Error reading prompt template:', error);
            return null;
        }
    }

    getFormData() {
        const formData = {
            tabType: this.activeTab,
            content: this.activeTab === 'text' ? this.analysisTextarea.value : this.urlInputField.value,
            mainFocus: this.mainFocus.value,
            outputLanguage: this.outputLanguage.value,
            outputFormat: this.outputFormat.value,
            operationId: this.selectedOperationId,
            languageModel: this.languageModel.value || this.selectedLanguageModel,
            promptTemplate: this.promptTemplateContent,
            makeBranch: this.selectedMakeBranch
        };
        console.log('Form data:', formData);
        return formData;
    }

    async sendDataToWebhook() {
        console.log('Sending data to webhook');
        if (!this.isUserLoggedIn()) {
            this.showLoginPopup();
            return;
        }
        this.showLoadingAnimation();

        const data = this.getFormData();
        console.log('Data to be sent:', data);

        try {
            const response = await fetch(`/assistants/${this.getAssistantId()}/process`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const errorData = await response.json();
                if (response.status === 403 && errorData.error === 'Insufficient credits') {
                    this.displayError('Sie haben nicht genügend Credits für diese Operation.');
                } else {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
            } else {
                const result = await response.json();
                this.handleWebhookResponse(result);
            }
        } catch (error) {
            console.error('Error:', error);
            this.displayError('Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.');
        } finally {
            this.hideLoadingAnimation();
        }
    }

    displayError(message) {
        const errorContainer = document.getElementById('errorContainer');
        if (errorContainer) {
            errorContainer.textContent = message;
            errorContainer.classList.remove('hidden');
        }
    }

    getAssistantId() {
        const pathParts = window.location.pathname.split('/');
        return pathParts[pathParts.length - 1];
    }

    async fetchLoadingFacts() {
        try {
            const response = await fetch('/assistants/loading-facts');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            this.loadingFacts = await response.json();
            console.log('Loading facts fetched successfully:', this.loadingFacts);
        } catch (error) {
            console.error('Failed to fetch loading facts:', error);
            // Fallback zu statischen Facts, falls vorhanden
            this.loadingFacts = window.loadingFacts || [];
        }
    }

    getRandomLoadingFact() {
        if (this.loadingFacts.length > 0) {
            return this.loadingFacts[Math.floor(Math.random() * this.loadingFacts.length)];
        }
        return null;
    }

    updateLoadingFact() {
        if (this.loadingFactElement) {
            const randomFact = this.getRandomLoadingFact();
            if (randomFact) {
                this.loadingFactElement.innerHTML = `
                    <h3 class="font-bold text-lg text-accent">${randomFact.title}</h3>
                    <p class="mt-2">${randomFact.text}</p>
                    <p class="mt-2 font-semibold">${randomFact.cta}</p>
                `;
            }
        }
    }

    showLoadingAnimation() {
        if (this.loadingAnimation) {
            this.loadingAnimation.classList.remove('hidden');
            this.updateLoadingFact();
            // Aktualisiere den Fact alle 10 Sekunden
            this.loadingFactInterval = setInterval(() => this.updateLoadingFact(), 11000);
        }
    }

    hideLoadingAnimation() {
        if (this.loadingAnimation) {
            this.loadingAnimation.classList.add('hidden');
            if (this.loadingFactInterval) {
                clearInterval(this.loadingFactInterval);
                this.loadingFactInterval = null;
            }
        }
    }

    handleWebhookResponse(result) {
        console.log('Handling webhook response:', result);
        this.displayResponse(result);
    }

    displayResponse(result) {
        const responseContainer = document.getElementById('webhookResponse');
        if (responseContainer) {
            responseContainer.querySelector('.output').innerHTML = result.output;
            
            responseContainer.querySelector('.llm-value').textContent = result.llm;
            responseContainer.querySelector('.prompt-token').textContent = result.prompt_token;
            responseContainer.querySelector('.completion-token').textContent = result.completion_token;
            responseContainer.querySelector('.scrape-token').textContent = result.scrape_token;
            
            responseContainer.querySelector('.prompt-cost').textContent = result.cost.promptCost.toFixed(4);
            responseContainer.querySelector('.output-cost').textContent = result.cost.outputCost.toFixed(4);
            responseContainer.querySelector('.scrape-cost').textContent = result.cost.scrapeCost.toFixed(4);
            responseContainer.querySelector('.total-cost').textContent = result.cost.totalCost.toFixed(4);
            
            responseContainer.classList.remove('hidden');
        } else {
            console.error('Response container not found');
        }
    }

    handleWebhookError(error) {
        console.error('Webhook error:', error);
        const responseContainer = document.getElementById('webhookResponse');
        if (responseContainer) {
            responseContainer.innerHTML = `<div class="text-error">Error: ${error.message}</div>`;
            responseContainer.classList.remove('hidden');
        }
    }

    isUserLoggedIn() {
        return document.body.classList.contains('user-logged-in');
    }

    showLoginPopup() {
        if (this.loginPopup) {
            this.loginPopup.style.display = 'flex';
        }
    }

    hideLoginPopup() {
        if (this.loginPopup) {
            this.loginPopup.style.display = 'none';
        }
    }
}

console.log('AIAssistantForm class defined');

// Initialize the form when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    new AIAssistantForm('aiAssistantForm');
});

// Export the class for use in other files
export default AIAssistantForm;