import {
	Model, Table, Column, DataType, Index, Sequelize, ForeignKey 
} from "sequelize-typescript";

export interface productsAttributes {
    id?: number;
    title: string;
    description: string;
    price: string;
    stock: number;
    description_short?: string;
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
    	price!: string;

    @Column({
    	type: DataType.INTEGER 
    })
    	stock!: number;

    @Column({
    	allowNull: true,
    	type: DataType.STRING(255) 
    })
    	description_short?: string;

}