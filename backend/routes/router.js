import {Router} from "express";
import multer from "multer"
import {uploadCSV} from "../controller/tradeController.js"
import { getBalance } from "../controller/balanceController.js";


const router = Router()

const upload=multer({dest:"/uploads"})

router.post('/upload', upload.single('file'),uploadCSV);
router.post('/balance',getBalance)

export default router;