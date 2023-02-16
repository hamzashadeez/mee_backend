import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { link } from "./LinkSchema.js";
import { loan } from "./LoanSchema.js";
import { dummy } from "./data.js";
import { scholar } from "./scholarSchema.js";
import { plates } from "./plates.js";
import { learn } from "./learnSchema.js";

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

app.get("/dyda/:id", async (req, res) => {
  const id = req.params.id;
  const data = await scholar.findById(id);
  // const allData = await scholar.find();
  res.send(data);
});

//
//
app.put("/dyda/reject/:id", async (req, res) => {
  // update the status
  const id = req.params.id;
  let data = req.body;
  await scholar.updateOne({ _id: id }, { status: "Rejected" });
  res.send({ ...data, id });
});
//
//
app.put("/dyda/approve/:id", async (req, res) => {
  // update the status
  const id = req.params.id;
  // let data = req.body;
  let data = await scholar.updateOne({ _id: id }, { status: "Approved" });
  res.send({ id, data });
});
//
//
app.get("/dyda", async (req, res) => {
  const allData = await scholar.find();
  res.send(allData);
});

app.get("/elearn", async (req, res) => {
  let id = "63ee2db3218666fd9a1d793d";
  let data = await learn.findById(id);
  res.send(data);
});

app.put("/elearn", async (req, res) => {
  let id = "63ee2db3218666fd9a1d793d";
  let doc = await learn.findById(id);
  let data = await learn.updateOne(
    { _id: id },
    {
      visits: doc.visits + 1,
      android: doc.android + 1,
      windows: doc.windows + 1,
    }
  );
  res.send(data);
});

//          //        //
// End Of DYDA Project

// get plates number array
app.get("/plates", (req, res) => {
  res.send(plates);
});
app.get("/plates/:number", (req, res) => {
  try {
    const number = req.params.number;
    for (let i = 0; i < plates.length; i++) {
      if (number === plates[i].number) {
        return res.status(200).send(plates[i]);
      } else {
        return res.status(500).send({
          error:
            "Sorry Either not found in our database or Bad Format Provided",
        });
      }
    }
  } catch (error) {
    console.log(error);
  }
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
