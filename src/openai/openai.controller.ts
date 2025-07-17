import { Body, Controller, Post } from '@nestjs/common';
import { ChatCompletionMessageDto } from './dto/create-chat-completion.request';

@Controller('openai')
export class OpenaiController {
  @Post('chatCompletion')
  async CreateChatCompletion(@Body() body: ChatCompletionMessageDto) {}
}
