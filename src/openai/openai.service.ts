import { Injectable } from '@nestjs/common';
import { OpenAI } from 'openai';
import { ChatCompletionMessageDto } from './dto/create-chat-completion.request';
import { ChatCompletionMessageParam } from 'openai/resources';

const MODEL = 'openai/gpt-4o';
const INSTRUCTION = `
Extract all numbers from the user's message and return them as a comma-separated list.
Do not include any explanation or extra text.
`;

@Injectable()
export class OpenaiService {
  constructor(private readonly openAI: OpenAI) {}

  async createChatCompletion(userMessages: ChatCompletionMessageDto[]){
    const messages: ChatCompletionMessageParam[] = [
      { role: 'system', content: INSTRUCTION },
      ...userMessages.map(({ role, content }: ChatCompletionMessageDto) => ({
        role,
        content,
      })),
    ];

    return this.openAI.chat.completions.create({
      messages,
      model: MODEL,
      max_tokens: 1000,
    });
  }
}
