import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { BaseDto } from '../base.dto';

export class CreateProductDto extends BaseDto {
    @IsNotEmpty({ message: 'name cannot be null' })
    name: string;
    @IsNotEmpty({ message: 'kindId cannot be null' })
    kindId: string;

    description: string;

    @IsOptional()
    @IsNumber({}, { message: 'price must be a number' })
    price: number;

    size: string;

    color: string;

    material: string;

    image: string[];

    @IsOptional()
    @IsNumber({}, { message: 'quantity must be a number' })
    quantity: number;
}
