import express from "express";
import bodyParser from "body-parser";
const app = express();
import router from "./routes/router.js"
import connectDB from "./database/dbConnection.js"
import dotenv from "dotenv";
import cors from "cors";


app.use(cors());
connectDB()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
dotenv.config()
app.use('/',router)

const PORT=process.env.PORT;

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
});