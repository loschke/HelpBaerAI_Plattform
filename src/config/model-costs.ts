type ModelCosts = {
  [key: string]: {
    "llm-prompt"?: number;
    "llm-output"?: number;
    "scrape-token"?: number;
  }
};

const modelCosts: ModelCosts = {
  "openai/gpt-4o-mini": {
    "llm-prompt": 0.15,
    "llm-output": 0.60,
    "scrape-token": 0.2
  },
  "openai/gpt-4o-2024-08-06": {
    "llm-prompt": 2.5,
    "llm-output": 10,
    "scrape-token": 0.2
  },
  "openai/o1-mini": {
    "llm-prompt": 3,
    "llm-output": 12,
    "scrape-token": 0.2
  },
  "openai/o1-preview": {
    "llm-prompt": 15,
    "llm-output": 60,
    "scrape-token": 0.2
  },
  "anthropic/claude-3.5-sonnet": {
    "llm-prompt": 3,
    "llm-output": 15,
    "scrape-token": 0.2
  },
  "perplexity/llama-3.1-sonar-huge-128k-online": {
    "llm-prompt": 2,
    "llm-output": 2,
    "scrape-token": 0.2
  },
  "google/gemini-pro-1.5": {
    "llm-prompt": 2.5,
    "llm-output": 7.5,
    "scrape-token": 0.2
  },
  "google/gemini-flash-1.5": {
    "llm-prompt": 0.075,
    "llm-output": 0.3,
    "scrape-token": 0.2
  },
  "x-ai/grok-2-mini": {
    "llm-prompt": 4.2,
    "llm-output": 6.9,
    "scrape-token": 0.2
  },
  "x-ai/grok-2": {
    "llm-prompt": 4.2,
    "llm-output": 6.9,
    "scrape-token": 0.2
  }
};

export default { modelCosts };