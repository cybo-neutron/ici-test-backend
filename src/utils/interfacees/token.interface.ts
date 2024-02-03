import { Schema } from "mongoose";


export interface Token extends Object {
    expiresIn: number,
    name: string,
    email: string,
    user_id: Schema.Types.ObjectId,
}