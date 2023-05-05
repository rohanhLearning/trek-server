const mongoose = require("mongoose");

const connectToDb = () => {
    mongoose.connect('mongodb+srv://rohanharnale2:CkWODzZvU34IX6jU@cluster1.vl5nsjd.mongodb.net/treks?retryWrites=true&w=majority').then(() => {
        console.log("connected to db");
    }).catch(err => {
        console.log("err", err);
        console.log("failed to connect to db");
    });
}

module.exports = connectToDb;