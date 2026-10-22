export function validateQuery(schema) {
    return (req, res, next) => {
        const result = schema.safeParse(req.query);

        if( ! result.success) {
            return res.status(400).json({
                error: result.error.issues.map(err => ({
                    field: err.path[0],
                    message: err.message,
                })),
            });
        }

        req.validatedQuery = result.data;
        next();
    };
}

export function validateParams(schema) {
    return (req, res, next) => {
        const result = schema.safeParse(req.params);

        if( ! result.success) {
            return res.status(400).json({
                error: result.error.issues.map(err => ({
                    field: err.path[0],
                    message: err.message,
                })),
            });
        }

        req.validatedParams = result.data;
        next();
    };
}
