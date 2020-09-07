
const http = require('http');

const server = http.createServer();

server.on('request', (req, res) => {
  if (req.url === '/') {
    res.setHeader('Content-Type', 'text/html; charset=utf8');
    res.setHeader('Content-Length', 10);
    res.setHeader('Transfer-Encoding', 'chunked');
    res.write('<p>来啦</p>');
    setTimeout(() => {
      res.write('第一次传输<br/>');
    }, 1000);
    setTimeout(() => {
      res.write('第二次传输');
      res.end();
    }, 2000);
  }
});
const PORT = 8090;
server.listen(PORT, () => {
  console.log(`server 成功启动, 监听 ${PORT} 端口`);
});