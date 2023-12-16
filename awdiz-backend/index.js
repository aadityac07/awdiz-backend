import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import morgan from 'morgan'
import cors from 'cors'
import router from './Routes/index.js'

const app = express();
app.use(morgan('dev'))
dotenv.config()
app.use(cors())
app.use(express.json())

app.get("/",function(req ,res){
    res.send('successfully started server')
})

app.use("/api/v1",router);

mongoose.connect(process.env.MONGOURL).then(()=>console.log('mongoDb connected'))

app.listen(process.env.PORT,()=>console.log('successfully started at port '+ process.env.PORT))