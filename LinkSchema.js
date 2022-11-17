import mongoose from "mongoose";
const { Schema } = mongoose;

const Link = new Schema({
  title: String,
  url: String,
  date: { type: Date, default: Date.now },
});

const link = mongoose.model("link", Link);

export { link };
