import projectService from '../services/projects.service';
import response from '@core/response/response';

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
		.then(projects => response(res, projects))
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
		.then(project => response(res, project))
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
		.then(project => response(res, project, 'Project created successfully'))
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
		.then(project => response(res, project, 'Project updated successfully'))
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
		.then(result => response(res, result, 'Project deleted successfully'))
		.catch(next);
}
