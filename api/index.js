import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";

dotenv.config();

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("mongodb is connected");
  })
  .catch((e) => {
    console.log(e);
  });

const app = express();

// for sending json data to backend
// we use this middleware to send json data to backend
app.use(express.json());

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// router
app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);

//middle ware to handle error from the server side

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "internal server error";

  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
