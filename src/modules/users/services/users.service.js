import mongoose from 'mongoose';
const User = mongoose.model('User');

export default {
	find,
	findOne,
	add,
	update,
	remove
};

function find(query = {}) {
	return User.find(query, { password: 0 });
}

function findOne(id) {
	return User.findById(id, { password: 0 });
}

function add(post = {}) {
  const user = new User(post);

  if (user.password) {
    user.setPassword(user.password);
  }

	return user.save();
}

function update(post = {}) {
	const user = new User(post);
	return User.findOneAndUpdate({ _id: user._id }, user, {
		new: true
	});
}

function remove(id) {
	if (!id) {
		return Promise.reject(Error('No ID specified'));
	}

	return User.remove({ _id: id });
}
