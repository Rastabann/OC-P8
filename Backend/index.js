const express = require("express");
const app = express();
const cors = require("cors");
const { getDefaultNormalizer } = require("@testing-library/react");

app.get("/", function (req, res) {
  res.send("Hello World");
});

app.use(cors());
app.use(express.json());
app.post("/api/auth/signup", signUp);
app.post("/api/auth/login", login);

const users = [];
function signUp(req, res) {
  const body = req.body;
  const email = req.body.email;
  const password = req.body.password;

  const userInDb = users.find((user) => user.email === email);
  console.log("userInDb", userInDb);
  if (userInDb != null) {
    res.status(400).send("Email already exists");
    return;
  }

  const user = {
    email: email,
    password: password,
  };
  users.push(user);
  console.log("users:", users);
  res.send("sign up");
}

function login(req, res) {
  const body = req.body;
  console.log("body:", body);
  console.log("users in db:", users);

  const userInDb = users.find((user) => user.email === body.email);
  if (userInDb == null) {
    res.status(401).send("Wrong credentials");
    return;
  }

  const passwordInDb = userInDb.password;
  if (passwordInDb != body.password) {
    res.status(401).send("Wrong credentials");
    return;
  }
  if (body.email != "godinv5@gmail.com") {
    res.status(401).send("Wrong credentials");
    return;
  }
  if (body.password != "alexis") {
    res.status(401).send("Wrong credentials");
    return;
  }
  res.send({
    userId: "123",
    token: "token",
  });
}

app.listen(4000);
