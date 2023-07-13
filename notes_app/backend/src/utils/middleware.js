const unknownEndpoint = (req, res) => {
    res.status(404).send("Not found");
};

const errorHandler = (error, req, res, next) => {
    if (process.env.NODE_ENV !== "test") {
        console.error(error.message);
    }
    if (error.name === "CastError") {
        return res.status(400).json({ error: "Incorrect formatting" });
    } else if (error.name === "MongoConnectionException") {
        return res.status(500).json({ error: "Server error. Please try again later" });
    } else if (error.name === "ValidationError") {
        return res.status(400).json({ error: `Received invalid data: ${error.message}` });
    } else if (error.name === "MongoError" && error.code === 11000) {
        return res.status(409).json({ error: "Duplicate key error" });
    } else if (error.name === "MongoError" && error.code === 2) {
        return res.status(503).json({ error: "Operation failed" });
    } else if (error.name === "JsonWebTokenError") {
        return res.status(401).json({ error: "Invalid token" });
    } else if (error.name === "TokenExpiredError") {
        return res.status(401).json({ error: "Token expired" });
    }
    else {
        next(error);
    }

};

export { unknownEndpoint, errorHandler }