import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/sequelize';
import { product_images, products } from 'src/models';

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
        return await this.currentModel.findAll({
            include: [
                {
                    model: product_images,
                    as: 'images',
                }
            ]
        });
    }

    async findOne(id: number) {
        return await this.currentModel.findOne({
            where: {
                id: id
            },
            include: [
                {
                    model: product_images,
                    as: 'images',
                }
            ]
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
            include: [
                {
                    model: product_images,
                    as: 'images',
                }
            ]
        });
    }
}
