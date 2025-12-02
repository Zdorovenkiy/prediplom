import {
	Model, Table, Column, DataType, Index, Sequelize, ForeignKey 
} from "sequelize-typescript";

export interface reviewsAttributes {
    id?: number;
    product_id: number;
    user_id: number;
    rating?: number;
    text?: string;
}

@Table({
	tableName: "reviews",
	timestamps: false 
})
export class reviews extends Model<reviewsAttributes, reviewsAttributes> implements reviewsAttributes {

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
    	type: DataType.INTEGER 
    })
    	user_id!: number;

    @Column({
    	type: DataType.INTEGER,
    	defaultValue: "0" 
    })
    	rating?: number;

    @Column({
    	allowNull: true,
    	type: DataType.STRING(255) 
    })
    	text?: string;

}