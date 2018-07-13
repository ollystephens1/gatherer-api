import clientService from '../services/client.service';
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
	clientService
		.find(req.query)
		.then(clients => response(res, clients))
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
		.then(client => response(res, client))
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
		.then(client => response(res, client, 'Client added successfully'))
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
		.then(client => response(res, client, 'Client updated successfully'))
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
		.then(result => response(res, req.params.id, 'Client deleted successfully'))
		.catch(next);
}
