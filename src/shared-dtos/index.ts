import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { IsInteger } from 'src/decorators/validator/integer.decorator';

export class RelationalDTO {
  @ApiProperty({ example: 1 })
  @IsNotEmpty()
  @IsInteger()
  id: number;
}
