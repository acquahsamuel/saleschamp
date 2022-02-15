const mongoose = require("mongoose");
const keys = require("./keys");

const connectDB = async () => {
  const conn = await mongoose.connect(keys.MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  });

  console.log(
    `MongoDB Connected: ${conn.connection.host}.saleschamp.nl-dev`.yellow
      .underline.bold
  );
};

module.exports = connectDB;
