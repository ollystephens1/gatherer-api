import mongoose from 'mongoose';
const Activity = mongoose.model('Activity');

export default {
	find,
	findOne,
	add,
	update,
	remove
};

function find(query = {}) {
	return Activity.find(query);
}

function findOne(id) {
	return Activity.findById(id);
}

function add(post = {}) {
	const activity = new Activity(post);
	return activity.save();
}

function update(post = {}) {
	const activity = new Activity(post);
	return Activity.findOneAndUpdate({ _id: activity._id }, activity, {
		new: true
	});
}

function remove(id) {
	if (!id) {
		return Promise.reject(Error('No ID specified'));
	}

	return Activity.remove({ _id: id });
}
