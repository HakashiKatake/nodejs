const express = require("express")
const path = require("path")
const app = express();
const PORT = 8000;

const mongoose = require("mongoose");

const userRoute = require("./routes/user")

mongoose.connect("mongodb://localhost:27017/blog-app").then((e)=> console.log("Connected to MongoDB"));

app.set("view engine", "ejs")
app.set("views", path.resolve("./views"));

app.use(express.urlencoded({extended: false}))
app.use(express.static(path.resolve("./public")))

app.get("/", (req, res) => {
    return res.render("home");
});

app.use("/user", userRoute)


app.listen(PORT, ()=> {
    console.log(`Server started at ${PORT}`);
    
})


