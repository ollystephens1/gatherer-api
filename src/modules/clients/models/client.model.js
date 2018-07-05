import mongoose from 'mongoose';

const clientSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true
		},
		description: {
			type: String
		},
		users: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'User'
			}
		],
		createdBy: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User'
		},
		updatedBy: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User'
		}
	},
	{ timestamps: true, toJSON: { virtuals: true } }
);

export default mongoose.model('Client', clientSchema);
