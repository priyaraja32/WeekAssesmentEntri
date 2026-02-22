const express = require("express");
const router = express.Router();
const Post = require("../models/Post");

//get post — Get all posts
//endpoits: /getPosts

router.get("/getPosts", async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//add post — Add new post
//end points: /addPosts

router.post("/addPosts", async (req, res) => {
  try {
    const newPost = new Post(req.body);
    await newPost.save();
    res.json({ message: "Post added successfully", newPost });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//delete post— Delete a post
//endpoits: /delPosts/:id-given 

router.delete("/delPosts/:id", async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    res.json({ message: "Post deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//patch method — Update a post
//endpoints: /post/:id-given 

router.patch("/post/:id", async (req, res) => {
  try {
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json({ message: "Post updated successfully", updatedPost });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;