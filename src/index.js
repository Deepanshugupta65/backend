
// require('dotenv').config({path:'./env'})
import dotenv from "dotenv"
import connectDB from "./db/index.js"


dotenv.config({
    path:'./env'
})


connectDB()
.then(()=>{
    app.listen(process.env.PORT || 8000 ,()=>{
        console.log(`server is running at port : ${process.env.PORT}`)
    })
})
.catch((err)=>{
    console.log("Mongo db connection failed !!! ",err);
})



/*
import express from "express"
const app = express()
(async()=>{
    try{
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        app.on("error",()=>{
            console.log("error",error);
            throw err
        })
        app.listen(process.env.PORT,()=>{
            console.log('App is listening on port ${process.env.PORT}');
        })
        
    }catch(error){
        console.log("ERROR",error)
        throw err
    }
})()

*/