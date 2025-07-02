const express = require("express")

const mongoose = require("mongoose")

const users = require("../MOCK_DATA.json")

const app = express()
const PORT = 8000

// Middleware to parse JSON bodies
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

mongoose.connect('mongodb://127.0.0.1:27017/nodejs')
.then(()=> console.log("MongoDb connected")
).catch((err) => console.log("Mongo error", err))

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    jobTitle: {
        type: String,
    },
    gender: {
        type: String,
    }, 
    

}, {timestamps: true})

const User = mongoose.model("user", userSchema)

app.post("/api/users", async (req, res)=> {
    const body = req.body;

    if (
        !body ||
        !body.first_name ||
        !body.last_name ||
        !body.email || 
        !body.gender ||
        !body.job_title
    ) {
        return res.status(400).json({
            msg: "All fields are req.."
        })
    }

    const result = await User.create({
        firstName: body.first_name,
        lastName: body.last_name,
        email: body.email,
        gender: body.gender,
        jobTitle: body.job_title,
    });

    console.log("result", result);

    return res.status(201).json({msg: "success"})


    
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}
);

