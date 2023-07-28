import mongoose from "mongoose";
const connectDB=async()=>{
      await mongoose.connect(process.env.DB_URL) 
     .then(()=>{
        console.log(`Database Connected SuccessFully`)
     }) .catch((error)=>{
       console.log(error) 
     })
     
}
export default connectDB 