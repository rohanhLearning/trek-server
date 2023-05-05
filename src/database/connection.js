const mongoose = require("mongoose");

const connectToDb = () => {
    mongoose.connect(process.env.DBSTRING).then(() => {
        console.log("connected to db");
    }).catch(err => {
        console.log("err", err);
        console.log("failed to connect to db");
    });
}

module.exports = connectToDb;