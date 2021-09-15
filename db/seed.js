const { client, createUser, getAllUsers } = require("./index");

async function createInitialUsers() {
	try {
		console.log("Start of User Creation");

		const albert = await createUser({
			username: "albert",
			password: "bertie99",
		});

		const sandra = await createUser({
			username: "sandra",
			password: "2sandy4me",
		});

		const glamgal = await createUser({
			username: "glamgal",
			password: "soglam",
		});

		// console.log(albert);

		console.log("User Creation Finished.");
	} catch (error) {
		console.log("User Creation Error!");
		throw error;
	}
}

//Call a Q to Drop all Tables.
async function dropTables() {
	try {
		console.log("Starting to drop tables.");

		await client.query(`
		DROP TABLE IF EXISTS users;
		`);

		console.log("Finished dropping tables.");
	} catch (error) {
		console.log("Error dropping tables.");
		throw error;
	}
}

//Create all the Tables.
async function createTables() {
	try {
		console.log("Start of Building Tables.");

		await client.query(`
		CREATE TABLE users (
			id SERIAL PRIMARY KEY, 
			username varchar(255) UNIQUE NOT NULL,
			password varchar(255) NOT NULL
		)
		`);

		console.log("Finished Building Tables.");
	} catch (error) {
		console.log("Error in Building Tables.");
		throw error;
	}
}

async function rebuildDB() {
	try {
		client.connect();

		await dropTables();
		await createTables();
		await createInitialUsers();
	} catch (error) {
		throw error;
	}
}

async function testDB() {
	try {
		console.log("Starting to test DB.");

		const users = await getAllUsers();
		console.log("getAllUsers:", users);

		console.log("Finished testing DB.");
	} catch (error) {
		console.error("Error testing DB.");
		throw error;
	}
}

rebuildDB()
	.then(testDB)
	.catch(console.error)
	.finally(() => client.end());
