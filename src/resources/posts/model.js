import fetch from 'node-fetch';

const baseUrl = 'https://jsonplaceholder.typicode.com/posts';

export default {
  find() {
    return fetch(baseUrl).then(res => res.json());
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
