import { DatabaseRepository } from './../interfaces/database.interface';
import mongoose from 'mongoose';
import yenv from 'yenv';

const env = yenv();
export default class Database implements DatabaseRepository {
	async initialize(): Promise<any> {
		const promiseInitialize = new Promise((resolve, reject) => {
			const conectionString = `
      mongodb+srv://${env.DATABASE.MONGO.USER}:${env.DATABASE.MONGO.PASS}@${env.DATABASE.MONGO.HOST}/${env.DATABASE.MONGO.DB}`;

			const options = {
				useNewUrlParser: true,
				useCreateIndex: true,
				useUnifiedTopology: true,
				useFindAndModify: true,
				poolSize: 10,
			};

			const callback = (error: any) => {
				if (error) reject(error);
				else {
					console.log('DB connection successful');
					resolve('DB connection successful');
				}
			};

			mongoose.connect(conectionString, options, callback);
		});

		await promiseInitialize;
	}
	disconnect(): void {
		try {
			mongoose.disconnect();
		} catch (error) {
			console.error('DB connection error');
		}
	}
}
