const errorHandler = (err, req, res, next) => {
    // Get status code from error or default to 500
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';

    // Prepare the error response
    const errorResponse = {
        success: false,
        statusCode,
        message,
        // Include stack trace only in development mode
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    };

    // Enhanced logging for authentication errors
    if (statusCode === 401 || statusCode === 403) {
        console.log('Authentication Error Details:');
        console.log('Request path:', req.path);
        console.log('Request method:', req.method);
        console.log('Request headers:', req.headers);
        console.log('Request body:', req.body);
        console.log('Error message:', message);
    } else {
        // Standard error logging
        console.error('Error:', err);
    }

    res.status(statusCode).json(errorResponse);
};

module.exports = errorHandler;