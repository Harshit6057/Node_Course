
const express = require('express');


const requestHandler = require("./user");
const e = require('express');

const app =  express();

app.get((req, res, next) => {
  console.log("came in first middleware", req.url , req.method);
  next();
})

app.post("/" ,(req, res, next) => {
  console.log("came in second middleware", req.url , req.method);
  res.send("Hello from second middleware");
})

app.use("/submit-details" , (req, res, next) => {
  console.log("came in third middleware", req.url , req.method);
})



const PORT = 3002;
app.listen(PORT, () => {
  console.log(`Server running on address http://localhost:${PORT}`);
});