import { Base } from "./base.interface";

export interface Inventory extends Document, Base {
    name: string;
    description: string;
    price: number;
    quantity: number;
}