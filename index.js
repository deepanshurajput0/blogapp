import express from "express"
import connectDB from "./db/db.js"
import router from "./routes/userRoutes.js"
import cors from "cors"
import dotenv from "dotenv"
const app = express()
const PORT = process.env.PORT || 8000
dotenv.config() 

app.use(cors())
app.use(express.json())
app.use(express.static("public/upload"))
app.use("/",router)

app.listen( PORT ,()=>{
  console.log(`Server is running on the ${PORT}`)
})
connectDB()