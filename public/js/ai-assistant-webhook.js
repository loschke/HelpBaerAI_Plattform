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
        this.additionalRequirements = document.getElementById('additionalRequirements');
        this.outputLanguage = document.getElementById('outputLanguage');
        this.outputFormat = document.getElementById('outputFormat');
        this.languageModel = document.getElementById('languageModel');
        this.operationButtons = document.querySelectorAll('.btn[data-operation-id]');

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
            button.addEventListener('click', this.handleOperationClick);
        });
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
            this.selectedOperationId = button.dataset.operationId;
            this.selectedLanguageModel = button.dataset.languageModel;
            const promptTemplatePath = button.dataset.promptTemplate;
            console.log('Prompt template path:', promptTemplatePath);
            if (promptTemplatePath) {
                this.promptTemplateContent = await this.readPromptTemplate(promptTemplatePath);
                console.log('Prompt template content set:', !!this.promptTemplateContent);
                console.log('Prompt template content preview:', this.promptTemplateContent?.substring(0, 100));
            } else {
                this.promptTemplateContent = null;
                console.log('No prompt template path provided');
            }
            console.log(`Selected operation: ${this.selectedOperationId}, Language model: ${this.selectedLanguageModel}`);
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
            additionalInstructions: this.additionalRequirements.value,
            outputLanguage: this.outputLanguage.value,
            outputFormat: this.outputFormat.value,
            operationId: this.selectedOperationId,
            languageModel: this.languageModel.value || this.selectedLanguageModel,
            promptTemplate: this.promptTemplateContent || 'No prompt template loaded'
        };
        console.log('Form data:', formData);
        return formData;
    }

    async sendDataToWebhook() {
        console.log('Sending data to webhook');
        this.showLoadingAnimation();

        if (!this.webhookUrl) {
            console.error('Webhook URL not initialized. Retrying initialization...');
            try {
                await this.initWebhookUrl();
            } catch (error) {
                console.error('Failed to initialize webhook URL:', error);
                this.hideLoadingAnimation();
                return;
            }
        }

        const data = this.getFormData();
        console.log('Data to be sent:', data);
        console.log('Webhook URL:', this.webhookUrl);

        try {
            console.log('Sending fetch request...');
            const response = await fetch(this.webhookUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
                mode: 'cors'
            });
            console.log('Received response:', response);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const result = await response.json();
            console.log('Success:', result);
            this.handleWebhookResponse(result);
        } catch (error) {
            console.error('Error:', error);
            this.handleWebhookError(error);
        } finally {
            this.hideLoadingAnimation();
        }
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
        console.log('Response container:', responseContainer);
        if (responseContainer) {
            // Clear previous content
            responseContainer.innerHTML = '';

            // Create content based on the response
            const content = document.createElement('div');
            content.innerHTML = `
                <h4 class="font-semibold mb-2">Analysis Result:</h4>
                <div class="bg-base-300 p-4 rounded overflow-x-auto">
                    ${this.formatResponseContent(result)}
                </div>
            `;

            responseContainer.appendChild(content);

            // Show the response container
            responseContainer.classList.remove('hidden');
            console.log('Hidden class removed from response container');
        } else {
            console.error('Response container not found');
        }
    }

    formatResponseContent(result) {
        console.log('Formatting response content:', result);
        if (typeof result === 'string') {
            return result;
        } else if (result.content) {
            return result.content;
        } else if (typeof result === 'object') {
            return `<pre>${JSON.stringify(result, null, 2)}</pre>`;
        } else {
            return 'Unexpected response format';
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
}

console.log('AIAssistantForm class defined');

// Export the class for use in other files
export default AIAssistantForm;
