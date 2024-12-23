import 'reflect-metadata';
import express, { Application } from "express";
import cors from "cors";
import { connectToDatabase } from "./shared/database/mongo";
import { env } from "./environment";
import { authRouter } from './modules/auth/routes';
import { errorMiddleware } from './shared/middleware';
import { inventoryRouter } from './modules/inventory/routes';

// initializing express application
const app:Application = express();

/**
 * Middlewares
 */
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**
 * Routes
 */
const BASE_URL = '/api/v1';
app.use(`${BASE_URL}/auth`, authRouter);
app.use(`${BASE_URL}/inventory`, inventoryRouter);

/**
 * Dont move this error middleware
 */
app.use(errorMiddleware);

/**
 * Start server and database connection
 */
app.listen(env.PORT, async () => {
    connectToDatabase(env.DB)
    console.log("server currently running");
})