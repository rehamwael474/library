import { Author } from "../../../db/models/author.model.js"
import { Book } from "../../../db/models/book.model.js"

export const addBook = async(req,res,next)=>{
try {
    // get data from req
const {title,content,author,puplishedDate} = req.body
// check existence
const authorExist = await Author.findById(author)
if(!authorExist){
    throw Error('author not found',{cause:404})
}
const bookExist = await Book.findOne({title})
if(bookExist){
  throw Error ("book already exist",{cause:409})
}
// add book
const createdBook = await Book.create({title,content,author,puplishedDate}) 
if(!createdBook){
    throw Error ('fail to create book',{cause:500})
}
authorExist.books.push(createdBook._id)
await authorExist.save()

return res.status(201).json({message:"book created successfully",
    success:true,
    data:createdBook
})

} catch(error){
    return res.status(error.cause || 500).json({message:error.message,success:true})

}

}

export const getAllBooks = async(req,res,next)=>{
  const books = await Book.find().populate([{ path: "author",select:"name bio  -_id"}])
  return res.json({books})
}

export const getBookById = async (req, res, next) => {
  try {
    const book = await Book.findById(req.params.id).populate("author");

    if (!book) {
     throw Error ('Book not found',{cause:404});
    }
    return res.status(200).json({message:"success",success:true,book})

    
  } catch (error) {
   return res.status(error.cause || 500).json({message:error.message,success:false})
  }
}
export const updateBookById = async (req,res,next) => {
    const book  = await Book.findByIdAndUpdate(req.params.id,req.body,{new:true})
    return res.status(200).json({message: "successs",book})

  }

export const deleteBookById = async (req,res,next) =>{
    const book = await Book.findByIdAndDelete(req.params.id,req.body)
    if(!book) return res.status(404).json({message:"book not found"})
    return res.status(200).json({message: "successs",book})

  }

