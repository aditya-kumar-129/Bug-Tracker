require("dotenv").config();

DB_PASSWORD = encodeURIComponent(process.env.DB_PASSWORD);

module.exports = {
  secret: process.env.SECRET,
  database: `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.6leheil.mongodb.net/?retryWrites=true&w=majority`,
};
