import mongoose from "mongoose";

/**
 * Connect to a MongoDB database using Mongoose.
 * @param uri - The connection string for the MongoDB database.
 * @returns A promise that resolves when the connection is successful, or rejects on error.
 */
export async function connectToDatabase(uri: string): Promise<void> {
  try {

    // Connect to the MongoDB database
    await mongoose.connect(uri);

    console.log("Successfully connected to the database.");
  } catch (error) {
    console.error("Error connecting to the database:", error);
    process.exit(1); // Exit the process with failure
  }
}