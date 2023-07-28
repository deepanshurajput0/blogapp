import express from "express"
import { registration, userLogin } from "../controllers/userControllers.js" 
import { getAllBlogs, addNewBlog, getSingleBlog, Updateblog, deleteBlog } from "../controllers/blogController.js"
import { addNewCategory, getAllCategories } from "../controllers/categoryController.js"
import multer from "multer"
import checkIsUserAuthenticated from "../middlewares/authMiddleware.js"
const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null, `public/upload/`); 
    },
    filename: function (req,file,cb){
        cb(null, `${Date.now()}-${file.originalname}`); 
    }
})
const upload = multer({ storage: storage})
const router = express.Router()

router.route("/register").post(registration)
router.route("/login").post(userLogin)

// Protected Routes 

router.get("/get/blogs", checkIsUserAuthenticated, getAllBlogs)
router.post("/add/blog", checkIsUserAuthenticated ,upload.single("thumbnail") , addNewBlog)
router.get("/get/blog/:id", checkIsUserAuthenticated ,getSingleBlog) 

router.get("/get/categories", checkIsUserAuthenticated ,getAllCategories)
router.post("/add/category", checkIsUserAuthenticated ,addNewCategory) 
router.put("/update/:id", checkIsUserAuthenticated,Updateblog)
router.delete("/blog/:id", checkIsUserAuthenticated,deleteBlog)
export default router