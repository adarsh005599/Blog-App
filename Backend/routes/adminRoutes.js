import express, { Router } from 'express'
import { adminLogin, approveCommentById, deleteCommentsById, getAllComments, getDashboard } from '../controllers/adminController.js';
import { getAllBlogs } from '../controllers/blogController.js';
import { auth } from '../middleware/auth.js';
``
const adminRouter = express.Router();

adminRouter.post("/login", adminLogin);
adminRouter.get("/comments",auth, getAllComments);
adminRouter.get("/blogs",auth, getAllBlogs);
adminRouter.post("/deleteComment",auth, deleteCommentsById);
adminRouter.post("/approvedcomment",auth, approveCommentById);
adminRouter.get("/dashboard", auth, getDashboard);


export {adminRouter}
