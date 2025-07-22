import express from "express";
import Post from "../models/Post.js"; 

const router = express.Router();

// GET all posts (sorted by latest)
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch posts." });
  }
});

// POST a new blog post
router.post("/", async (req, res) => {
  const { title, content, author } = req.body;

  try {
    const newPost = new Post({ title, content, author });
    await newPost.save();
    res.status(201).json({ message: "✅ Post is Created Successfully!" });
  } catch (err) {
    res.status(500).json({ error: "Failed to create post." });
  }
});

export default router;
