// testMongo.js
const mongoose = require('mongoose');
require('dotenv').config();

const uri = process.env.MONGO_URI;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("✅ MongoDB 連線成功！");
    mongoose.disconnect();
  })
  .catch(err => {
    console.error("❌ 連線失敗：", err.message);
  });
