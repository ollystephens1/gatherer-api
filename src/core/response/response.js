import CODES from './codes.json';

const setStatusCode = (success, code) => success ? code || 200 : code || 500;

const setDefaultMessage = (success, code) => {
  const codes = success ? CODES.success : CODES.error;
  return codes[code] || codes.default;
};

export default (res, err) => {
  let success = true;

  if (!res) {
    throw new Error('Missing res object');
  }

  return (data, { code, message } = {}) => {
    if (err) {
      success = false;
    }

    const status = setStatusCode(success, code);
    message = message || setDefaultMessage(success, status);

    res.status(status).send({ status, data, message });
  };
};
