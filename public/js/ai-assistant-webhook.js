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
        this.operationButtons = document.querySelectorAll('.operation-button');

        this.activeTab = 'text';
        this.selectedOperationId = null;
        this.selectedLanguageModel = null;
        this.promptTemplateContent = null;

        this.initEventListeners();
        this.initWebhookUrl().then(() => {
            console.log('Webhook URL initialized:', this.webhookUrl);
        }).catch(error => {
            console.error('Failed to initialize webhook URL:', error);
        });

        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            console.log('Form submitted, calling sendDataToWebhook');
            this.sendDataToWebhook();
        });

        this.loadingAnimation = document.getElementById('loadingAnimation');

        this.handleOperationClick = this.handleOperationClick.bind(this);
        this.operationButtons.forEach(button => {
            button.addEventListener('click', this.handleOperationClick.bind(this));
        });

        this.loginPopup = document.getElementById('loginPopup');
        this.closePopupButton = document.getElementById('closePopup');
        this.closePopupButton.addEventListener('click', this.hideLoginPopup.bind(this));
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
        this.textTab.addEventListener('click', () => this.switchTab('text'));
        this.urlTab.addEventListener('click', () => this.switchTab('url'));

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
                // Führen Sie hier die gewünschte Aktion für eingeloggte Benutzer aus
                console.log('Operation für eingeloggten Benutzer ausführen');
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
            tabType: this.activeTab,  // Hier fügen wir den Tab-Typ hinzu
            content: this.activeTab === 'text' ? this.analysisTextarea.value : this.urlInputField.value,
            mainFocus: this.mainFocus.value,
            outputLanguage: this.outputLanguage.value,
            outputFormat: this.outputFormat.value,
            operationId: this.selectedOperationId,
            languageModel: this.languageModel.value || this.selectedLanguageModel,
            promptTemplate: this.promptTemplateContent,
            makeBranch: this.selectedMakeBranch // Neue Zeile
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
            // Log the operation start
            const logResponse = await fetch('/api/log-operation', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    operationId: this.selectedOperationId,
                    formData: JSON.stringify(data),
                }),
            });
            const logResult = await logResponse.json();
            const logId = logResult.id;

            const response = await fetch(`/assistants/${this.getAssistantId()}/process`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            console.log('Response status:', response.status);
            console.log('Response headers:', response.headers);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            console.log('Success:', result);

            // Update the log with success status and response
            await fetch(`/api/update-log/${logId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    success: true,
                    response: JSON.stringify(result),
                }),
            });

            this.handleWebhookResponse(result);
        } catch (error) {
            console.error('Error:', error);
            this.handleWebhookError(error);
        } finally {
            this.hideLoadingAnimation();
        }
    }

    getAssistantId() {
        // Extrahieren Sie die Assistant-ID aus der URL
        const pathParts = window.location.pathname.split('/');
        return pathParts[pathParts.length - 1];
    }

    showLoadingAnimation() {
        if (this.loadingAnimation) {
            this.loadingAnimation.classList.remove('hidden');
        }
    }

    hideLoadingAnimation() {
        if (this.loadingAnimation) {
            this.loadingAnimation.classList.add('hidden');
        }
    }

    handleWebhookResponse(result) {
        console.log('Handling webhook response:', result);
        this.displayResponse(result);
    }

    displayResponse(result) {
        const responseContainer = document.getElementById('webhookResponse');
        if (responseContainer) {
            // Fügen Sie den HTML-Inhalt in das output-Element ein
            responseContainer.querySelector('.output').innerHTML = result.output;
            
            // Aktualisieren Sie die Metadaten
            responseContainer.querySelector('.llm-value').textContent = result.llm;
            responseContainer.querySelector('.prompt-token').textContent = result.prompt_token;
            responseContainer.querySelector('.completion-token').textContent = result.completion_token;
            responseContainer.querySelector('.scrape-token').textContent = result.scrape_token;
            
            // Zeigen Sie den Container an
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
        this.loginPopup.style.display = 'flex';
    }

    hideLoginPopup() {
        this.loginPopup.style.display = 'none';
    }
}

console.log('AIAssistantForm class defined');

// Export the class for use in other files
export default AIAssistantForm