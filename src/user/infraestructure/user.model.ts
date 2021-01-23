import mongoose, { Schema } from 'mongoose';

const schema: Schema = new Schema({
	name: {
		type: String,
		required: true,
		trim: true,
	},
	email: {
		type: String,
		required: true,
		trim: true,
	},
	password: {
		type: String,
		required: true,
		trim: true,
	},
	isActive: {
		type: Boolean,
		default: true,
	},
	refreshToken: {
		type: String,
		default: '',
	},
	roles: [
		{
			type: Schema.Types.ObjectId,
			ref: 'Role',
		},
	],
	photo: {
		type: String,
	},
});

export default mongoose.model('User', schema);
