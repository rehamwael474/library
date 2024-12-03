import {Schema,Types,model} from 'mongoose'

//schema
const AuthorSchema = new Schema({
    name:{
    type :String,
    required: true,
    trim:true
    },
    bio:{
        type:String,
        lowercase: true,
        required: true
    },
    birthDate:String,
    books:[{
        type:Schema.Types.ObjectId,
        ref:"Book"
    }]
   
},{timestamps: true})
//model
 
export const Author = model('Author' , AuthorSchema)