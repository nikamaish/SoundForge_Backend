const appError = (
    message,
    statusCode = 500
) => {
    return {
        message,
        statusCode
    };
};

module.exports = appError;