import {
	Model, Table, Column, DataType, Index, Sequelize, ForeignKey 
} from "sequelize-typescript";

export interface rolesAttributes {
    id?: number;
    name: string;
    permissions?: string;
}

@Table({
	tableName: "roles",
	timestamps: false 
})
export class roles extends Model<rolesAttributes, rolesAttributes> implements rolesAttributes {

    @Column({
    	primaryKey: true,
    	autoIncrement: true,
    	type: DataType.INTEGER 
    })
    	declare id?: number;

    @Column({
    	type: DataType.STRING(255) 
    })
    	name!: string;

    @Column({
    	allowNull: true,
    	type: DataType.STRING(255) 
    })
    	permissions?: string;

}