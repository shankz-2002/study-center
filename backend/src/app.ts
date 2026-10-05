import express from "express";
import fieldRouter from "./routes/field.route.js";
import { errorHandler } from "./middleware/errorHandler.js";
import categoryRouter from "./routes/category.route.js";
import cors from "cors";
import "dotenv/config";
import userRouter from "./routes/user.route.js";
import topicRouter from "./routes/topic.route.js";
import levelRouter from "./routes/level.route.js";
import learningRouter from "./routes/learning.route.js";
import questionRouter from "./routes/question.route.js";
import progressRouter from "./routes/progress.route.js";
const app = express();
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
  }),
);

app.use(express.json());

app.use("/field", fieldRouter);
app.use("/category", categoryRouter);
app.use("/auth", userRouter);
app.use("/topic", topicRouter);
app.use("/level", levelRouter);
app.use("/learning", learningRouter);
app.use("/question", questionRouter);
app.use("/progress", progressRouter);

app.use(errorHandler);

app.get("/health", (req, res) => {
  res.send({
    msg: "working properly",
  });
});

export default app;
