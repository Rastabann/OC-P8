const mongoose = require("mongoose");
const PASSWORD = "SfK1drGq7fQ5bms1";
const USER = "godinv5";
const DB_URL = `mongodb+srv://${USER}:${PASSWORD}@cluster0.hilfbkh.mongodb.net/?retryWrites=true&w=majority`;

async function connect() {
  try {
    await mongoose.connect(DB_URL);
    console.log("Connected to DB");
  } catch (e) {
    console.error(e);
  }
}
connect();

const UserSchema = new mongoose.Schema({
  email: String,
  password: String,
});

const User = mongoose.model("User", UserSchema);

// const alexis = new User({
//   email: "godinv5@gmail.com",
//   password: "alexis",
// });

// alexis.save().then(() => console.log("alexis saved"));

module.exports = { User };
