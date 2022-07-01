import express, {Request, Response} from "express";
import {body} from 'express-validator';
import {GameService} from "../services/GameService";
import {validateRequest} from "../middlewares/ValidateRequest";
import gameRepository from "../repositories/GameRepository";

const router = express.Router();

const  gameService = new GameService(gameRepository)

router.post("/api/games/register", [
    body("title")
        .notEmpty()
        .withMessage("Title is required")
], validateRequest, async (req: Request, res: Response) => {
    const {title} = req.body;
    const game  = await gameService.createGame(title);
    res.status(201).send({game});
});

router.put("/api/games/update", [
    body("id")
        .notEmpty()
        .withMessage("id is required"),
    body("likes")
        .optional()
        .isInt({gt: -1})
        .withMessage("likes must be a non-negative integer"),
    body("plays")
        .optional()
        .isInt({gt: -1})
        .withMessage("plays must be a non-negative integer")
],validateRequest, async (req: Request, res: Response) => {
    const {id, likes, plays} = req.body;
    const game  = await gameService.updateGameLikesAndPlays(id, likes, plays);
    res.status(200).send({game});
});

export {router as GameController};