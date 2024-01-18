import { BaseDto } from '../base.dto';
import { Category } from '../../schema/category.schema';

export class CreateKindDto extends BaseDto {
    id: string;
    name: string;
    category: Category;
}
