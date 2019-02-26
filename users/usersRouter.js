const express = require("express");
const bcrypt = require("bcryptjs");

const Users = require("./usersModel.js");

const router = express.Router();

router.post("/register", (req, res) => {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 10);
  user.password = hash;

  Users.add(user)
    .then(saved => {
      res.status(201).json(saved);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.post("/login", (req, res) => {
  let { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        res.status(200).json({ message: `Logged in.` });
      } else {
        res.status(401).json({ message: "YOU SHALL NOT PASS!" });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

function restricted(req, res, next) {
  const { username, password } = req.body;

  if (username && password) {
    Users.findBy({ username })
      .first()
      .then(user => {
        if (user && bcrypt.compareSync(password, user.password)) {
          next();
        } else {
          res.status(401).json({ message: "Invalid Credentials" });
        }
      })
      .catch(error => {
        res.status(500).json({ message: "Ran into an unexpected error" });
      });
  } else {
    res.status(400).json({ message: "No credentials provided" });
  }
}

router.get("/users", restricted, async (req, res) => {
  try {
    const users = await Users.find();
    res.json(users);
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
