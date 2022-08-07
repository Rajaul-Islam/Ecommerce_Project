const app = require("./app");

const dotenv = require("dotenv");
dotenv.config();

const connectDatabase = require("./config/database");


//handling uncaught exception like console.log(youtube) # where youtube is not defined
process.on("uncaughtException",(err)=>{
    console.log(`"Error: ${err.message}"`);
    console.log("shutting down the server due to uncaught exception");
    process.exit(1)
})

dotenv.config({ path: "backend/config/config.env" });

// connect to database

connectDatabase();

app.listen(process.env.PORT, () => {
  console.log(`server is working on http://localhost:${process.env.PORT}`);
});

// Unhandled promise rejection. # port ba connection link vul hole

process.on("unhandledRejection", (err) => {
  console.log(`"error",${err.message}`);
  console.log("shutting down the server due to unhandled promise rejection");
  server.close(() => {
    process.exit(1);
  });
});
