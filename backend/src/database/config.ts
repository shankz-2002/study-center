import 'dotenv/config'
import { DataSource } from 'typeorm';
import { Fields } from '../entity/fields.js';
import { Category } from '../entity/category.js';

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT)||5432,
    username: process.env.DB_USER,
    password: process.env.PASSWORD,
    database: process.env.DB_NAME,
    synchronize: true,
    logging: false,
    entities: [Fields,Category]

})