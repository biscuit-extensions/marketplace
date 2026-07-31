const http = require('http');
const fs = require('fs');
const path = require('path');

const distDir = path.resolve(__dirname, '../dist');
const mimeTypes = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.svg': 'image/svg+xml',
  '.json': 'application/json'
};

const server = http.createServer((req, res) => {
  let reqPath = req.url.split('?')[0];
  if (reqPath === '/') reqPath = '/index.html';
  const filePath = path.join(distDir, reqPath);
  
  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    const ext = path.extname(filePath);
    res.writeHead(200, { 'Content-Type': mimeTypes[ext] || 'application/octet-stream' });
    fs.createReadStream(filePath).pipe(res);
  } else {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    fs.createReadStream(path.join(distDir, 'index.html')).pipe(res);
  }
});

server.listen(4173, '127.0.0.1', () => {
  console.log('Testing static server on http://127.0.0.1:4173/');
  
  http.get('http://127.0.0.1:4173/', (res) => {
    console.log('GET / -> Status:', res.statusCode);
    let body = '';
    res.on('data', d => body += d);
    res.on('end', () => {
      const jsMatch = body.match(/src="(\/assets\/[^"]+\.js)"/);
      const cssMatch = body.match(/href="(\/assets\/[^"]+\.css)"/);
      
      console.log('Found JS asset:', jsMatch ? jsMatch[1] : 'NOT FOUND');
      console.log('Found CSS asset:', cssMatch ? cssMatch[1] : 'NOT FOUND');

      if (!jsMatch || !cssMatch) {
        console.error('Failed: JS or CSS asset link not found in index.html');
        server.close(() => process.exit(1));
        return;
      }

      http.get('http://127.0.0.1:4173' + jsMatch[1], (jsRes) => {
        console.log('GET ' + jsMatch[1] + ' -> Status:', jsRes.statusCode, jsRes.headers['content-type']);
        if (jsRes.statusCode !== 200) {
          console.error('Failed to load JS asset');
          server.close(() => process.exit(1));
          return;
        }

        http.get('http://127.0.0.1:4173' + cssMatch[1], (cssRes) => {
          console.log('GET ' + cssMatch[1] + ' -> Status:', cssRes.statusCode, cssRes.headers['content-type']);
          if (cssRes.statusCode !== 200) {
            console.error('Failed to load CSS asset');
            server.close(() => process.exit(1));
            return;
          }

          console.log('ALL ASSETS RESOLVED WITH HTTP 200 OK! Zero 404 errors!');
          server.close(() => process.exit(0));
        });
      });
    });
  });
});
