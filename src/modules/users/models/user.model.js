import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
	{
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    description: { type: String },
    password: { type: String, required: true },
    avatar: { type: String }
	},
	{ timestamps: true, toJSON: { virtuals: true } }
);

export default mongoose.model('User', userSchema);
