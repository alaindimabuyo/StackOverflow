const express = require("express");
const dotenv = require("dotenv")

dotenv.config({ path: "./config.env" })


const app = express();

//Main Route
app.use('/', require('./routes/questions'))

//PORT
const port = process.env.PORT || 8000;


//Cors Headers | prevent cors errors
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === "OPTIONS") {
      res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE");
      return res.status(200).json({});
    }
    next();
  });
  
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