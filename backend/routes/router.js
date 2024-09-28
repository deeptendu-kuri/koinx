import {Router} from "express";
import multer from "multer"
import {uploadCSV} from "../controller/tradeController.js"


const router = Router()

const upload=multer({dest:"/uploads"})

router.get('/',(req,res)=>{
    res.send('Hello World');
})

router.post('/upload', upload.single('file'),uploadCSV);


export default router;