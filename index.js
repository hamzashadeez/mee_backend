import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { link } from "./LinkSchema.js";
dotenv.config();

const app = express();
const PORT = 5000;

app.use(cors());
app.use(helmet());
app.use(express.json());

app.get("/", (req, res) => {
  res.send({ message: "hello" });
});

app.get("/link", async (req, res) => {
  const allLinks = await link.find();
  res.send(allLinks);
});

app.post("/link", (req, res) => {
  const { url, title } = req.body;
  const newlink = new link({
    title,
    url,
  });
  newlink.save();
  res.status(200).json(newlink);
});

// MONGODB
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () => console.log("Server is currently running..."))
  )
  .catch((err) => console.log(err));
