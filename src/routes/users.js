const express = require("express");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const UserSchema = require("../models/users.js");

const router = express.Router();


router.post("/register", async (req, res) => {
  try {
    const user = UserSchema(req.body);
    await user.save();
    const token = jwt.sign({ email: user.email }, "secret_key");
    res.status(201).json({ token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserSchema.findOne({ email });
    if (!user) {
      throw new Error("Invalid email or password");
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      throw new Error("Invalid email or password");
    }
    const token = jwt.sign({ email: user.email }, "secret_key");
    res.status(200).json({ token, verificated: true, user});
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
});

router.get("/users", (req, res) => {
  UserSchema.find()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

router.put("/user/:id", async (req, res) => {
  const id = req.params.id
  const body = req.body;

  const updatedUser = await UserSchema.updateOne({ _id: id }, body);
  res.send({ updatedUser, id: id });
  });
;

router.post('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.error('Error destroying session:', err);
      res.status(500).send('Internal Server Error');
    } else {
      res.sendStatus(200);
    }
  });
});

router.get("/userfind/:id", (req, res) => {
  const { id } = req.params;
  UserSchema
    .findById(id)
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});


module.exports = router;
