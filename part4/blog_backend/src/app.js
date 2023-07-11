import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import "express-async-errors";
import { PORT, MONGODB_URI } from "./utils/config.js";
import { blogRouter } from "./controllers/blogs.js";

const app = express();
app.use(cors());
app.use(express.json());

// Connect to the database
mongoose.connect(MONGODB_URI)
  .then(res => {
    console.log("Success");
  });

app.use("/api/blogs", blogRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

export default app;