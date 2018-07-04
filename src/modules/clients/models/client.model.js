import mongoose from 'mongoose';

const clientSchema = new mongoose.Schema(
	{
		name: { type: String, required: true },
		description: { type: String }
	},
	{ timestamps: true, toJSON: { virtuals: true } }
);

export default mongoose.model('Client', clientSchema);
