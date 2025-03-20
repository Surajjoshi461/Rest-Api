import path from "path";
import { config } from 'dotenv'
config();
const envFile = path.join(__dirname, '../.env.local')
config({ path: envFile, override: true })
import express from 'express'
import http from 'http';
import { Server } from 'socket.io';
import helmet from 'helmet';
import cors from 'cors'
import cookieParser from "cookie-parser";
import fs from 'fs'

import { AppDataSource, serverConfig } from "./config";

(async () => {
    //befor uncommenting below code, give credentials of postgress in .env
    // await AppDataSource.initialize()
    _startExpressApp()
})()

async function _startExpressApp() {
    const app = express();
    const server = http.createServer(app);
    const io = new Server(server, { cors: { origin: '*' } });
    const port = serverConfig.PORT || 3001;
    app.use(cors({ origin: true, credentials: true }));
    app.use(helmet());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cookieParser());
    app.disable('x-powered-by')

    fs.readdirSync(path.resolve(__dirname, 'routes')).forEach((file) => {
        if (file.includes('.js') && !file.includes('.js.')) {
            const { router, basePath } = require(`./routes/${file}`);
            app.use(basePath, router);
        }
    });

    app.get('/', (_req, res) => {
        res.status(200).send(`Server is up and running`);
    })

    app.get('*', (_req, res) => {
        res.status(400).send(`You may lost in the coding world`);
    })
    // WebSocket Connection
    io.on('connection', (socket) => {
        console.log('A user connected');

        socket.on('room', (room) => {
            socket.join(room);
            console.log(`User joined room: ${room}`);
        });

        socket.on('sendMessage', ({ room, message }) => {
            io.to(room).emit('receiveMessage', message);
        });

        socket.on('disconnect', () => {
            console.log('A user disconnected');
        });
    });

    server.listen(port, () => {
        console.log(`Server is running on port: ${port}`);

    })
}