import { IsIn, IsNotEmpty, IsString } from 'class-validator';

export class StatusDto {
  @IsNotEmpty()
  @IsString()
  @IsIn(['SEND', 'RETURN'])
  action: string;

  @IsNotEmpty()
  @IsString()
  @IsIn(['ADMIN', 'PARTNER', 'USER', 'COURIER'])
  rule: string;

  @IsNotEmpty()
  @IsString()
  @IsIn(['SINGLE', 'BULK'])
  type: string;
}
