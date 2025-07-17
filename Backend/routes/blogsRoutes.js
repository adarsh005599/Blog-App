import express from 'express';
import {
  deleteBlogById,
  getBlogById,
  getAllBlogs,
  togglePublish,
  addComment,
  getBlogComments
} from '../controllers/blogController.js';
import { upload } from '../middleware/mutter.js';
import { auth } from '../middleware/auth.js';
import { addBlog } from '../controllers/blogController.js';

const blogRouter = express.Router();

// Protected blog creation
blogRouter.post("/add", auth, upload.single('image'), addBlog); // ✅ auth BEFORE upload


// Public routes
blogRouter.get("/all", getAllBlogs);
blogRouter.get("/:blogId", getBlogById);

// Admin routes (protected)
blogRouter.post("/delete", auth, deleteBlogById);
blogRouter.post("/toggle", auth, togglePublish);

// Comments (unprotected or optionally token-guarded)
blogRouter.post("/addcomment", addComment);
blogRouter.post("/comments", getBlogComments);

export { blogRouter };
