const AppError = require('../utils/AppError');

exports.notFound = (req, res, next) => {
  next(new AppError(404, 'Rute tidak ditemukan', 'ROUTE_NOT_FOUND'));
};

exports.errorHandler = (err, req, res, next) => {
  if (res.headersSent) return next(err);

  const status = Number.isInteger(err.statusCode) ? err.statusCode : 500;
  const isServerError = status >= 500;
  if (isServerError) {
    console.error(err);
  }

  res.status(status).json({
    error: {
      pesan: isServerError ? 'Terjadi kesalahan pada server' : err.message,
      kode: isServerError ? 'INTERNAL_SERVER_ERROR' : (err.kode || 'INTERNAL_SERVER_ERROR')
    }
  });
};
