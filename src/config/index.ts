import path from 'path';
import { config } from 'dotenv';

import NodeEnv from '../enums/nodeEnv';
import { DataSource } from 'typeorm';
import { User } from '../models/userEntity';

const env = process.env

if (env.NODE_ENV === NodeEnv.LOCAL) {
    const envFile = path.join(__dirname, '../../.env')
    config({ path: envFile })
}

export interface ServerConfig {
    PORT: number;
    JWT_SECRET_KEY: string;
    DB_HOST: string;
    DB_PORT: number
    DB_PASSWORD: string
    DB_USERNAME: string;
    DB_DATABASE: string
}

export const serverConfig: ServerConfig = {
    PORT: Number(env.PORT),
    JWT_SECRET_KEY: env.JWT_SECRET_KEY ?? '',
    DB_HOST: env.DB_HOST ?? '',
    DB_PORT: Number(env.DB_PORT),
    DB_PASSWORD: env.DB_PASSWORD ?? '',
    DB_USERNAME: env.DB_USERNAME ?? '',
    DB_DATABASE: env.DB_DATABASE ?? ''
}

export const AppDataSource = new DataSource({
    type: "postgres",
    host: serverConfig.DB_HOST,
    port: serverConfig.DB_PORT,
    username: serverConfig.DB_USERNAME,
    password: serverConfig.DB_PASSWORD,
    database: serverConfig.DB_DATABASE,
    synchronize: true,
    entities: [User],
    migrations: [__dirname + "/migration/*.ts"],

});