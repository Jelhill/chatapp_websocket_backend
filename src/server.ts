import express from 'express';
import http from 'http';
import path from 'path';
import cors from 'cors';
import dotenv from 'dotenv'
import router from './routes';
import socketConnection from './connections/socket';  // Import the setupSocket function
import { connectToMongoDB } from './connections/mongo.connection';

dotenv.config();

const app = express();
const server = http.createServer(app);
connectToMongoDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', router);
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

socketConnection(server);

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
