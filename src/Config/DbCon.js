import mongoose from "mongoose";
import envConfig from "./envConfig.js";

const URL = envConfig.mongo.uri;
export const connectDB  = async () => {
    try {
        mongoose.connect(URL);
        const { connection } = mongoose;
        connection.once("open", () => {
            console.log("Connected To MongoDB");
        })
    } catch (error) {
        console.log("Error Connecting DB " + error);
    }
}