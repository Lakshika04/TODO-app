import express from 'express'
import connectDb from './config/database.js';
import router from './routes/todo.route.js';
import cors from 'cors'

const app = express();
app.use(cors())
app.use(express.json())

connectDb();

app.use('/api',router)
app.listen(5000,()=>{
    console.log("server running on port 5000")
})