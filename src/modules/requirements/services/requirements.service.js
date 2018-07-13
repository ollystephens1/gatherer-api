import mongoose from 'mongoose';
const Requirement = mongoose.model('Requirement');
const Project = mongoose.model('Project');

export default {
	find,
	findOne,
	add,
	update,
	remove
};

function find(query = {}) {
	return Requirement.find(query);
}

function findOne(id) {
	return Requirement.findById(id);
}

function add(post = {}) {
	const requirement = new Requirement(post);
	return requirement.save().then(newRequirement => {
    const projectId = newRequirement.project;

    return Project
      .findById(projectId)
      .then(project => {
        project.requirements.push(newRequirement._id);
        return project.save().then(() => {
          console.log(newRequirement);
          return newRequirement;
        });
      });
  });
}

function update(post = {}) {
	const requirement = new Requirement(post);
	return Requirement.findOneAndUpdate({ _id: requirement._id }, requirement, {
		new: true
	});
}

function remove(id) {
	if (!id) {
		return Promise.reject(Error('No ID specified'));
	}

	return Requirement.remove({ _id: id });
}
