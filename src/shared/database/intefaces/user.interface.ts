import { Base } from "./base.interface";

export interface User extends Document, Base {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    refreshToken?: string;
}