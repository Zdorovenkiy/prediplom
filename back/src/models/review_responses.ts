import {
	Model, Table, Column, DataType, Index, Sequelize, ForeignKey 
} from "sequelize-typescript";

export interface review_responsesAttributes {
    id?: number;
    review_id: number;
    user_id: number;
    text: string;
    generated_by_ai?: number;
}

@Table({
	tableName: "review_responses",
	timestamps: false 
})
export class review_responses extends Model<review_responsesAttributes, review_responsesAttributes> implements review_responsesAttributes {

    @Column({
    	primaryKey: true,
        autoIncrement: true,
    	type: DataType.INTEGER 
    })
    	declare id?: number;

    @Column({
    	type: DataType.INTEGER 
    })
    	review_id!: number;

    @Column({
    	type: DataType.INTEGER 
    })
    	user_id!: number;

    @Column({
    	type: DataType.STRING(255) 
    })
    	text!: string;

    @Column({
    	type: DataType.TINYINT,
    	defaultValue: "0" 
    })
    	generated_by_ai?: number;

}