/**
 * Use-full ready to use mongodb collection model.
 * The model assumes that a middleware has already setted the res.locals.db
 */
// import { ObjectID } from 'mongodb';

// const filterId = id => ({ _id: new ObjectID(id) });
// const reject404 = () => {
//   const err = new Error('Not Found');
//   err.status = 404;
//   return Promise.reject(err);
// };

// export default class {
//   constructor(res, collectionName) {
//     this.collection = res.locals.db.collection(collectionName);
//   }
//   count(filters) {
//     return this.collection.count(filters);
//   }
//   find(filters, limit, page) {
//     const skip = (page * limit) - limit;
//     return this.collection.find(filters).skip(skip).limit(limit);
//   }
//   findOne(id) {
//     return this.collection.findOne(filterId(id))
//       .then(doc => (doc || reject404()));
//   }
//   insertOne(body) {
//     return this.collection.insertOne(body);
//   }
//   updateOne(id, body) {
//     return this.collection.findOneAndUpdate(filterId(id), { $set: body })
//       .then(({ value }) => value || reject404());
//   }
//   deleteOne(id) {
//     return this.collection.findOneAndDelete(filterId(id))
//       .then(({ value }) => value || reject404());
//   }
// }
