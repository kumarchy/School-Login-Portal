const mongoose = require("mongoose");

const connectDB = async () => {
  mongoose.connect('mongodb+srv://kumarChaudhary:kumar12345@cluster0.ej5v6.mongodb.net/school_login_portal')
    .then(() => console.log("DB connected"))
    .catch(err => console.error("DB connection failed", err));
};

module.exports = connectDB;
