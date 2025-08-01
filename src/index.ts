import express from 'express';
import type { Application, Request, Response } from 'express';
import { Server } from "socket.io";
import { createServer } from 'node:http';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const app: Application  = express();
const server = createServer(app);
const io = new Server(server);


const __dirname = dirname(fileURLToPath(import.meta.url));

app.get('/', (req: Request, res: Response) => {
  res.sendFile(join(__dirname, '../public/index.html'));
});

io.on('connection', (socket) => {
  console.log('A user connected');
  socket.on('disconnect', () => {
    console.log('A user disconnected');
  })
 });

server.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});