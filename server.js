const express = require("express");
const dotenv = require("dotenv")

dotenv.config({ path: "./config.env" })


const app = express();

//Main Route
app.use('/', require('./routes/questions'))

//PORT
const port = process.env.PORT || 8000;



//Handle Production
if (process.env.NODE_ENV === "production") {
    //set static folder
    app.use(express.static(__dirname + "/public/"));
    //handle spa
    app.get(/.*/, (req, res) => res.sendFile(__dirname + "/public/index.html"));
}


app.listen(port, () => {
    console.log(`Server is running  on port ${port}`)
})