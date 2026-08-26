import express, { json, type Request, type Response } from 'express';
import cors from 'cors';
import process from 'process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { WebSocketServer } from 'ws';

const app = express();
app.use(json());
app.use(cors());
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataFilePath = path.join(__dirname, '..', '..', 'dataStore');

const PORT: number = parseInt(process.env.PORT ?? '3001');
const HOST: string = process.env.IP || '127.0.0.1';


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
