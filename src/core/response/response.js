export default function response(res, data, message) {
  if (!res) {
    throw new Error('Missing res object');
  }

  const response = {
    status: 200,
    data
  };

  if (message && message.length) {
    response.message = message;
  }

  res.send(response);
};
