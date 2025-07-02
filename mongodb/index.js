


const userRouter = require("./routes/user")
const { connectMongoDb } = require("./connection")
const { logReqRes } = require("./middlewares/index") 

const express = require("express")
const app = express()
const PORT = 8000

//connection
connectMongoDb("mongodb://127.0.0.1:27017/nodejs").then(()=> console.log("Mongodb Connected"))

// Middleware to parse JSON bodies
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

//logs
app.use(logReqRes("log.txt"))

//Routes
app.use("/user", userRouter)



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}
);

