const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
  if (req.url === '/greet.js') {
    res.writeHead(200, {
      'Content-Type': 'text/javascript',
      // 'Cross-Origin-Resource-Policy': 'same-origin', // 设置 CORP
      'Cross-Origin-Resource-Policy': 'cross-origin', // 设置 CORP
    })
    const stream = fs.createReadStream('./greet.js')
    stream.pipe(res)
  } else if (req.url === '/greet-without-cors.js') {
    res.writeHead(200, {
      'Content-Type': 'text/javascript',
      // // 不设置 CORS
      // 'access-control-allow-origin': '*'
    })
    const stream = fs.createReadStream('./greet-without-cors.js')
    stream.pipe(res)
  } else if (req.url === '/greet') {
    res.write('Hello world!')
  } else {
    res.writeHead(404);
    res.end('Not found');
  }
});

server.listen(4000, () => {
  console.log('Resource server running at http://localhost:4000');
});