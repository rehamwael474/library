import express from 'express'
import {connectDb} from './db/connection.js'
import authorRouter from './src/modules/author/author.router.js'
import bookRouter from './src/modules/book/book.router.js'
const app = express()
const port = 3000
app.use(express.json())
// create connection
connectDb()



app.use('/author',authorRouter)
app.use('/book',bookRouter)
app.listen(port,()=> {
    console.log("server is running on port",port)
})
