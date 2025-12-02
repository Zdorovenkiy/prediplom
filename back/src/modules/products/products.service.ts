import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/sequelize';
import { products } from 'src/models';

@Injectable()
export class ProductsService {
    constructor(
        @InjectModel(products)
        private currentModel: typeof products,
    ) {}

    async create(createProductDto: CreateProductDto) {
        return await this.currentModel.create(createProductDto);
    }

    async findAll() {
        return await this.currentModel.findAll();
    }

    async findOne(id: number) {
        return await this.currentModel.findOne({
            where: {
                id: id
            }
        });
    }

    async update(id: number, updateProductDto: UpdateProductDto) {
        return await this.currentModel.update(updateProductDto, {
            where: {
                id: id
            }
        });
    }

    async remove(id: number) {
        return await this.currentModel.destroy({
            where: {
                id: id
            }
        });
    }

    async findDiscount() {
        return await this.currentModel.findAll({
            limit: 3,
            where: {
                is_discount: true
            },
            order: [['id', 'DESC']],
        });
    }
}
