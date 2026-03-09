// Core Modules
const path = require("path");

// External Modules
const express = require("express");

const userRouter = require("./routes/userRouter");
const  hostRouter  = require("./routes/hostRouter");
const rootDir = require("./utils/pathUtil");

const errorController = require("./controllers/errors");

const app = express();

// View Engine
app.set("view engine", "ejs");
app.set("views", path.join(rootDir, "views"));

// Body Parser
app.use(express.urlencoded({ extended: true }));

// Static files
app.use(express.static(path.join(rootDir, "public")));

// Routes
app.use(userRouter);
app.use("/host", hostRouter);

// 404 page
app.use(errorController.pageNotFound);

// Server
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on address http://localhost:${PORT}`);
});