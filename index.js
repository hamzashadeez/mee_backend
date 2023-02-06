import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { link } from "./LinkSchema.js";
import { loan } from "./LoanSchema.js";
import { dummy } from "./data.js";
import { scholar } from "./scholarSchema.js";

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
  const allLinks = await link.find().sort({ date: -1 });
  res.send(allLinks);
});

app.get("/loan", async (req, res) => {
  const allLoanData = await loan.find().sort({ date: -1 });
  res.send(allLoanData);
});

app.put("/approve/:id", async (req, res) => {
  // update the status
  const id = req.params.id;
  let data = req.body;
  await loan.updateOne({ _id: id }, { status: "Approved" });
  res.send({ ...data, id });
});

app.put("/reject/:id", async (req, res) => {
  // update the status
  const id = req.params.id;
  let data = req.body;
  await loan.updateOne({ _id: id }, { status: "Rejected" });
  res.send({ ...data, id });
});

//
app.post("/loan", (req, res) => {
  const data = req.body;
  // const newloan = new loan(data);
  // newloan.save();
  res.send({ ...data });

  // res.status(200).json(newloan);
});
//

app.post("/link", (req, res) => {
  const { url, title } = req.body;
  const newlink = new link({
    title,
    url,
  });
  newlink.save();
  res.status(200).json(newlink);
});

// For DYDA Project
//          //        //
app.post("/dyda", (req, res) => {
  const body = req.body;
  const newscholar = new scholar(body);
  newscholar.save();
  res.status(200).json(newscholar);
});

app.get("/dyda", async (req, res) => {
  const allData = await scholar.find();
  res.send(allData);
});
//          //        //
// End Of DYDA Project

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
