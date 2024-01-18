const express = require("express");
const app = express();
const connectDB =require("./Config/connectDB")
connectDB()
app.use(express.json())
 const personRouter = require("./Routes/Person")
app.use("/person",personRouter);




app.listen(5000,(err)=>{
    err? console.log(err):console.log("serveur is running");
});