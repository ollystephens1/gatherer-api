import mongoose from 'mongoose';
const Client = mongoose.model('Client');

export default {
	find,
	findOne,
	add,
	update,
	remove
};

function find(query = {}) {
	return Client.find(query);
}

function findOne(id) {
	return Client.findById(id);
}

function add(post = {}) {
	const newClient = new Client(post);
	return newClient.save();
}

function update(post = {}) {
	const client = new Client(post);
	return Client.findOneAndUpdate({ _id: client._id }, client, { new: true });
}

function remove(id) {
	if (!id) {
		return Promise.reject(Error('No ID specified'));
	}

	return Client.remove({ _id: id });
}
