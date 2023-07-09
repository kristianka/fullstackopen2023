const unknownEndpoint = (req, res) => {
    res.status(404).send("Not found");
};

const errorHandler = (error, req, res, next) => {
    console.error(error.message);
    if (error.name === "CastError") {
        return res.status(400).send("Incorrect formatting");
    } else if (error.name === "MongoConnectionException") {
        return res.status(500).send("Server error. Please try again later");
    } else if (error.name === "ValidationError") {
        return res.status(400).send(`Received invalid data: ${error.message}`);
    } else if (error.name === "MongoError" && error.code === 11000) {
        return res.status(409).send("Duplicate key error");
    } else if (error.name === "MongoError" && error.code === 2) {
        return res.status(503).send("Operation failed");
    } else {
        next(error);
    }
};

export { unknownEndpoint, errorHandler }