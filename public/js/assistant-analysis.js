class AIAssistant {
    constructor(formElement) {
        this.form = formElement;
        this.assistantName = this.form.dataset.assistant;
        this.initEventListeners();
    }

    initEventListeners() {
        const tabs = this.form.querySelectorAll('.tab');
        tabs.forEach(tab => tab.addEventListener('click', () => this.switchTab(tab)));

        const operationButtons = this.form.querySelectorAll('.operation-btn');
        operationButtons.forEach(button => {
            button.addEventListener('click', (e) => this.handleOperationClick(e));
        });
    }

    switchTab(clickedTab) {
        const tabs = this.form.querySelectorAll('.tab');
        tabs.forEach(tab => tab.classList.remove('tab-active'));
        clickedTab.classList.add('tab-active');

        const textInput = this.form.querySelector('#textInput');
        const urlInput = this.form.querySelector('#urlInput');
        if (clickedTab.id === 'textTab') {
            textInput.classList.remove('hidden');
            urlInput.classList.add('hidden');
        } else {
            textInput.classList.add('hidden');
            urlInput.classList.remove('hidden');
        }
    }

    handleOperationClick(event) {
        event.preventDefault();
        const operationButtons = this.form.querySelectorAll('.operation-btn');
        operationButtons.forEach(btn => btn.classList.remove('selected'));
        event.target.classList.add('selected');
        
        this.submitAnalysisRequest(event.target.dataset.operation);
    }

    submitAnalysisRequest(selectedOperation) {
        const selectedTab = this.form.querySelector('.tab.tab-active').id === 'textTab' ? 'text' : 'url';
        const content = selectedTab === 'text' 
            ? this.form.querySelector('#analysisTextarea').value 
            : this.form.querySelector('#urlInputField').value;
        const additionalRequirements = this.form.querySelector('#additionalRequirements').value;
        const outputLanguage = this.form.querySelector('#language').value;
        const outputFormat = this.form.querySelector('#outputFormat').value;
        const selectedModel = this.form.querySelector('#model').value;

        const data = {
            assistantName: this.assistantName,
            selectedTab,
            content,
            additionalRequirements,
            outputLanguage,
            outputFormat,
            selectedModel,
            selectedOperation
        };

        fetch('/api/analyze', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(result => {
            console.log('Success:', result);
            this.displayAnalysisResult(result);
        })
        .catch(error => {
            console.error('Error:', error);
            this.displayError(error);
        });
    }

    displayAnalysisResult(result) {
        const resultContainer = this.form.querySelector('#analysisResult');
        resultContainer.innerHTML = `<pre>${JSON.stringify(result, null, 2)}</pre>`;
        resultContainer.classList.remove('hidden');
    }

    displayError(error) {
        const errorContainer = this.form.querySelector('#errorMessage');
        errorContainer.textContent = `Ein Fehler ist aufgetreten: ${error.message}`;
        errorContainer.classList.remove('hidden');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const aiAssistantForms = document.querySelectorAll('.ai-assistant-form');
    aiAssistantForms.forEach(form => new AIAssistant(form));
});