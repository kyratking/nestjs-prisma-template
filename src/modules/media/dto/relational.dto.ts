import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { RelationalDTO } from 'src/shared-dtos';
import { MediaType } from '../types';

export class MediaWithType extends RelationalDTO {
  @ApiProperty({ enum: MediaType, example: MediaType.IMAGE })
  @IsNotEmpty()
  @IsEnum(MediaType)
  type: MediaType;
}
