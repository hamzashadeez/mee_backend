import mongoose from "mongoose";
const { Schema } = mongoose;

const Scholar = new Schema({
  fullname: String,
  email: String,
  school: String,
  phone: String,
  certificate: String,
  address: String,
  nin: String,
  state: String,
  noOfWifes: String,
  noOfChildren: String,
  date: { type: Date, default: Date.now },
});

const scholar = mongoose.model("scholar", Scholar);

export { scholar };
