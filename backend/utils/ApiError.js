/**
 * Lightweight error class carrying an HTTP status code alongside the message,
 * so controllers can `throw new ApiError(404, 'User not found')` and the
 * centralized error middleware knows exactly how to respond.
 */
class ApiError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}

export default ApiError;
