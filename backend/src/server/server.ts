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

const app = express();
app.use(json());
app.use(cors());
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataFilePath = path.join(__dirname, '..', '..', 'dataStore');
const wss = new WebSocketServer({ port: 3002});

const PORT: number = parseInt(process.env.PORT ?? '3001');
const HOST: string = process.env.IP || '127.0.0.1';

const arduino = new SerialPort({path: SERIALPATH, baudRate: BAUDRATE});
const parser = arduino.pipe(new ReadlineParser({ delimiter: '\n' }));

arduino.on('open', () => console.log(`Arduino on to port ${SERIALPATH}`));
arduino.on('error', (err) => console.log(`Arduino error: ${err.message}`));

parser.on('data', (data) => {
  data = data.trim();
  data = data.match(/([0-9]+)cm/);
  const value = data[1];
  if (!isNaN(value)) {
    console.log(`${value}`);
    sendOver(value);
  }
})

function sendOver(data: number) {
  // const msg = JSON.stringify(data);
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
