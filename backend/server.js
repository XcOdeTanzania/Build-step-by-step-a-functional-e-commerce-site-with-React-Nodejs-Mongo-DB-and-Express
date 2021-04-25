import express from "express";
import "./config/mongoDb.js";
import userRouter from "./routes/userRouter.js";
import productRouter from "./routes/productRoute.js";
import dotenv from "dotenv";
import orderRouter from "./routes/orderRouter.js";
dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// userRouter
app.use("/api/users", userRouter);
// productRouter
app.use("/api/products", productRouter);
// oderRouter
app.use("/api/orders", orderRouter);
// middleware
app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});
app.get("/api/config/paypal", (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID || "sb");
});
app.get("/", (req, res) => {
  res.send("Server is ready and port runing");
});

app.listen(1000, () => {
  console.log("Server at http://localhost:1000");
});
