
import express, { Application } from "express"
import cors from "cors"
import mongoose from "mongoose"
import config from "./config"
import { bookController } from "./modules/book/book.controller"
import routes from "./routes"

const app = express()

app.use(cors())
app.use(express.json())
app.use(routes)

app.get("/", (req,res)=>{
    res.send({success:true, message:"welcome to library management app"})
})



app.listen(config.PORT, ()=>{
    console.log(`server is running at ${config.PORT}`)
})

 async function server(){
    try {
        await mongoose.connect(config.DATABASE_URL!)
        console.log(`Connected to the DB server successfully`)
    } catch (error) {
        console.log(`server error ${error}`)
    }
}

server();

