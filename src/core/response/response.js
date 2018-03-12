import CODES from './codes.json';

const setStatusCode = (success, code) => {
  return success ? code || 200 : code || 500;
};

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

    const statusCode = setStatusCode(success, code);

    res.status(statusCode).send({
      status: statusCode,
      message: message || setDefaultMessage(success, statusCode),
      data
    });
  };
};
