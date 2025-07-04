const express = require("express")
const {restrictToLoggedinUsersOnly, checkAuth} = require('./middlewares/auth')
const URL = require("./models/url")
const path = require("path")
const {connectToMongoDB} = require("./connect")

//routes export
const urlRoute = require("./routes/url")
const staticRoute = require("./routes/staticRouter")
const userRoute = require("./routes/user")
const cookieParser = require("cookie-parser")


//config
const app = express();
const PORT = 8001


//db connection
connectToMongoDB("mongodb://127.0.0.1:27017/short-url").then(()=> console.log("Connected to mongodb"))

//middlewares
app.set("view engine", "ejs")
app.set("views", path.resolve("./urlShortner/views"))
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cookieParser())

//routes
app.use("/", checkAuth, staticRoute)
app.use("/url", restrictToLoggedinUsersOnly, urlRoute)
app.use("/user", userRoute)


// app.get("/test", async (req, res) => {
//     const allUrls = await URL.find({})
//     return res.render("home", {
//         urls: allUrls,
    
//     })
// })

app.listen(PORT, ()=> console.log(`Server started at PORT ${PORT}`))