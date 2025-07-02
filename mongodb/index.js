


const users = require("../MOCK_DATA.json")


const app = express()
const PORT = 8000

// Middleware to parse JSON bodies
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

mongoose.connect('mongodb://127.0.0.1:27017/nodejs')
.then(()=> console.log("MongoDb connected")
).catch((err) => console.log("Mongo error", err))






app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}
);

