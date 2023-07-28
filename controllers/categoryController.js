import categoryModel from "../models/categoryModel.js"
export const getAllCategories = async(req,res)=>{
   try {
    const fetchAllCategories = await categoryModel.find({}) 
    return res.status(200).json(fetchAllCategories) 
   } catch (error) {
    return res.status(400).json({message: error.message}) 
   }
}
export const addNewCategory = async(req,res)=>{
    const {title} = req.body
    try {
        if(title){
          const newCategory = new categoryModel({
            title,
          }) 
          const savedCategory = await newCategory.save();
          if(savedCategory){
            return res.status(200).json({message: "Category added successfully"}) 
          }
        }else{
        return res.status(400).json({message: "all fields are required"}) 
        }
        
    } catch (error) {
        return res.status(400).json({message: error.message}) 
    }
}

