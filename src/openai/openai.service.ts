import { Injectable } from '@nestjs/common';
import { OpenAI } from 'openai';
import { ChatCompletionMessageDto } from './dto/create-chat-completion.request';
import { ChatCompletionMessageParam } from 'openai/resources';

const MODEL = 'openai/gpt-4o';
/*const INSTRUCTION = `
Extract all numbers from the user's message and return them as a comma-separated list.
Do not include any explanation or extra text.
`;*/
const INSTRUCTION = `
You will receive an array of user reviews for a product.
Analyze all the reviews and provide a concise, well-structured summary of:
- the overall sentiment,
- the main strengths users mentioned,
- any common concerns or complaints.

Do not copy any review directly. Avoid repetition.
Write in a neutral and informative tone.
Respond only with the summary. Do not add any introduction or conclusion.
`;

const SUMMARIZE_REVIEWS_INSTRUCTION = `
You will receive a sequence of user messages. Each message represents a user review for the same product.

Your task is to:
- analyze all reviews,
- summarize the overall sentiment,
- identify the main strengths users mention,
- and list any common issues or concerns.

Do not quote or repeat reviews. Avoid repetition.
Keep your response neutral, informative, and concise.
Reply only with the summary. Do not include any introduction or conclusion.
`;

@Injectable()
export class OpenaiService {
  constructor(private readonly openAI: OpenAI) {}

  async createChatCompletion(userMessages: ChatCompletionMessageDto[]) {
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

  async summarizeReviewMessages(reviews: string[]): Promise<string> {
    const messages: ChatCompletionMessageParam[] = [
      { role: 'system', content: SUMMARIZE_REVIEWS_INSTRUCTION },
      ...reviews.map((review) => ({
        role: 'user' as const,
        content: review,
      })),
    ];

    const response = await this.openAI.chat.completions.create({
      model: MODEL,
      messages,
      max_tokens: 1000,
      temperature: 0.7,
    });

    return response.choices[0]?.message?.content ?? '';
  }
}
