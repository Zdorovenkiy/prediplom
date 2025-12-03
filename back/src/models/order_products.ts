import {
	Model, Table, Column, DataType, Index, Sequelize, ForeignKey, 
    BelongsTo
} from "sequelize-typescript";
import { orders } from "./orders";
import { products } from "./products";

export interface order_productsAttributes {
    id?: number;
    order_id: number;
    product_id: number;
    quantity: number;
    price: string;
}

@Table({
	tableName: "order_products",
	timestamps: false 
})
export class order_products extends Model<order_productsAttributes, order_productsAttributes> implements order_productsAttributes {

    @Column({
    	primaryKey: true,
    	autoIncrement: true,
    	type: DataType.INTEGER 
    })
    	declare id?: number;

    @ForeignKey(() => orders)
    @Column({
    	type: DataType.INTEGER 
    })
    	order_id!: number;

    @ForeignKey(() => products)
    @Column({
    	type: DataType.INTEGER 
    })
    	product_id!: number;

    @Column({
    	type: DataType.INTEGER 
    })
    	quantity!: number;

    @Column({
    	type: DataType.DECIMAL(10,2) 
    })
    	price!: string;

    @BelongsTo(() => orders)
    order!: orders;

    @BelongsTo(() => products)
    product!: products;

}