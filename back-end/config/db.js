// "use strict";

// import mongoose from "mongoose";
// // const mongoose = require('mongoose');

// const connectDB = async () => {
//   try {
//     const conn = await mongoose.connect(process.env.MONGO_URI, {
//       useUnifiedTopology: true,
//       useNewUrlParser: true,
//       useCreateIndex: true,
//     });

//     console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline);
//   } catch (error) {
//     console.error(`Error: ${error.message}`.red.underline.bold);
//     process.exit(1);
//   }
// };

// export default connectDB;

// module.exports = {
//   HOST: "localhost",
//   PORT: 27017,
//   DB: "a",
// };

// "use strict";

// const mongoose = require("mongoose");

// module.exports = {
//   database: process.env.MONGO_DB_URI,

//   // connect function to create a mongoDB connection
//   connectDB: function () {
//     mongoose.connect(this.database);
//   },
// };
// // on mongo connection open event print a console statement
// mongoose.connection.on("open", function () {
//   console.log("Connected to Database (MongoDB) ");
// });
