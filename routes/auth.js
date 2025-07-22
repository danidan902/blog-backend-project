import express from "express";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import Users from '../models/Users.js'
import dotenv from 'dotenv'

dotenv.config();
const router = express.Router();

//Registration content

router.post('/register', async(req, res) => {
    try{
        const {username, email, password} = req.body;
        const hashed = await bcrypt.hash(password, 10);
        const newUsers = new Users({username, email, password: hashed});
        await newUsers.save();
        res.status(201).json({message: "User registered successfully ✅!"})

    } catch(err) {
      res.status(500).json({error: 'Registration is failed!'})
    }
});

//Login content

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await Users.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: "Invalid credentials" });
  }
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  res.json({  user: {token, username: user.username, email: user.email } });
});

export default router;

