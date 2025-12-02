import {
    Model, Table, Column, DataType
} from "sequelize-typescript";

export interface news_imagesAttributes {
    id?: number;
    name: string;
    image: string;
}

@Table({
    tableName: "news_images",
    timestamps: false 
})
export class news_images extends Model<news_imagesAttributes, news_imagesAttributes> implements news_imagesAttributes {

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
        type: DataType.STRING(255) 
    })
        image!: string;

}