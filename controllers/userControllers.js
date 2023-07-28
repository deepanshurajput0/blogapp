import jwt from "jsonwebtoken"
import usermodel from "../models/userModel.js";
import bcryptjs from "bcryptjs"
export const registration = async (req, res) => {
  const {name, email, password} = req.body;
  try {
    if (name && email && password) {
        const isUser = await usermodel.findOne({email:email})
          if(!isUser){
            // password 
            const gensalt = await bcryptjs.genSalt(10)
            const hashedPassword = await bcryptjs.hash(password,gensalt)
            // save user 
            const newUser = usermodel({
               name,
               email,
               password: hashedPassword, 
            })
            const savedUser = await newUser.save() 
            if(savedUser){
                return res.status(400).json({
                    message: "User Registration SuccessFully",
                  });
            }
          }else{
            return res.status(400).json({
                message: "Email Already exists",
              });
          }
    } else {
      return res.status(400).json({
        message: "All fields are required",
      });
    }
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};


export const userLogin =async(req,res)=>{
   const {email, password} = req.body
   try {
    if(email && password){
      const isEmail = await usermodel.findOne({email:email})
      if(isEmail){
         if(isEmail.email === email && await bcryptjs.compare(password,isEmail.password)){
           /// generate token 
           const token = jwt.sign({userID: isEmail._id},"pleasesubscribe",{
            expiresIn:"2d" 
           })
           return res.status(200).json({
            message: "Login SuccessFully",
            token,
            name: isEmail.name,
          });
         }else{
          return res.status(400).json({
            message: "Wrong credentials",
          });
         }
      }else{
        return res.status(400).json({
          message: "Email Id not found",
        });
      }
    }else{
      return res.status(400).json({
        message: "All fields are required",
      });
    }
    
   } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
   }
}