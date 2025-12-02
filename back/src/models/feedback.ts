import {
	Model, Table, Column, DataType
} from "sequelize-typescript";

export interface feedbackAttributes {
    id?: number;
    surname: string;
    name: string;
    email: string;
    title: string;
    message: string;
}

@Table({
	tableName: "feedback",
	timestamps: false 
})
export class feedbacks extends Model<feedbackAttributes, feedbackAttributes> implements feedbackAttributes {

    @Column({
    	primaryKey: true,
    	autoIncrement: true,
    	type: DataType.INTEGER 
    })
    	declare id?: number;

    @Column({
    	type: DataType.STRING(255) 
    })
    	surname!: string;

    @Column({
    	type: DataType.STRING(255) 
    })
    	name!: string;

    @Column({
    	type: DataType.STRING(255),
    })
    	email!: string;

    @Column({
    	type: DataType.STRING(255),
    })
    	title!: string;

    @Column({
    	type: DataType.STRING(255),
    })
    	message!: string;
}