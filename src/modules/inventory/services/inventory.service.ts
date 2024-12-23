import { injectable } from "tsyringe";
import { AddInventoryInput, AddInventoryOutput, GetInventoryOutput, GetAllInventoryOutput, UpdateInventoryOutput, UpdateInventoryInput } from "../interfaces";
import { InventoryRepository } from "../../../shared/database/repositories";
import { BadRequestError } from "../../../shared/errors";

@injectable()
export default class InventoryService {
    constructor(
        private inventoryRepository: InventoryRepository
    ) {}

    // Add new inventory item
    async addInventory(args: AddInventoryInput): Promise<AddInventoryOutput> {
        const { name } = args;

        // Check if the inventory item already exists
        const existingItem = await this.inventoryRepository.findInventoryByName(name);

        if (existingItem) {
            throw new BadRequestError("Inventory item already exists", {
                name,
                timestamp: new Date()
            });
        }

        // Add the new inventory item
        const newItem = await this.inventoryRepository.addInventoryItem(args);

        return {
            item: newItem!
        };
    }

    // Get inventory item by ID
    async getInventory(inventoryId: string): Promise<GetInventoryOutput> {
        const inventoryItem = await this.inventoryRepository.findInventoryById(inventoryId);

        if (!inventoryItem) {
            throw new BadRequestError("Inventory item not found", {
                inventoryId,
                timestamp: new Date()
            });
        }

        return {
            item: inventoryItem
        };
    }

    // Get all inventory items
    async getAllInventory(): Promise<GetAllInventoryOutput> {
        const inventoryItems = await this.inventoryRepository.findAllInventoryItems();

        return {
            items: inventoryItems
        }
    }

    // Update inventory item details
    async updateInventory(itemId: string, args: UpdateInventoryInput): Promise<UpdateInventoryOutput> {

        // Find the inventory item by ID
        const inventoryItem = await this.inventoryRepository.findInventoryById(itemId);

        if (!inventoryItem) {
            throw new BadRequestError("Inventory item not found", {
                itemId,
                timestamp: new Date()
            });
        }

        // Update the inventory item
        const updatedItem = await this.inventoryRepository.updateInventoryItem(itemId, args);

        return {
            item: updatedItem!
        };
    }

    // Delete an inventory item
    async deleteInventory(itemId: string): Promise<void> {

        const inventoryItem = await this.inventoryRepository.findInventoryById(itemId);

        if (!inventoryItem) {
            throw new BadRequestError("Inventory item not found", {
                itemId,
                timestamp: new Date()
            });
        }
        await this.inventoryRepository.deleteInventoryItem(itemId);
    }
}
