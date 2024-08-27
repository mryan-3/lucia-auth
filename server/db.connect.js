import mongoose from "mongoose";
import { Logger } from "borgen";
import { config } from "./config/config.js";

mongoose.set("strictQuery", true);


const connectDb = (StartServer) => {
    mongoose
        .connect(config.mongo.url)
    .then(() => {
        Logger.info({ message: "MongoDB Connected" });

        StartServer();
    })
    .catch((error) => {
        Logger.error({ message: error });
    });
}

export default connectDb
