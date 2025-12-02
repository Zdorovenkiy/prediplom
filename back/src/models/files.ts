import {
	Model, Table, Column, DataType, Index, Sequelize, ForeignKey 
} from "sequelize-typescript";

export interface filesAttributes {
    id?: number;
    path: string;
    name: string;
}

@Table({
	tableName: "files",
	timestamps: false 
})
export class files extends Model<filesAttributes, filesAttributes> implements filesAttributes {

    @Column({
    	primaryKey: true,
    	autoIncrement: true,
    	type: DataType.INTEGER 
    })
    	declare id?: number;

    @Column({
    	type: DataType.STRING(255) 
    })
    	path!: string;

    @Column({
    	type: DataType.STRING(255) 
    })
    	name!: string;

}