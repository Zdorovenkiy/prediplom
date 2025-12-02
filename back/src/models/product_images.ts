import {
	Model, Table, Column, DataType, Index, Sequelize, ForeignKey 
} from "sequelize-typescript";

export interface product_imagesAttributes {
    id?: number;
    product_id: number;
    image: string;
}

@Table({
	tableName: "product_images",
	timestamps: false 
})
export class product_images extends Model<product_imagesAttributes, product_imagesAttributes> implements product_imagesAttributes {

    @Column({
    	primaryKey: true,
    	autoIncrement: true,
    	type: DataType.INTEGER 
    })
    	declare id?: number;

    @Column({
    	type: DataType.INTEGER 
    })
    	product_id!: number;

    @Column({
    	type: DataType.STRING(255) 
    })
    	image!: string;

}