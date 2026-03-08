
const sumRequestHandler = (req , res) => {
  console.log("In Sum Request Handler", req.url);
  const body = [];
  req.on('data' , chunk => {
    console.log(chunk);
  body.push(chunk)});
  req.on('end' , () => {
    const bodyStr = Buffer.concat(body).toString();
    console.log(bodyStr);
    const params = new URLSearchParams(bodyStr);
    const bodyObj = Object.fromEntries(params);
    console.log(bodyObj);
    const result = parseInt(bodyObj.first) + parseInt(bodyObj.second);
    console.log(result);
  
  res.setHeader('Content-Type', 'text/html');
  res.write('<html>');
  res.write('<head><title>Sum Result</title></head>');
  res.write(`<body><h1>Result is ${result}</h1></body>`);
  res.write('</html>');
  return  res.end();
  });
}

exports.sumRequestHandler = sumRequestHandler;