import { Transform, TransformFnParams } from 'class-transformer';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class RequestParamDto {
  @IsNotEmpty()
  @IsNumber({}, { message: 'Id must be a number' })
  @Transform((params: TransformFnParams) => parseInt(params.value, 10))
  id: number;
}
