import { Router } from "express";
import * as bookController from "./book.controller.js"
const bookRouter = Router()
//add book
bookRouter.post('/',bookController.addBook)
bookRouter.get("/",bookController.getAllBooks)
bookRouter.get("/:id",bookController.getBookById)
bookRouter.patch("/:id",bookController.updateBookById)
bookRouter.delete("/:id",bookController.deleteBookById)


export default bookRouter