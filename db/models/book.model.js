import {Schema,Types,model} from "mongoose";
//schema
const bookSchema = new Schema({
    title :{
        type:String,
        required: true
    },
    content:{
        type: String,
        max:1000,
        required: true
    },
    author: {
        type:Schema.Types.ObjectId,
        required: true
    },
    publishedDate: {
        type:Date,
        default: Date.now

    }
   
    
},{timestamps:true})

//model
export const Book = model('Book',bookSchema)