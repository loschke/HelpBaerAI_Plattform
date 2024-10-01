import aiAssistants from '../config/ai-assistants';

interface AnalysisRequest {
    assistantName: string;
    selectedTab: string;
    content: string;
    additionalRequirements: string;
    outputLanguage: string;
    outputFormat: string;
    selectedModel: string;
    selectedOperation: string;
}

export async function analyzeContent(data: AnalysisRequest) {
    const webhookUrl = process.env.WEBHOOK_URL;
    if (!webhookUrl) {
        throw new Error('Webhook URL is not defined');
    }

    const assistant = aiAssistants.find(a => a.title === data.assistantName);
    if (!assistant) {
        throw new Error('Assistant not found');
    }

    const operation = assistant.operations?.find(op => op.name === data.selectedOperation);
    if (!operation) {
        throw new Error('Operation not found');
    }

    const model = data.selectedModel || operation.model || 'default-model';

    const webhookData = {
        ...data,
        model
    };

    const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(webhookData)
    });

    if (!response.ok) {
        throw new Error(`Webhook request failed with status ${response.status}`);
    }

    return await response.json();
}
