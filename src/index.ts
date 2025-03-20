import path from "path";
import { config } from 'dotenv'
config();
const envFile = path.join(__dirname, '../.env.local')
config({ path: envFile, override: true })
import express, { NextFunction, Request, Response } from 'express'
import http from 'http';
import { Server } from 'socket.io';
import helmet from 'helmet';
import cors from 'cors'
import cookieParser from "cookie-parser";
import fs from 'fs'
import { ReasonPhrases, StatusCodes } from 'http-status-codes';

import { AppDataSource, serverConfig } from "./config";
import { ExpressError } from "./helper/errorHandler/expressError";
import { CustomErrorResponse } from "./helper/errorHandler/customErrorResponse";

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

    app.get('/help', (_req, res) => {
        res.status(200).send(`You need help...?`);
    })

    app.get('*', (_req, res) => {
        res.status(400).send(`You may lost in the coding world`);
    })

    // WebSocket Connection
    io.on('connection', (socket) => {
        console.log(`User connected: ${socket.id}`);

        // Send a message to a specific room
        socket.on('send-room-message', ({ roomId, message }) => {
            console.log(`Message to ${roomId}: ${message}`);
            io.to(roomId).emit('room-message', { sender: socket.id, message });
        });

        // Broadcast to all users
        socket.on('broadcast-message', (message) => {
            console.log(`Broadcasting: ${message}`);
            io.emit('broadcast-message', { sender: socket.id, message });
        });
    });

    app.use((error: ExpressError, _req: Request, res: Response, next: NextFunction): void => {
        const statusCode = error.status || StatusCodes.INTERNAL_SERVER_ERROR;
        const message = error.message || ReasonPhrases.INTERNAL_SERVER_ERROR;
        const errorResponse: CustomErrorResponse = {
            status: statusCode,
            message,
            body: {
                error: error.message || error,
            },
        };

        if (error?.errors?.length) {
            errorResponse.body.error = error.errors;
        }
        return next(res.status(statusCode).send(errorResponse));
    });

    server.listen(port, () => {
        console.log(`Server is running on port: ${port}`);

    })
}