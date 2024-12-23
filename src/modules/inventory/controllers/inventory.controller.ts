import { injectable } from "tsyringe";
import { Request, Response, NextFunction } from "express";
import { InventoryService } from "../services";
import { sendResponse } from "../../../shared/utils";
import { StatusCode } from "../../../shared/constants";

@injectable()
export default class InventoryController {
    constructor(
        private inventoryService: InventoryService
    ) {}

    // Add a new inventory item
    async addInventory(req: Request, res: Response, next: NextFunction) {
        try {
            const response = await this.inventoryService.addInventory(req.body);

            sendResponse({
                res,
                status: "success",
                statusCode: StatusCode.CREATED,
                message: "Inventory item successfully added",
                data: response
            });
        } catch (err: any) {
            next(err);
        }
    }

    // Get inventory item by ID
    async getInventory(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;

            const response = await this.inventoryService.getInventory(id);

            sendResponse({
                res,
                status: "success",
                statusCode: StatusCode.OK,
                message: "Successfully retrieved inventory item",
                data: response
            });
        } catch (err: any) {
            next(err);
        }
    }

    // Get all inventory items
    async getAllInventory(req: Request, res: Response, next: NextFunction) {
        try {
            const response = await this.inventoryService.getAllInventory();

            sendResponse({
                res,
                status: "success",
                statusCode: StatusCode.OK,
                message: "Successfully retrieved all inventory items",
                data: response
            });
        } catch (err: any) {
            next(err);
        }
    }

    // Update inventory item
    async updateInventory(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;

            const response = await this.inventoryService.updateInventory(id, req.body);

            sendResponse({
                res,
                status: "success",
                statusCode: StatusCode.NO_CONTENT,
                message: "Inventory item successfully updated",
            });
        } catch (err: any) {
            next(err);
        }
    }

    // Delete an inventory item
    async deleteInventory(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;

            await this.inventoryService.deleteInventory(id);

            sendResponse({
                res,
                status: "success",
                statusCode: StatusCode.NO_CONTENT,
                message: "Inventory item successfully deleted"
            });
        } catch (err: any) {
            next(err);
        }
    }
}
