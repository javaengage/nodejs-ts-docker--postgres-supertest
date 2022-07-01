// integration tests

import request from 'supertest';
import {app} from "../../app";
import {Game} from "../../models/Game";

const gameTitle = "Metal Gear Solid V";
let game: Game;
describe("Game api integration tests" , () => {
    it('returns a 200 on successful registration of a game', async () => {
        const response = await request(app)
            .post("/api/games/register")
            .send({
                "title": gameTitle
            })
            .expect(201)

        expect(response.body.game).toBeDefined();
        game = response.body.game;
    });

    it('returns a 400 when trying to register a game with an existing title', async () => {
        const response = await request(app)
            .post("/api/games/register")
            .send({
                "title": gameTitle
            })
            .expect(400)
    });

    it('returns a 200 on successful update of a game', async () => {
        const response = await request(app)
            .put("/api/games/update")
            .send({
                "id": game.id,
                "likes": 10,
                "plays": 15
            })
            .expect(200)

        expect(response.body.game).toBeDefined();
        expect(response.body.game.numberOfLikes).toBe(10);
        expect(response.body.game.numberOfPlays).toBe(15);
    });

    it("returns a 200 on update of a game's number of likes only", async () => {
        const response = await request(app)
            .put("/api/games/update")
            .send({
                "id": game.id,
                "likes": 20,
            })
            .expect(200)

        expect(response.body.game).toBeDefined();
        expect(response.body.game.numberOfLikes).toBe(20);
    });

    it("returns a 200 on update of a game's number of plays only", async () => {
        const response = await request(app)
            .put("/api/games/update")
            .send({
                "id": game.id,
                "plays": 25,
            })
            .expect(200)

        expect(response.body.game).toBeDefined();
        expect(response.body.game.numberOfPlays).toBe(25);
    });

    it("returns a 400 on update of a game without number of likes and plays", async () => {
        const response = await request(app)
            .put("/api/games/update")
            .send({
                "id": game.id,
            })
            .expect(400)
    });
});
