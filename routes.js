import fs from 'node:fs';

export const requestHandler = (req, res) => {
  const { url, method } = req;
  if (url === '/') {
    res.write("<h1>Hello World, I've created my first server</h1>");
    res.write('<button> <a href="/contact">Go to contact</a> </button>');
  } else if (url === '/contact') {
    res.write(`
  <body>
    <h1>Contact Page</h1>
    <form action="/message" method="POST">
      <input type="text" name="message" />
      <button type="submit">Send</button>
    </form>
  </body > `);
  } else if (url === '/message' && method === 'POST') {
    // fs.writeFileSync('message.txt', 'DUMMY');
    const body = [];
    req.on('data', (chunk) => {
      body.push(chunk);
      console.log("🚀 ~ server ~ chunk:", body)
    });
    req.on('end', () => {
      const parsedBody = Buffer.concat(body).toString();
      console.log("🚀 ~ server ~ parsedBody:", parsedBody)
      const message = parsedBody.split('=')[1].replaceAll('+', ' ');
      console.log("🚀 ~ server ~ message:", message)
      fs.writeFileSync('message.txt', message);
    });
    res.writeHead(302, { 'Location': '/' }); // 302 is the status code for redirect
  }
};