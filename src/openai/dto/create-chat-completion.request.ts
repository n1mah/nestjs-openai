export class ChatCompletionMessageDto {
  role: string;
  content: string;
}

export class CreateChatCompletion {
  message: ChatCompletionMessageDto[];
}
