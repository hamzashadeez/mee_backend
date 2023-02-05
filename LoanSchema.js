import mongoose from "mongoose";
const { Schema } = mongoose;

const Loan = new Schema({
  name: String,
  email: String,
  accountName: String,
  bankName: String,
  bvn: String,
  address: String,
  occupation: String,
  age: String,
  state: String,
  userID: String,
  status: String,
  date: { type: Date, default: Date.now },
});

const loan = mongoose.model("loan", Loan);

export { loan };
