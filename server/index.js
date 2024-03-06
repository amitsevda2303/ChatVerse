const express = require("express")
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const userRoutes = require("./Routes/userRoutes")

const app = express();
dotenv.config()


app.use(cors())
app.use(express.json())

app.use("/api/auth", userRoutes)

mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log("DB connection established");
}).catch(err => {console.log(err.message)});

app.get('/', (req, res) => res.send('Hello Server!'))
app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running on port ${process.env.PORT || 3000}`);
});

