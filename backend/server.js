const app = require("./app");
const cloudinary = require('cloudinary')
const connectToDatabase = require("./config/database");

//Uncaught Exception
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err}`);
  console.log("Shutting down server due to Uncaught Exception");

  process.exit(1);
});

const dotenv = require("dotenv");

//Config
dotenv.config({ path: "backend/config/config.env" });

connectToDatabase();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  api_key: process.env.CLOUDINARY_API_KEY
})

const server = app.listen(process.env.PORT, () => {
  console.log(`server running on http://localhost:${process.env.PORT}`);
});

//Unhandled Promise Rejection
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err}`);
  console.log("Shutting down server due to Unhandled Promise Rejection");

  server.close(() => {
    process.exit(1);
  });
});
