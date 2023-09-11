const mongoose = require("mongoose");
require("dotenv").config();

exports.connect = () => {
  mongoose
    .connect(process.env.DATABASE_URL, {
      useNewUrlParser: true, // Use the new URL parser
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("DB Connection Successful");
    })
    .catch((err) => {
      console.log("Db connection Issues");
      console.error(err);
      process.exit(1);
    });
};
