//Core Modules
const path = require('path')

//External Mdoules

const express = require('express');

const userRouter = require("./routes/userRouter");
const {hostRouter} = require('./routes/hostRouter');
const rootDir = require('./utils/pathUtil');

const app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(rootDir, 'views'));

app.use(express.urlencoded());


app.use(userRouter);

app.use("/host", hostRouter);

app.use(express.static(path.join(rootDir, 'public')));

app.use((req, res, next) => {
  
  res.status(404).sendFile(path.join(rootDir, 'views','404.html'));
  
});


const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on address http://localhost:${PORT}`);
});