import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema;
import User from "./user.model.js";  // Import User model

const reviewSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    comment: { type: String, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    usercountry: {
      type: String,
      required: true,
      ref: "User",
    },
    isliked : {
        type: Boolean,
        default: false,
    },
    avatar: {
        type: String,
        default: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    },
    createdAt:{
        type: Date,
    },
  },
  { timestamps: true }
);

const postschema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    avatar: { type: String },
    detail: { type: String, required: true },
    ingredients: [{ type: String }],  //change cast to type
    reviews: [reviewSchema],
    user: { 
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",  
      required: true,
    },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    score: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postschema);
export {Post};