import mongoose from 'mongoose';

const requirementSchema = new mongoose.Schema(
	{
		title: { type: String, required: true },
    description: { type: String },
    status: { type: Boolean, default: false },
    dueDate: { type: Date },
    project: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Project'
		},
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

export default mongoose.model('Requirement', requirementSchema);
