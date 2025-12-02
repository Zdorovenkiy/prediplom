import {
	Model, Table, Column, DataType, Index, Sequelize, ForeignKey 
} from "sequelize-typescript";

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

    @Column({
    	type: DataType.INTEGER 
    })
    	order_id!: number;

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

}