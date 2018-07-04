import projectService from '../services/projects.service';

export default {
	find,
	findOne,
	add,
	update,
	remove
};

/**
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
function find(req, res, next) {
	projectService
		.find(req.query)
		.then(projects => res.json(projects))
		.catch(next);
}

/**
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
function findOne(req, res, next) {
	projectService
		.findOne(req.params.id)
		.then(project => res.json(project))
		.catch(next);
}

/**
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
function add(req, res, next) {
	projectService
		.add(req.body)
		.then(project => res.json(project))
		.catch(next);
}

/**
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
function update(req, res, next) {
	projectService
		.update(req.body)
		.then(project => res.json(project))
		.catch(next);
}

/**
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
function remove(req, res, next) {
	projectService
		.remove(req.params.id)
		.then(result => res.json(result))
		.catch(next);
}
