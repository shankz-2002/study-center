import express from 'express'
import fieldRouter from './routes/field.route.js';
import { errorHandler } from './middleware/errorHandler.js';
import categoryRouter from './routes/category.route.js';
import cors from 'cors'
import 'dotenv/config'
const app=express();
app.use(cors({
    origin:process.env.FRONTEND_URL
}))

app.use(express.json());

app.use("/field",fieldRouter);
app.use("/category",categoryRouter);

app.use(errorHandler);

app.get("/health",(req,res)=>{
    res.send({
        "msg":"working properly"
    })
})

export default app;