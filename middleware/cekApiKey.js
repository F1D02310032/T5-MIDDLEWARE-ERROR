const AppError = require('../utils/AppError');

exports.cekApiKey = (req, res, next) => {
  const expectedApiKey = process.env.API_KEY;
  const providedApiKey = req.get('x-api-key');

  if (!expectedApiKey || providedApiKey !== expectedApiKey) {
    return next(new AppError(401, 'API key tidak valid atau tidak tersedia', 'UNAUTHORIZED'));
  }
  next();
};
