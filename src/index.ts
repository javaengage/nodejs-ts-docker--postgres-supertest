import { app } from './app';
import db from './config/DbConnection';
import {TrendingIndexJob} from "./jobs/TrendingIndexJob";

const start = async () => {
    try{
        await db.sequelize.authenticate();

        const PORT = process.env.NODE_DOCKER_PORT || 3000;
        app.listen(PORT, () => {
            console.log(`Service listening on port ${PORT}!!`);
            const trendingIndexJob =  new TrendingIndexJob();
            trendingIndexJob.start();
        });

    } catch (e) {
        console.error("Unable to connect to database");
        console.error(e);
    }
};

start();

