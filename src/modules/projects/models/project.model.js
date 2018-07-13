import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema(
	{
		name: { type: String, required: true },
    description: { type: String },
    requirements: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Requirement'
      }
    ],
    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Client'
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

export default mongoose.model('Project', projectSchema);
