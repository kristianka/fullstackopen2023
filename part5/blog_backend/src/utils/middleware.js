import jwt from "jsonwebtoken";

const getTokenFromReq = (req, res, next) => {
    const authorization = req.get("authorization");
    if (authorization && authorization.startsWith("Bearer ")) {
        req.token = authorization.replace("Bearer ", "");
    } else {
        req.token = null;
    }
    next();
}

const getUserFromReq = (req, res, next) => {
    const decodedToken = jwt.verify(req.token, process.env.SECRET);
    if (decodedToken.id) {
        req.user = decodedToken;
    } else {
        req.user = null;
    }
    next();
}

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
    } else if (error.name.includes("SyntaxError")) {
        return res.status(400).json({ error: "Bad request" })
    }
    else {
        next(error);
    }
};

export { getTokenFromReq, getUserFromReq, unknownEndpoint, errorHandler }