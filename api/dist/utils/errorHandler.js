export const errorHandler = (error, req, res, next) => {
    if (res.headersSent) {
        next(error);
    }
    else {
        res.status(500).json({
            errors: [
                {
                    title: "Internal Server Error",
                    detail: "Something went wrong. We're working on it!",
                },
            ],
        });
    }
};
