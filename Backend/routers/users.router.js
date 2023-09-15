// routers/userRouter.js

const express = require("express");
const { signupUser, logUser } = require("../controllers/userController");

const userRouter = express.Router();

userRouter.post("/login", logUser);
userRouter.post("/signup", signupUser);

module.exports = { userRouter };
