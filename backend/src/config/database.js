import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config();

const connectDb =async()=>{
    try{
     const mongoDbUrl=process.env.MONGO_URL  
     await mongoose.connect(mongoDbUrl)
     console.log("database is connected successfully")
    }
    catch (error){
       console.log("connection failed",error)
    }
}

export default connectDb