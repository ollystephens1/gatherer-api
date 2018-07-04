import activitiesService from '../services/activities.service';

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
	activitiesService
		.find(req.query)
		.then(activities => res.json(activities))
		.catch(next);
}

/**
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
function findOne(req, res, next) {
	activitiesService
		.findOne(req.params.id)
		.then(activity => res.json(activity))
		.catch(next);
}

/**
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
function add(req, res, next) {
	activitiesService
		.add(req.body)
		.then(activity => res.json(activity))
		.catch(next);
}

/**
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
function update(req, res, next) {
	activitiesService
		.update(req.body)
		.then(activity => res.json(activity))
		.catch(next);
}

/**
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
function remove(req, res, next) {
	activitiesService
		.remove(req.params.id)
		.then(result => res.json(result))
		.catch(next);
}
