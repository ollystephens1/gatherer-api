import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema(
	{
		name: { type: String, required: true },
		description: { type: String }
	},
	{ timestamps: true, toJSON: { virtuals: true } }
);

export default mongoose.model('Project', projectSchema);
