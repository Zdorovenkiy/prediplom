import {
	Model, Table, Column, DataType, Index, Sequelize, ForeignKey 
} from "sequelize-typescript";

export interface ordersAttributes {
    id?: number;
    user_id: number;
    total: string;
    is_payed?: number;
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
    	is_payed?: number;

}