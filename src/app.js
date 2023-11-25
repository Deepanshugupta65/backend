import express from "express"
import connectDB from "./db"
import cookieParser from "cookie-parser"


const app = express()

app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credential:true
}))

app.use(express.json({limit:"16kb"}))

// for url data come  extended i.e. object nested
app.use(express.urlencoded({extended:true,limit:"16kb"}))
// files storage img , file any one can access
app.use(express.static("public"))

app.use(cookieParser())
export {app}