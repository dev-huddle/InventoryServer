import mongoose from "mongoose";
import { Inventory } from "../intefaces";

const inventorySchema = new mongoose.Schema<Inventory>(
    {
      name: { type: String, required: true },
      description: { type: String, required: true },
      price: { type: Number, required: true },
      quantity: { type: Number, required: true },
    },
    {
      timestamps: true
    }
  );
  
  export const InventoryModel = mongoose.model<Inventory>(
    "Inventory",
    inventorySchema
  );