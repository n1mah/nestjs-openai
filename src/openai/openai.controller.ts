import { Body, Controller, Post } from '@nestjs/common';
import { CreateChatCompletion } from './dto/create-chat-completion.request';
import { OpenaiService } from './openai.service';

@Controller('openai')
export class OpenaiController {
  constructor(private readonly openaiService: OpenaiService) {}

  @Post('chatCompletion')
  async CreateChatCompletion(@Body() body: CreateChatCompletion) {
    return this.openaiService.createChatCompletion(body.message);
  }

  @Post('summarize')
  async summarizeReviews() {
    const reviews = [
      'Great product, loved the camera.',
      'Poor battery life.',
      'Works fast and smooth.',
    ];
    const summary = await this.openaiService.summarizeReviewMessages(reviews);
    return { summary };
  }
}
