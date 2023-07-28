import mongoose from "mongoose";

const user = new mongoose.Schema({
    name:{
        type:String,
    },
    email:{
        type:String,
    },
    password:{
        type:String, 
    }
})

const usermodel=  mongoose.model("userdata",user)
export default usermodel; 