import db from "../config/DbConnection";
import {Game} from "../models/Game";
import {Repository} from "sequelize-typescript";

const gameRepository:Repository<Game> = db.sequelize.getRepository(Game);

export default gameRepository;
