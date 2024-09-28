import express from "express";
const app = express();
import router from "./routes/router.js"
import connectDB from "./database/dbConnection.js"
import dotenv from "dotenv";
import cors from "cors";
app.use(cors());


dotenv.config()
connectDB()
app.use('/',router)

app.listen(5000,()=>{
    console.log("Server is running on port 5000")
});