import { Injectable } from '@nestjs/common';
import { OpenAI } from 'openai';
import { ChatCompletionMessageDto } from './dto/create-chat-completion.request';
import { ChatCompletionMessageParam } from 'openai/resources';

@Injectable()
export class OpenaiService {
  constructor(private readonly openAI: OpenAI) {}

  async createChatCompletion(message: ChatCompletionMessageDto[]){
    return this.openAI.chat.completions.create({
      messages: message as ChatCompletionMessageParam[],
      model: 'openai/gpt-4o',
      max_tokens: 1000,
    });
  }
}
