const userRouter = require("express").Router();
const User = require("../models/user");
const brcypt = require("bcrypt");

userRouter.post("/", async (req, res, next) => {
  const body = req.body;
  if (body.password.length <= 3) {
    return res
      .status(400)
      .json({ error: "password must be 3 at least 3 characters long" });
  }
  const saltRounds = 10;
  try {
    const passwordHash = await brcypt.hash(body.password, saltRounds);
    const user = new User({
      username: body.username,
      name: body.name,
      passwordHash,
    });
    const savedUser = await user.save();
    res.json(savedUser);
  } catch (error) {
    next(error);
  }
});

userRouter.get("/", async (req, res) => {
  const users = await User.find({}).populate("blogs");
  res.json(users);
});

module.exports = userRouter;
