import { Inventory } from "../../../shared/database/intefaces";

export interface AddInventoryInput {
    name: string;
    description: string;
    price: number;
    quantity: number;
}

export interface AddInventoryOutput {
    item: Inventory
}

export interface GetInventoryOutput {
    item: Inventory
}

export interface GetAllInventoryOutput {
    items: Inventory[]
}

export interface UpdateInventoryInput extends Partial<Inventory> {

}

export interface UpdateInventoryOutput {
    item: Inventory
}