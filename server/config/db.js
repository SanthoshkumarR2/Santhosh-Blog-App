require('dotenv').config();
const mongoose = require("mongoose");


mongoose.set('strictQuery', false);


mongoose.connect(process.env.MONGODB).then(()=>{
    console.log("connected!");
}).catch((err)=>{
    console.log(err);
})