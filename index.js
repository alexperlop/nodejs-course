// CORE MODULES
// http -> Launch a server, send requests, receive responses
// https -> Launch a SSL server
// fs -> File system
// path -> Path utilities
// os -> Operating system information
import { createServer } from 'node:http';
import { requestHandler } from './routes.js';
import fs from 'node:fs';
const { PORT = 0 } = process.env; // 0 means random port or free port, 
// If the PORT value is not defined in the environment variables, it will default to 0.
const server = createServer((req, res) => {
  // console.log(req.url, req.method, req.headers); // information about the request
  // res.setHeader('Content-Type', 'text/html'); // setHeader is used to set the response header
  res.writeHead(200, { 'Content-Type': 'text/html' }); // 200 is the status code, content-type is the header
  // res.write("<h1>Hello World, I've created my first server</h1>"); // write the response
  requestHandler(req, res);
  res.end(); // end the response
  // process.exit(); // exit the process after the response is sent
});

server.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${server.address().port}`);
});

// En resumen, setHeaders brinda mayor flexibilidad para operaciones asíncronas,
// mientras que writeHead es más directo y adecuado cuando las cabeceras se conocen de antemano. 
// La elección entre ellos dependerá de los requisitos específicos de tu aplicación.