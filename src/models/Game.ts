import {Table, Column, Model, IsUUID, PrimaryKey, DataType} from 'sequelize-typescript'
import {UUIDV4} from "sequelize";

@Table({
    tableName: "games",
})
export class Game extends Model {
    @IsUUID(4)
    @PrimaryKey
    @Column({
        defaultValue: UUIDV4
    })
    id: string

    @Column
    title: string

    @Column({
        field: "number_of_likes",
        defaultValue: 0
    })
    numberOfLikes: number

    @Column({
        field: "number_of_plays",
        defaultValue: 0
    })
    numberOfPlays: number

    @Column({
        field: "created_at",
        type: DataType.DATE(6),
        defaultValue: new Date()
    })
    createdAt: Date;

    @Column({
        field: "updated_at",
        type: DataType.DATE(6),
        defaultValue: new Date()
    })
    updatedAt: Date;

}