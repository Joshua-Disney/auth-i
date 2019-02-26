const express = require("express");

const Users = require("./usersModel.js");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const users = await Users.find();
    res.json(users);
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
