import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_DB_URI);
        console.log("Database Connected Successfully");
    }
    catch(error) {
        console.log(`Error Connecting to Database ${error.message}`);
    }
}; 

export default connectDb;