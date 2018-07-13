import requirementsService from '../services/requirements.service';
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
	requirementsService
		.find(req.query)
		.then(requirements => response(res, requirements))
		.catch(next);
}

/**
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
function findOne(req, res, next) {
	requirementsService
		.findOne(req.params.id)
		.then(requirement => response(res, requirement))
		.catch(next);
}

/**
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
function add(req, res, next) {
	requirementsService
		.add(req.body)
		.then(requirement => response(res, requirement, 'Required created successfully'))
		.catch(next);
}

/**
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
function update(req, res, next) {
	requirementsService
		.update(req.body)
		.then(requirement => response(res, requirement, 'Requirement updated successfully'))
		.catch(next);
}

/**
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
function remove(req, res, next) {
	requirementsService
		.remove(req.params.id)
		.then(result => response(res, result, 'Requirement deleted successfully'))
		.catch(next);
}
