import jwt from 'jsonwebtoken';
import { Blog } from '../models/blog.js';
import { Comment } from '../models/comment.js';

export const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ success: false, message: 'Email and password are required' });
        }

        if (email !== String(process.env.ADMIN_EMAIL) || password !== String(process.env.ADMIN_PASSWORD)) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }
        console.log("Signing token with secret:", process.env.JWT_SECRET);
        const token = jwt.sign({ email}, process.env.JWT_SECRET, { expiresIn: '2h' });
        res.status(200).json({ success: true, token });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
// ✅ Get all blogs (Admin)
export const getAllBlogsAdmin = async (req, res) => {
    try {
        const blogs = await Blog.find({}).sort({ createdAt: -1 });
        res.json({ success: true, blogs });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

// ✅ Get all comments
export const getAllComments = async (req, res) => {
    try {
        const comments = await Comment.find({}).populate('blog').sort({ createdAt: -1 });
        res.json({ success: true, comments });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

// ✅ Get dashboard data
export const getDashboard = async (req, res) => {
    try {
        const recentBlogs = await Blog.find({}).sort({ createdAt: -1 }).limit(5);
        const blogs = await Blog.countDocuments();
        const comments = await Comment.countDocuments();
        const drafts = await Blog.countDocuments({ isPublished: false });

        const dashBoardData = {
            blogs,
            comments,
            recentBlogs,
            drafts
        };

        res.json({ success: true, dashBoardData });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

// ✅ Delete comment by ID
export const deleteCommentsById = async (req, res) => {
    try {
        const { id } = req.body;
        await Comment.findByIdAndDelete(id);
        res.json({ success: true, message: 'Comment deleted successfully!!' });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

// ✅ Approve comment by ID
export const approveCommentById = async (req, res) => {
    try {
        const { id } = req.body;
        await Comment.findByIdAndUpdate(id, { isApproved: true });
        res.json({ success: true, message: 'Comment approved successfully!!' });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};
