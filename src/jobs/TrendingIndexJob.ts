import { CronJob } from 'cron';
import {TrendingGameService} from "../services/TrendingGameService";
import {GameService} from "../services/GameService";
import gameRepository from "../repositories/GameRepository";
import trendingGameRepository from "../repositories/TrendingGameRepository";

export class TrendingIndexJob {
    private cronJob: CronJob;
    private trendingGameService: TrendingGameService;

    constructor() {
        this.trendingGameService = new TrendingGameService(new GameService(gameRepository),
            trendingGameRepository);

        // Cronjob figured to run at 12 AM every day
        this.cronJob = new CronJob('0 0 * * * ', async () => {
           await this.trendingGameService.calculateTrendingIndex();
        }, null, false);
    }

    public start() {
        if(!this.cronJob.running){
            console.log("starting TrendingIndexJob ...");
            this.cronJob.start();
        }
    }

    public stop() {
        if(this.cronJob.running){
            this.cronJob.stop();
        }
    }
}