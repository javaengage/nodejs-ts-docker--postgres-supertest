import {Game} from "../models/Game";
import {Repository} from "sequelize-typescript";
import {BadRequestError} from "../errors/BadRequestError";

export class GameService {
    private gameRepository: Repository<Game>;

    constructor(gameRepository: Repository<Game>) {
        this.gameRepository = gameRepository;
    }

    public async createGame(title: string): Promise<Game> {
        let game =  await this.gameRepository.findOne({where: {title: title}});
        if(!game){
            game =  await this.gameRepository.create({title: title});
            return game;
        }
        throw new BadRequestError("A game with this title already exists");

    }

    public async updateGameLikesAndPlays(id: string, likes?: number, plays?: number): Promise<Game> {
        if(!likes && !plays){
            throw new BadRequestError("Either likes or plays must be provided");
        }

        const game =  await this.gameRepository.findOne({where: {id: id}});

        if(game){
            game.numberOfLikes = likes || game.numberOfLikes;
            game.numberOfPlays = plays || game.numberOfPlays;
            await game.save();
            return game;
        }
        throw new BadRequestError("A game with this id doesn't exist");
    }

    public async getAllGames() : Promise<Game[]> {
        return await this.gameRepository.findAll();
    }
}