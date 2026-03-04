const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  console.log(req.url , req.method, req.headers);

  if(req.url === '/'){
    res.setHeader('Content-Type', 'text/html');
  res.write('<html>');
  res.write('<head><title>My First Page</title></head>');
  res.write('<body><h1>Enter your Details</h1></body>');
  res.write('<form action="/submit-details " method="POST">');
  res.write('<input type = "text" name = "username" placeholder = "Enter your name"><br>');
  res.write('<label for="male">Male</label>');
  res.write('<input type = "radio" id = "male" name="gender" value="male">');
  res.write('<label for="female">Female</label>');

  res.write('<input type = "radio" id = "female" name="gender" value="female">');
  res.write('<br><input type = "submit" value = "Submit">');
  res.write('</form>');
  res.write('</html>');
  return res.end();


  }

  else if (req.url.toLowerCase() === "/submit-details" && req.method === "POST"){
    fs.writeFileSync("userDetails.txt", 'Harshit');
    res.statusCode = 302;
    res.setHeader('Location', '/');
  }


  res.setHeader('Content-Type', 'text/html');
  res.write('<html>');
  res.write('<head><title>My First Page</title></head>');
  res.write('<body><h1>Hello from my Node.js Server!</h1></body>');
  res.write('</html>');
  res.end();
});

const Port = 3000;

server.listen(Port, () => {
  console.log(`Server is running on port http://localhost:${Port}` );
});

// http.createServer(requestListener)