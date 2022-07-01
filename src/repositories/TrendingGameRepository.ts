import db from "../config/DbConnection";
import {Repository} from "sequelize-typescript";
import {TrendingGame} from "../models/TrendingGame";

const trendingGameRepository:Repository<TrendingGame> = db.sequelize.getRepository(TrendingGame);

export default trendingGameRepository;