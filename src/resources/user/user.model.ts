import mongoose, { Schema, InferSchemaType } from "mongoose";
import bcrypt from "bcrypt";

export interface UserSchema extends Document {
    name: string;
    email: string;
    password: string;

    isValidPassword: (password: string) => Promise<boolean>;
}


const schema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
},
    { timestamps: true }

);



schema.pre("save", async function (next) {

    if (this.isModified("password")) {

        this.password = await bcrypt.hash(this.password, 10);
    }

    return next();
});

schema.methods.isValidPassword = async function (password: string) {
    return await bcrypt.compare(password, this.password);
}



export const UserModel = mongoose.model<UserSchema>("User", schema);
