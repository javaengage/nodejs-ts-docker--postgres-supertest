# Starting the service

Run `docker-compose up`
This would start the service's docker container, install the necessary dependencies`and start the database containers the service depends on.
This would also initialize the development database and seed it with data.

#Running Tests

Run `docker-compose run app npm test`
This would spin up the service, connect to the integration test database and run all the integration tests.

#Tech Stack
- NodeJS
- TypeScript
- Postgres
- SuperTest

#Sample Requests

- Register Game
```
POST http://localhost:3000/api/games/register
{
	"title": "Chaos Worlds 2"
}
```

- Update Game
```
PUT http://localhost:3000/api/games/update
{
	"id": "8abff99e-f14f-43a6-9e4e-41e397ed78ef",
	"plays": 20,
	"likes": 20
}
```

- Get Trending Games
```
GET http://localhost:3000/api/games/trending/3
```