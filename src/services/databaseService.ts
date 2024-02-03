import { config } from "dotenv";
config();
import mongoose from "mongoose";

export async function connectMongooseDB() {

    if (process.env.DATABASE_URL) {
        mongoose.connect(process.env.DATABASE_URL);
        mongoose.connection.on("connected", () => {
            console.log('Connected to DB')
        });

        mongoose.connection.on('error', (err) => {
            console.log("Error while connecting to DB");
            console.log(err);
        })
    }
}