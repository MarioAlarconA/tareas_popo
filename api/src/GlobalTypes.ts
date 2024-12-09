import { Schema } from "mongoose";
export interface IUser {
    name: string;
    email: string;
    lastname: string;
    password: string;
    rol: "administrator" | "client";
}

export interface IHomework {
    title: String;
    description: string,
    date: Date
    userId: Schema.Types.ObjectId | string
}
