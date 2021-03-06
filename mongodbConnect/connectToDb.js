const mongoose = require("mongoose");
const mongodUri = process.env.MONGOD_URI;

async function connect() {
  try {
    await mongoose.connect(mongodUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });
    console.log("Connect success.");
    // require("../faker");
  } catch (error) {
    console.log("Connect failed.", error);
  }
}

module.exports = { connect };
