import { IsArray, IsOptional } from 'class-validator';
import { StatusDto } from './status.dto';

export class PathDto extends StatusDto {
  @IsOptional()
  @IsArray()
  status: number[];
}
