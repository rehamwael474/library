import { Router } from "express";
import * as authorController from "./author.controller.js"

const authorRouter = Router()

// add author 
authorRouter.post('/',authorController.addAuthor)
authorRouter.get('/',authorController.getAllAuthors)
authorRouter.get("/:id",authorController.getAuthorById)
authorRouter.patch("/:id",authorController.updateAuthorBYId)
authorRouter.delete("/:id",authorController.deleteAuthorById)
export default authorRouter
