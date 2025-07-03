const express = require("express")
const urlRoute = require("./routes/url")
const staticRoute = require("./routes/staticRouter")
const URL = require("./models/url")
const path = require("path")
const {connectToMongoDB} = require("./connect")


const app = express();
const PORT = 8001

connectToMongoDB("mongodb://127.0.0.1:27017/short-url").then(()=> console.log("Connected to mongodb"))


app.set("view engine", "ejs")
app.set("views", path.resolve("./urlShortner/views"))
app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use("/",staticRoute)

app.get("/test", async (req, res) => {
    const allUrls = await URL.find({})
    return res.render("home", {
        urls: allUrls,
    
    })
})
app.use("/url", urlRoute)




app.listen(PORT, ()=> console.log(`Server started at PORT ${PORT}`))