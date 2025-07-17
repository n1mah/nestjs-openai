import { IsArray, IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class ChatCompletionMessageDto {
  @IsString()
  @IsNotEmpty()
  role: string;

  @IsString()
  @IsNotEmpty()
  content: string;
}

export class CreateChatCompletion {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ChatCompletionMessageDto)
  message: ChatCompletionMessageDto[];
}
