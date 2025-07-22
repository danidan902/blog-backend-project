import express, { json } from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
import authRoutes from './routes/auth.js'
import postRoutes from './routes/posts.js'
const PORT = process.env.PORT

dotenv.config();
const app = express();
app.use(cors(
  origin: 'https://daniblog.vercel.app', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
));
app.use(express.json());

app.use('/api/auth', authRoutes)
app.use('/api/posts',  postRoutes)

mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,

} ).then(() => {
    console.log('MongoDB connected successfuly ✅');

    app.listen(PORT, () => {
    console.log(`Server running on Port https://localhost:${PORT}`)

})
  
}).catch(err => console.log('Server error is not work', err))


