import requirementsService from '../services/requirements.service';

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
		.then(requirements => res.json(requirements))
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
		.then(requirement => res.json(requirement))
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
		.then(requirement => res.json(requirement))
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
		.then(requirement => res.json(requirement))
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
		.then(result => res.json(result))
		.catch(next);
}
