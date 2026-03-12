// Core Module
const path = require('path');

// External Module
const express = require('express');
const session = require('express-session');

//Local Module
const storeRouter = require("./routes/storeRouter")
const hostRouter = require("./routes/hostRouter")
const authRouter = require("./routes/authRouter")
const rootDir = require("./utils/pathUtil");
const errorsController = require("./controllers/errors");
const {mongoConnect} = require('./utils/databaseUtil');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: 'airbnb-cookie-secret',
  resave: false,
  saveUninitialized: false,
}));
app.use((req, res, next) => {
  req.isLoggedIn = req.session?.isLoggedIn || false;
  next();
});
app.use(authRouter);
app.use(storeRouter);
app.use("/host", hostRouter);

app.use(express.static(path.join(rootDir, 'public')))

app.use(errorsController.pageNotFound);

const PORT = 3000;
mongoConnect(() => {
  app.listen(PORT, () => {
    console.log(`Server running on address http://localhost:${PORT}`);
  });
})
