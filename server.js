const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");

const usersRouter = require("./users/usersRouter.js");

const server = express();

server.use(express.json());
server.use(helmet());
server.use(morgan("dev"));
server.use(cors());

server.use("/api", usersRouter);

module.exports = server;
