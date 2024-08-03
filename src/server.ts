import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import { createServer } from 'http';
import mongoose from 'mongoose';
import { Server } from 'socket.io';
import chatSocket from './app/socket/chat';
import errorHandler from './middleware/erorrHandler';
import router from './router';

dotenv.config();

const app = express();

const server = createServer(app);

const io = new Server(server, {
    cors: {
        origin: '*',
    },
});

const mongoURI = process.env.MONGO_URI || '';

mongoose
    .connect(mongoURI)
    .then(() => console.log('MongoDB connected...'))
    .catch((err) => console.log(err));

app.set('trust proxy', true);

// app.use((req, res, next) => {
//     console.log('------------------------------------------------------------------');
//     console.log('URL:', req.protocol + '://' + req.get('host'), req.originalUrl);
//     console.log('IP:', req.ip);
//     console.log('Method:', req.method);
//     console.log('-------------------------------//---------------------------------');

//     next(); // Tiếp tục xử lý các middleware hoặc route tiếp theo
// });

const corsOptionsDelegate = function (req, callback) {
    var corsOptions = { origin: true };
    callback(null, corsOptions);
};

app.use(cors(corsOptionsDelegate));
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/v1/', router);

app.use(errorHandler);

chatSocket(io);

export default server;
