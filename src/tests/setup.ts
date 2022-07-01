import db from "../config/DbConnection";

// set up the integration test database connection before any tests are run
// and delete all the data in the database tables
beforeAll(async () => {
    try{
        await db.sequelize.authenticate();
        console.log("connected to test database");

        await db.sequelize.truncate({cascade: true});
        console.log("truncated test database tables");

    } catch (e) {
        console.error("Unable to connect to test database");
        console.error(e);
    }
});

// close the connection to the database after all the tests have run
afterAll(async () => {
    await db.sequelize.close();
    console.log("closed connection to test database");
});