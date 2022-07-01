import {Table, Column, Model, IsUUID, PrimaryKey, DataType, ForeignKey, HasOne, BelongsTo} from 'sequelize-typescript'
import {UUIDV4} from "sequelize";
import {Game} from "./Game";

@Table({
    tableName: "trending_games",
})
export class TrendingGame extends Model {
    @IsUUID(4)
    @PrimaryKey
    @Column({
        defaultValue: UUIDV4
    })
    id: string

    @ForeignKey(() => Game)
    @Column({
        field: "game_id"
    })
    gameId: string

    @Column({
        field: "trend_index",
        type: DataType.INTEGER
    })
    trendIndex: number

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

    @BelongsTo(() => Game)
    game: Game;

}