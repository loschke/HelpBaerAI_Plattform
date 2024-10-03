import fs from 'fs/promises';
import path from 'path';

interface PromptTemplate {
  role: string;
  task: string;
  instruction: string;
  followUp: string;
  outputFormat: string;
  languageHandling: string;
  generalInstructions: string;
}

async function readPromptFile(filePath: string): Promise<string> {
  try {
    return await fs.readFile(filePath, 'utf-8');
  } catch (error) {
    console.error(`Error reading prompt file: ${filePath}`, error);
    throw new Error(`Failed to read prompt file: ${filePath}`);
  }
}

export async function getPromptTemplate(operationKey: string): Promise<PromptTemplate> {
  const basePath = path.join(__dirname, '..', 'prompts');
  const operationPath = path.join(basePath, 'operations', operationKey);
  const sharedPath = path.join(basePath, 'shared');

  try {
    const [role, task, instruction, followUp, outputFormat, languageHandling, generalInstructions] = await Promise.all([
      readPromptFile(path.join(operationPath, 'role.md')),
      readPromptFile(path.join(operationPath, 'task.md')),
      readPromptFile(path.join(operationPath, 'instruction.md')),
      readPromptFile(path.join(operationPath, 'follow_up.md')),
      readPromptFile(path.join(sharedPath, 'output_format.md')),
      readPromptFile(path.join(sharedPath, 'language_handling.md')),
      readPromptFile(path.join(sharedPath, 'general_instructions.md'))
    ]);

    return {
      role,
      task,
      instruction,
      followUp,
      outputFormat,
      languageHandling,
      generalInstructions
    };
  } catch (error) {
    console.error(`Error getting prompt template for key: ${operationKey}`, error);
    throw new Error(`No prompt template found for key: ${operationKey}`);
  }
}
