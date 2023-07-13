import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import "express-async-errors";
import { PORT, MONGODB_URI } from "./utils/config.js";
import blogRouter from "./controllers/blogs.js";
import usersRouter from "./controllers/users.js"
import loginRouter from "./controllers/login.js";
import { getTokenFromReq, getUserFromReq, errorHandler, unknownEndpoint } from "./utils/middleware.js";
const app = express();
app.use(cors());
app.use(express.json());

// Connect to the database
mongoose.connect(MONGODB_URI)
  .then(res => {
    console.log("Success");
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB:", error.message);
    process.exit(1);
  });

app.use(getTokenFromReq);

app.use("/api/login", loginRouter);
app.use("/api/blogs", blogRouter);
app.use("/api/users", usersRouter);
app.use(unknownEndpoint);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

export default app;