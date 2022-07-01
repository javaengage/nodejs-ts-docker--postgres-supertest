import express from 'express';
import 'express-async-errors';
import {json} from 'body-parser';
import {GameController} from "./controllers/GameController";
import {NotFoundError} from "./errors/NotFoundError";
import {errorHandler} from "./middlewares/ErrorHandlers";
import {TrendingGameController} from "./controllers/TrendingGameController";

const app =  express();
app.use(json());

app.use(GameController);
app.use(TrendingGameController);

app.all("*", async () => {
   throw new NotFoundError();
});

app.use(errorHandler);

export { app };