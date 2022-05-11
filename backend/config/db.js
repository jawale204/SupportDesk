const mongoose = require("mongoose");

exports.connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`connected to mongodb host: ${connect.connection.host}`);
  } catch (e) {
    console.error(e.message);
    process.exit(1);
  }
};
