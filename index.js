import { createServer } from 'node:http';
const { PORT = 0 } = process.env;
const server = createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end();
});

server.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${server.address().port}`);
});