import { IsNotEmpty } from 'class-validator';
import { BaseDto } from '../base.dto';

export class CreateKindDto extends BaseDto {
    @IsNotEmpty({ message: 'name cannot be null' })
    name: string;

    @IsNotEmpty({ message: 'categoryId cannot be null' })
    categoryId: string;
}
