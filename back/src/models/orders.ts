import {
	Model, Table, Column, DataType, Index, Sequelize, ForeignKey, 
    BelongsTo,
    HasMany
} from "sequelize-typescript";
import { users } from "./users";
import { order_products } from "./order_products";

export interface ordersAttributes {
    id?: number;
    user_id: number;
    total: string;
    is_payed?: boolean;
}

@Table({
	tableName: "orders",
	timestamps: false 
})
export class orders extends Model<ordersAttributes, ordersAttributes> implements ordersAttributes {

    @Column({
    	primaryKey: true,
    	autoIncrement: true,
    	type: DataType.INTEGER 
    })
    	declare id?: number;

    @ForeignKey(() => users)
    @Column({
    	type: DataType.INTEGER 
    })
    	user_id!: number;

    @Column({
    	type: DataType.DECIMAL(10,2) 
    })
    	total!: string;

    @Column({
    	type: DataType.TINYINT,
    	defaultValue: "0" 
    })
    	is_payed?: boolean;

    @BelongsTo(() => users)
        user!: users;

    @HasMany(() => order_products)
        order_products!: order_products[];
}