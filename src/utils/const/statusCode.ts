const statusCodes = {
    SUCCESS: 200,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    SERVER_ERROR: 500
};

const statusMessages = {
    [statusCodes.SUCCESS]: "Success",
    [statusCodes.BAD_REQUEST]: "Bad Request",
    [statusCodes.UNAUTHORIZED]: "Unauthorized",
    [statusCodes.FORBIDDEN]: "Forbidden",
    [statusCodes.NOT_FOUND]: "Not Found",
    [statusCodes.SERVER_ERROR]: "Internal Server Error"
};

export { statusCodes, statusMessages };
