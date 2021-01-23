import Database from './bootstrap/database.bootstrap';
import Server from './bootstrap/server.bootstrap';
import app from './app';

const start = async () => {
	const server = new Server(app);
	const database = new Database();
	try {
		await server.initialize();
		await database.initialize();
	} catch (error) {
		console.error(error);
	}
};

start();
