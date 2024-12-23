import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

export const env = {
    PORT: process.env.PORT || 5000,
    DB: process.env.MONGO_DB_URI || "mongodb://127.0.0.1:27017/inventoryAI",
    JWT_SECRET: process.env.JWT_SECERT || ""
}