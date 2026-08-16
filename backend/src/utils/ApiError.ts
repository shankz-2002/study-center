export class ApiError extends Error {
  statusCode: number;
  success: boolean;

  constructor(statusCode: number, message: string) {
    super(message);
    this.success = false;
    this.statusCode = statusCode;
  }
}
