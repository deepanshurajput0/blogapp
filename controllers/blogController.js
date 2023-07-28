import  blogModel from "../models/blogModel.js"
export const getAllBlogs=async(req,res)=>{
   try { 
    const fetchAllBlogs = await blogModel.find({user: req.user._id});
    return res.status(200).json(fetchAllBlogs) 
    
   } catch (error) {
    return res.status(400).json({message: error.message})
   }
}

export const addNewBlog = async(req,res)=>{
  const {title,category,description} = req.body;
  try {
    if(title && category && description){
        const addBlog = new blogModel({
            title: title,
            description: description,
            category: category,
            thumbnail: req.file.filename,
            user: req.user._id, 
        })
        const savedBlog = await addBlog.save()
        if(savedBlog){
          return res.status(200).json({message: "Blog Added SuccessFully"}) 
        }
    }else{
        return res.status(400).json({message: "All fields are required"}) 
    }
  } catch (error) {
    return res.status(400).json({message: error.message})
  }
}

export const getSingleBlog= async(req,res)=>{
   const {id} = req.params;
   try {
    if(id){
      const fetchBlogsByID = await blogModel.findById(id); 
      return res.status(200).json(fetchBlogsByID)
    }else{
      return res.status(400).json({message: "Invalid URL"})
    }
   } catch (error) {
      return res.status(400).json({message: error.message})
   }
}

export const Updateblog=async(req,res)=>{
  const {id} = req.params
  try {
    if(id){
      const getUpdateData= await blogModel.findByIdAndUpdate(id,req.body)
      return res.status(200).json(getUpdateData)  
    }else{
      return res.status(400).json({message: "Id not found"})
    }
    
  } catch (error) {
    return res.status(400).json({message: error.message})
  }
}

export const deleteBlog=async(req,res)=>{
  const {id} = req.params
  try {
    if(id){
     const getDataDeleted= await blogModel.findByIdAndDelete(id)
     return res.status(200).json({message:"Deleted SuccessFully"})
    }else{
      return res.status(400).json({message: "Invalid User Id"}) 
    }
  } catch (error) {
    return res.status(400).json({message: error.message})
  }
}