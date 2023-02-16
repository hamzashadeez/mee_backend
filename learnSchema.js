import mongoose from "mongoose";
const { Schema } = mongoose;

const Learn = new Schema({
  windows: Number,
  android: Number,
  visits: Number,
  date: { type: Date, default: Date.now },
});

const learn = mongoose.model("learn", Learn);

export { learn };
