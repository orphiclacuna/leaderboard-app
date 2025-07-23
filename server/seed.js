const mongoose = require("mongoose");
const User = require("./models/User");
const ClaimHistory = require("./models/ClaimHistory");
require("dotenv").config();

const MONGO_URI = process.env.MONGO_URI;

const seedUsers = async () => {
  await mongoose.connect(MONGO_URI);

  const users = [
    { name: "Sam" },
    { name: "Lucy" },
    { name: "Jane" },
    { name: "Sally" },
    { name: "Amit" },
    { name: "Neha" },
    { name: "Jake" },
    { name: "Isha" },
    { name: "Ana" },
    { name: "Riya" },
  ];

  try {
    await User.deleteMany();
    await ClaimHistory.deleteMany();
    await User.insertMany(users);
    console.log("Database seeded successfully!");
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    mongoose.connection.close();
  }
};

seedUsers();
