import express, {Request, Response} from "express";
import {param} from 'express-validator';
import {GameService} from "../services/GameService";
import {validateRequest} from "../middlewares/ValidateRequest";
import {TrendingGameService} from "../services/TrendingGameService";
import gameRepository from "../repositories/GameRepository";
import trendingGameRepository from "../repositories/TrendingGameRepository";
const router = express.Router();

const gameService = new GameService(gameRepository)
const trendingGameService =  new TrendingGameService(gameService,trendingGameRepository);

router.get("/api/games/trending/:numberOfGames", [
    param("numberOfGames")
        .notEmpty()
        .withMessage("numberOfGames is required")
        .isInt({gt: 0})
        .withMessage("numberOfGames must be number greater than 0")
], validateRequest, async (req: Request, res: Response) => {
    const {numberOfGames} = req.params;
    const games  = await trendingGameService.getTopTrendingGames(parseInt(numberOfGames));
    res.status(200).send({games});
});

export {router as TrendingGameController};