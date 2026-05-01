const mongoose = require("mongoose");
const Listing = require("./models/listing");

const dbUrl = "mongodb://127.0.0.1:27017/wanderlust"; // or your Atlas URL

async function updateCategory() {
  await mongoose.connect(dbUrl);
  console.log("DB connected");

  await Listing.updateMany({}, { category: "Trending" });

  console.log("All listings updated ");
  mongoose.connection.close();
}

updateCategory();