const app = require("./app");

const dotenv= require("dotenv");
dotenv.config();

const connectDatabase = require("./config/database")

dotenv.config({path:"backend/config/config.env"})

// connect to database

connectDatabase();



app.listen(process.env.PORT,()=>{
    console.log(`server is working on http://localhost:${process.env.PORT}`);
})