const mongoose = require("mongoose");
const mongoUrl = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.hilfbkh.mongodb.net/?retryWrites=true&w=majority`;

async function connect() {
  try {
    await mongoose.connect(mongoUrl);
    console.log("Connected to mongodb");
  } catch (e) {
    console.error("Error connecting to mongodb");
    console.error(e);
  }
}

connect();
