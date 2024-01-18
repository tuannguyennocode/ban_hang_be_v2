import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';

import { Kind } from '../schema/kind.schema';
import { InjectModel } from '@nestjs/mongoose';
import { CreateKindDto } from '../dto/kind/create-kind.dto';

@Injectable()
export class KindModel {
    constructor(@InjectModel(Kind.name) private readonly kindModel: Model<Kind>) {}

    async create(createKindDto: CreateKindDto) {
        const kind = this.kindModel.create(createKindDto);
        return (await kind).save();
    }

    async findKindById(id: string): Promise<Kind> {
        return await this.kindModel.findById(id);
    }

    async updateKind(id: string, kind: Kind): Promise<Kind> {
        return await this.kindModel.findByIdAndUpdate(id, kind, { new: true });
    }

    async deleteKind(id: string): Promise<Kind> {
        return await this.kindModel.findByIdAndDelete(id);
    }
}