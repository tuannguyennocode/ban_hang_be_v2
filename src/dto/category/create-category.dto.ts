import { IsNotEmpty } from 'class-validator';
import { BaseDto } from '../base.dto';

export class CreateCategoryDto extends BaseDto {
    @IsNotEmpty({ message: 'name cannot be null' })
    name: string;
}
