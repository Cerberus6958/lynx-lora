import express, { json, type Request, type Response } from 'express';
import cors from 'cors';
import process from 'process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { WebSocketServer } from 'ws';
import { SerialPort } from 'serialport';
import { ReadlineParser } from '@serialport/parser-readline';

const BAUDRATE = 9600;
const SERIALPATH = '/dev/cu.usbmodem101';
const NUM_VALUES_PER_PACKET = 5;

const app = express();
app.use(json());
app.use(cors());
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataFilePath = path.join(__dirname, '..', '..', 'dataStore');
if (!fs.existsSync(dataFilePath)) {
  fs.mkdirSync(dataFilePath, { recursive: true });
}

const PORT: number = parseInt(process.env.PORT ?? '3001');
const HOST: string = process.env.IP || '127.0.0.1';
const wssMap = new Map<number, WebSocketServer>();

const arduino = new SerialPort({path: SERIALPATH, baudRate: BAUDRATE});
const parser = arduino.pipe(new ReadlineParser({ delimiter: '\n' }));

arduino.on('open', () => console.log(`Arduino on to port ${SERIALPATH}`));
arduino.on('error', (err) => console.log(`Arduino error: ${err.message}`));

parser.on('data', (data) => {
  console.log(data + "a")

  // Filtering logic for each packet should come here, one value for each sensor in the packet sent over
  // Currently there are 5 values per packet within the JSON.
  const a = JSON.parse(data);

  for (let i = 0; i < NUM_VALUES_PER_PACKET; i++) {
    const port = i + 3000;
    let wss = wssMap.get(port);
    if (!wss) {
      wss = new WebSocketServer({ port });
      wssMap.set(port, wss);
    }

    const value = a.values[i];
    if (!isNaN(value)) {
      console.log(`${value} b`);
      sendOver(value, wss);
    }
  }
})

function sendOver(data: number, wss: WebSocketServer) {
  wss.clients.forEach((client) => {
    if (client.readyState == client.OPEN) {
      client.send(data);
    }
  })
}


app.post('/datastore', (req: Request, res: Response) => {
  try {
    console.log(req.body);
    let { graph, data } = req.body;
    graph = graph.replace(/\s+/g, '_');
    const fullPath = path.join(dataFilePath, `${graph}.json`);
    console.log(graph);
    let existingData = [];
    if (fs.existsSync(fullPath)) {
        let contents = fs.readFileSync(fullPath, 'utf8');
        if (contents.trim()) {
            existingData = JSON.parse(contents);
        }
    }
    existingData.push(data);
    fs.writeFileSync(fullPath, JSON.stringify(existingData, null, 2), 'utf-8');
    res.status(200).send('ok');
  } catch (error) {
    console.error('Error writing file:', error);
    res.status(500).send('error');
  }
});

const server = app.listen(PORT, HOST, () => {
  console.log(`Server started on port ${PORT} at ${HOST}`);
});
