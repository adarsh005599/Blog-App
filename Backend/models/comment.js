import mongoose, { Schema } from "mongoose";

const commentSchema = new mongoose.Schema
({
    blog:{type: mongoose.Schema.Types.ObjectId, ref: 'blog', required:true},
    name:{type:String, required:true},
    content:{type:String, default:false},
    isApproved:{type: Boolean, default:false}


},{timestamps:true});

const Comment = mongoose.model("Comment", commentSchema)

export {Comment}