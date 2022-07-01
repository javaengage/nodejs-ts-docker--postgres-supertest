import {Repository} from "sequelize-typescript";
import {Game} from "../models/Game";
import {TrendingGame} from "../models/TrendingGame";
import {GameService} from "./GameService";
import gameRepository from "../repositories/GameRepository";

export class TrendingGameService{
    private gameService: GameService;
    private trendingGameRepository: Repository<TrendingGame>;

    private TREND_SCORE_PER_LIKE = 2;
    private TREND_SCORE_PER_PLAY = 4;

    constructor(gameService: GameService, trendingGameRepository: Repository<TrendingGame>) {
        this.gameService = gameService;
        this.trendingGameRepository = trendingGameRepository;
    }

    public async getTopTrendingGames(numberOfGames: number): Promise<Game[]> {
        const trendingGames = await this.trendingGameRepository.findAll(
            {
                include: [gameRepository],
                limit: numberOfGames,
                order: [
                    ["trendIndex", "DESC"]
                ]
            }
        );

        return trendingGames.map(trendingGame => {
           return trendingGame.game;
        });
    }

    /*
     A game's trend index is determined by the summation of
     the numberOfLikes * 2 and numberOfPlays * 4
     The higher the value of the summation the more trending the game is
     */
    public async calculateTrendingIndex() {
        console.log("calculating trend index...");
        const games = await this.gameService.getAllGames();
        games.map(async (game: Game) => {
            const trendIndex = (game.numberOfLikes * this.TREND_SCORE_PER_LIKE) +
                (game.numberOfPlays * this.TREND_SCORE_PER_PLAY);

            await this.createOrUpdateTrendingGame(game.id, trendIndex);
            console.log(`trend index for ${game.title} is ${trendIndex}`);
        });
    }

    private async createOrUpdateTrendingGame(gameId: string, trendIndex: number) {
        const trendingGame = await this.trendingGameRepository.findOne({where: {gameId: gameId}});

        if(trendingGame){
            trendingGame.trendIndex = trendIndex;
            await trendingGame.save();
        }
        else{
            await this.trendingGameRepository.create({gameId: gameId, trendIndex: trendIndex});
        }
    }

}