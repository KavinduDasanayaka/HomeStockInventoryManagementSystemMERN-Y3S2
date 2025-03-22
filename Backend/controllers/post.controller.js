import { Post } from "../models/post.model.js";


const createPost = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "User not authenticated" });
    }
    
    // Create a new post and assign the authenticated user to the 'user' field
    const newPost = new Post({
      ...req.body,
      user: req.user._id, // Ensure the user is attached to the post
    });

    const saved = await newPost.save();
    res.json(saved);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const getAllPosts = async (req, res) => {
  try {
    // Populate the 'user' field in each post with the corresponding user details
    const posts = await Post.find().populate("user", "username country avatar");

    // Respond with the posts that include populated user details
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Like or Unlike a Post
const likepost = async (req, res) => {

  try {
    const {  _id } = req.user; // Assume frontend sends userId
    const post = await Post.findById(req.params.id);


    if (!req.user) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    if (!post) return res.status(404).json({ message: "Post not found" });

    // Check if user already liked
    const index = post.likes.indexOf(_id );
    if (index === -1) {
      post.likes.push(_id ); // Like
    } else {
      post.likes.splice(index, 1); // Unlike
    }

    await post.save();
    res.json({ likes: post.likes.length, liked: index === -1 });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



const getSpecificPost = async (req, res) => {
  try {
    const { id } = req.params;
    const specificPost = await Post.findById(id).populate("user", "username  avatar");
    if (!specificPost) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.json(specificPost);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


  const createReview = async (req, res) => {
    try {
      if (!req.user) {
        return res.status(401).json({ message: "User not authenticated" });
      }
  
      const { comment } = req.body;
      console.log(req.params.id);
      const loc = await Post.findById(req.params.id);
  
      if (loc) {
        const alreadyReviewed = loc.reviews.find(
          (x) => x.user.toString() === req.user._id.toString()
        );
  
        // if (alreadyReviewed) {
        //   return res.status(400).json({ message: "post already reviewed" });
        // }
  
        const review = {
            name: req.user.username,
            comment,
            user: req.user._id,
            avatar: req.user.avatar,
            usercountry: req.user.country,
            createdAt: Date.now()
          };          
  
        loc.reviews.push(review);
        await loc.save();
  
        res.status(201).json({ message: "Review Added" });
      } else {
        res.status(404).json({ message: "Post not found" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message });
    }
  };
  

  export { createPost ,createReview ,getAllPosts,getSpecificPost,likepost};