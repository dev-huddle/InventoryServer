import { Request, Response, NextFunction, Router } from "express";
import { container } from "tsyringe";
import InventoryController from "../controllers/inventory.controller";
import { validateMiddleware, authMiddleware } from "../../../shared/middleware";
import { addInventorySchema, deleteInventorySchema, getInventorySchema, updateInventorySchema } from "../validations";

const inventoryRouter = Router();
const inventoryController = container.resolve(InventoryController);

// Add a new inventory item
inventoryRouter.post(
    "/inventory",
    authMiddleware,
    validateMiddleware(addInventorySchema, "body"),
    async (req: Request, res: Response, next: NextFunction) => {
        await inventoryController.addInventory(req, res, next);
    }
);

// Get an inventory item by ID
inventoryRouter.get(
    "/inventory/:id",
    authMiddleware,
    validateMiddleware(getInventorySchema, "params"),
    async (req: Request, res: Response, next: NextFunction) => {
        await inventoryController.getInventory(req, res, next);
    }
);

// Get all inventory items
inventoryRouter.get(
    "/inventory",
    authMiddleware,
    async (req: Request, res: Response, next: NextFunction) => {
        await inventoryController.getAllInventory(req, res, next);
    }
);

// Update an inventory item
inventoryRouter.put(
    "/inventory/:id",
    authMiddleware,
    validateMiddleware(updateInventorySchema, "body"),
    async (req: Request, res: Response, next: NextFunction) => {
        await inventoryController.updateInventory(req, res, next);
    }
);

// Delete an inventory item
inventoryRouter.delete(
    "/inventory/:id",
    authMiddleware,
    validateMiddleware(deleteInventorySchema, "params"),
    async (req: Request, res: Response, next: NextFunction) => {
        await inventoryController.deleteInventory(req, res, next);
    }
);

export default inventoryRouter;
