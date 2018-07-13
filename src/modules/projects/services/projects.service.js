import mongoose from 'mongoose';
const Project = mongoose.model('Project');

export default {
	find,
	findOne,
	add,
	update,
	remove
};

function find(query = {}) {
	return Project.find(query).populate('client requirements');
}

function findOne(id) {
	return Project.findById(id).populate('client requirements');
}

function add(post = {}) {
	const project = new Project(post);
	return project.save();
}

function update(post = {}) {
  const project = new Project(post);
	return Project.findOneAndUpdate({ _id: project._id }, project, { new: true }).populate('client requirements');
}

function remove(id) {
	if (!id) {
		return Promise.reject(Error('No ID specified'));
	}

	return Project.remove({ _id: id });
}
