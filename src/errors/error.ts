import HttpError from './HttpError';

export class UnauthorizedError extends HttpError {
    constructor(message: string = 'Unauthorized') {
        super(message, 401);
    }
}

export class ForbiddenError extends HttpError {
    constructor(message: string = 'Forbidden') {
        super(message, 403);
    }
}

export class NotFoundError extends HttpError {
    constructor(message: string = 'Not Found') {
        super(message, 404);
    }
}

export class BadRequestError extends HttpError {
    constructor(message: string = 'Bad Request') {
        super(message, 400);
    }
}

export class ConflictError extends HttpError {
    constructor(message: string = 'Conflict') {
        super(message, 409);
    }
}

export class InternalServerError extends HttpError {
    constructor(message: string = 'Internal Server Error') {
        super(message, 500);
    }
}

export class ServiceUnavailableError extends HttpError {
    constructor(message: string = 'Service Unavailable') {
        super(message, 503);
    }
}

export class ValidationError extends HttpError {
    constructor(message: string = 'Validation Error') {
        super(message, 422);
    }
}
