import { injectable } from "tsyringe";
import { InventoryModel } from "../schema/inventory.schema";
import { Inventory } from "../intefaces";

@injectable()
export default class InventoryRepository {
    constructor() {}

    async addInventoryItem(args: Partial<Inventory>): Promise<Inventory | null> {
        return await InventoryModel.create(args);
    }

    async findInventoryById(inventoryId: string): Promise<Inventory | null> {
        return await InventoryModel.findOne({ _id: inventoryId }).select('+_id');
    }

    async findInventoryByName(inventoryName: string): Promise<Inventory | null> {
        return await InventoryModel.findOne({ name: inventoryName }).select('+_id');
    }

    async findAllInventoryItems(): Promise<Inventory[]> {
        return await InventoryModel.find().select('+_id');
    }

    async updateInventoryItem(inventoryId: string, updateData: Partial<Inventory>): Promise<Inventory | null> {
        return await InventoryModel.findByIdAndUpdate(
            { _id: inventoryId },
            updateData,
            { new: true }
        );
    }

    async deleteInventoryItem(inventoryId: string): Promise<Inventory | null> {
        return await InventoryModel.findByIdAndDelete({ _id: inventoryId });
    }
}
