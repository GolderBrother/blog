const http = require('http');

const server = http.createServer();

server.on('request', (req, res) => {
  if(req.url === '/') {
    res.setHeader('Content-Type', 'text/plain');
    res.setHeader('Content-Length', 10);
    res.write("helloworld");
  }
})
const PORT = 8090;
server.listen(PORT, () => {
  console.log(`server 成功启动, 监听 ${PORT} 端口`);
});
