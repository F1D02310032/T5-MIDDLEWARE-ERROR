class AppError extends Error {
  constructor(statusCode, message, kode) {
    super(message);
    this.statusCode = statusCode;
    this.kode = kode;
  }
}

module.exports = AppError;
