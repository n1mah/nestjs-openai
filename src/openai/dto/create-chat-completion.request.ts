import { IsArray, IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export type RoleType = 'user' | 'system' | 'assistant'; /*| 'function'*/

export class ChatCompletionMessageDto {
  @IsString()
  @IsNotEmpty()
  role: RoleType;

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
