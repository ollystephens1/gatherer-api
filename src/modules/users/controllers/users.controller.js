import usersService from '../services/users.service';

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
	usersService
		.find(req.query)
		.then(users => res.json(users))
		.catch(next);
}

/**
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
function findOne(req, res, next) {
	usersService
		.findOne(req.params.id)
		.then(user => res.json(user))
		.catch(next);
}

/**
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
function add(req, res, next) {
	usersService
		.add(req.body)
		.then(user => res.json(user))
		.catch(next);
}

/**
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
function update(req, res, next) {
	usersService
		.update(req.body)
		.then(user => res.json(user))
		.catch(next);
}

/**
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
function remove(req, res, next) {
	usersService
		.remove(req.params.id)
		.then(result => res.json(result))
		.catch(next);
}
