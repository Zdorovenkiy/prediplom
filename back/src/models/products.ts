import {
	Model, Table, Column, DataType, Index, Sequelize, ForeignKey, 
    HasMany
} from "sequelize-typescript";
import { product_images } from "./product_images";

export interface productsAttributes {
    id?: number;
    title: string;
    description: string;
    price: number;
    stock: number;
    description_short?: string;
    is_discount: boolean;
}

@Table({
	tableName: "products",
	timestamps: false 
})
export class products extends Model<productsAttributes, productsAttributes> implements productsAttributes {

    @Column({
    	primaryKey: true,
    	autoIncrement: true,
    	type: DataType.INTEGER 
    })
    	declare id?: number;

    @Column({
    	type: DataType.STRING(255) 
    })
    	title!: string;

    @Column({
    	type: DataType.STRING(255) 
    })
    	description!: string;

    @Column({
    	type: DataType.DECIMAL(10,2) 
    })
    	price!: number;

    @Column({
    	type: DataType.INTEGER 
    })
    	stock!: number;

    @Column({
    	allowNull: true,
    	type: DataType.STRING(255) 
    })
    	description_short?: string;

    @Column({
    	defaultValue: "0",
    	type: DataType.BOOLEAN
    })
    	is_discount: boolean;

    @HasMany(() => product_images)
        images!: product_images[];

}