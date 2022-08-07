const mongoose = require("mongoose");
require('dotenv').config()


const connectDatabase=( )=>{
    mongoose.connect(process.env.DB_URI,{useUnifiedTopology: true, useNewUrlParser: true}).then((data)=>{
        console.log(`mongodb is connected with : ${data.connection.host}`);
    })
    // Unhandled promise rejection error handle korar jonno catch use kora lagbena.
    // .catch((err)=>{
    //     console.log(err);
    // })
}

module.exports =connectDatabase;