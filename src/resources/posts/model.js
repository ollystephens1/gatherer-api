import fetch from 'node-fetch';

const baseUrl = 'https://jsonplaceholder.typicode.com/posts';

export default {
  count() {
    return Promise.resolve(100);
  },
  find(filters, limit, page = 1) {
    return fetch(baseUrl)
      .then(res => res.json())
      .then((posts) => {
        const skip = (page * limit) - limit;
        return posts.slice(skip, skip + limit);
      });
  },
  findOne(id) {
    return fetch(`${baseUrl}/${id}`)
      .then(res => res.json());
  },
  insertOne(body) {
    const method = 'POST';
    return fetch(baseUrl, { method, body })
      .then(result => ({ insertedId: result.id }));
  },
  deleteOne(id) {
    const method = 'DELETE';
    return fetch(`${baseUrl}/${id}`, { method });
  },
  updateOne(id, body) {
    const method = 'PUT';
    return fetch(`${baseUrl}/${id}`, { method, body });
  }
};
