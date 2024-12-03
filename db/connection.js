import mongoose from "mongoose";
export const connectDb = () =>{
    mongoose.connect('mongodb://127.0.0.1/newMongoose').then(()=>{
        console.log('db connected successfully')
    }).catch(err=>{
        console.log('fail to connect to db')
    })
} 