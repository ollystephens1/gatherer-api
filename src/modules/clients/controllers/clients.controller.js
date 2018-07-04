import clientService from '../services/client.service';

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
	clientService
		.find(req.query)
		.then(clients => res.json(clients))
		.catch(next);
}

/**
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
function findOne(req, res, next) {
	clientService
		.findOne(req.params.id)
		.then(client => res.json(client))
		.catch(next);
}

/**
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
function add(req, res, next) {
	clientService
		.add(req.body)
		.then(client => res.json(client))
		.catch(next);
}

/**
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
function update(req, res, next) {
	clientService
		.update(req.body)
		.then(client => res.json(client))
		.catch(next);
}

/**
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
function remove(req, res, next) {
	clientService
		.remove(req.params.id)
		.then(result => res.json(result))
		.catch(next);
}
