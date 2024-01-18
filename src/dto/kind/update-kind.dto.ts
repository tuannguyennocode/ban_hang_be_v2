import { PartialType } from '@nestjs/swagger';
import { CreateKindDto } from './create-kind.dto';

export class UpdateKindDto extends PartialType(CreateKindDto) {}
