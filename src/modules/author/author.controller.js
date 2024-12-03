import { query } from "express"
import { Author } from "../../../db/models/author.model.js"

export const addAuthor = async (req,res,next)=>{
    try{
    //get data from req
    const {name,bio,birthDate,books} = req.body
    //check existence
    const authorExist = await Author.findOne({name})
    if(authorExist){
      throw Error ('author already exist',{cause:409})
  }
   
    //add to db
    const createdAuthor = await (await Author.create({name,bio,birthDate,books})).populate([{path:"books",select:"title content -_id"}])
    if(!createdAuthor){
        throw Error ('fail to create author',{cause:500})
    }
    //send response
    return res.status(201).json({message:"author created successfully",
        success:true,
        data:createdAuthor
    })

} catch (error){
    return res.status(error.cause || 500).json({message:error.message,success:false})
}

   
}
export const getAllAuthors = async(req,res,next)=>{
  const authors = await Author.find().populate([{ path: "books",select:"title author  -_id"}])
  return res.json({authors})
 }
 

export const getAuthorById = async (req, res, next) => {
   
  
    try {
      const author = await Author.findById(req.params.id).populate("books");
  
      if (!author) {
       throw Error ('Author not found',{cause:404});
      }
      return res.status(200).json({message:"success",success:true,author})
  
      
    } catch (error) {
     return res.status(error.cause || 500).json({message:error.message,success:false})
    }
  }

export const updateAuthorBYId = async (req,res,next) => {
    const author  = await Author.findByIdAndUpdate(req.params.id,req.body,{new:true})
    return res.status(200).json({message: "successs",author})

  }

export const deleteAuthorById = async (req,res,next) =>{
    const author = await Author.findByIdAndDelete(req.params.id,req.body)
    if(!author) return res.status(404).json({message:"author not found"})
    return res.status(200).json({message: "successs",author})

  }