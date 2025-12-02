import {
	Model, Table, Column, DataType, Index, Sequelize, ForeignKey 
} from "sequelize-typescript";

export interface usersAttributes {
    id?: number;
    surname: string;
    name: string;
    patronymic?: string;
    email: string;
    password: string;
    role_id: number;
    phone: string;
}

@Table({
	tableName: "users",
	timestamps: false 
})
export class users extends Model<usersAttributes, usersAttributes> implements usersAttributes {

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
    	allowNull: true,
    	type: DataType.STRING(255) 
    })
    	patronymic?: string;

    @Column({
    	type: DataType.STRING(255) 
    })
    	email!: string;

    @Column({
    	type: DataType.STRING(255) 
    })
    	password!: string;

    @Column({
    	type: DataType.INTEGER 
    })
    	role_id!: number;

    @Column({
    	type: DataType.STRING(45) 
    })
    	phone!: string;

}