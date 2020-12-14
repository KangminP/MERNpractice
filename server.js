// ENV
require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

// var corsOptions = {
//     origin: true,
// };

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Node.js의 native Promise 사용
mongoose.Promise = global.Promise;

// connect mongodb
mongoose
    .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    })
    .then(() => console.log("Successfully connected to mongodb"))
    .catch((e) => console.error(e));

// routes
app.use("/api/article", require("./routes/articles"));
app.use("/api/user", require("./routes/users"));

// set port, listen for request
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on prot ${PORT}.`);
});
