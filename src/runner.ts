import http from 'http';
const puppeteer = require('puppeteer');
import { runner } from './config'

const { hostname, port } = runner;

let browser;

const runBrowser = async () => {
    console.log('launch browser')
    browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('http://localhost:1234');
}

const server = http.createServer(async (req, res) => {
    const urlParts = req.url?.split(/\//g);
    const action = urlParts[1];
    const param = urlParts[2];
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    if (action === 'log') {
        const buffers = [];

        for await (const chunk of req) {
          buffers.push(chunk);
        }
      
        const dataStr = Buffer.concat(buffers).toString();
        const data = dataStr[0] === '{' ? JSON.parse(dataStr) : dataStr;
      
        console.log(data); 
    }
    if (action === 'exit') {
        await browser.close();
        server.close();
        process.exit(param === 'fail' ? 1 : 0);
    }
    res.end('OK');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
runBrowser();
