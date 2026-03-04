const http = require("http");

const server = http.createServer((req, res) => {
  console.log(req.url , req.method, req.headers);

  if(req.url === '/'){
    res.setHeader('Content-Type', 'text/html');
  res.write('<html>');
  res.write('<head><title>My First Page</title></head>');
  res.write('<body><h1>Hello from my Home</h1></body>');
  res.write('</html>');
  return res.end();


  }
  else if (req.url === '/products'){
    res.setHeader('Content-Type', 'text/html');
  res.write('<html>');
  res.write('<head><title>My First Page</title></head>');
  res.write('<body><h1>Hello from my Products Page</h1></body>');
  res.write('</html>');
  return res.end();

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