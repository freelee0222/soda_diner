const mongoose = require('mongoose');
const connectionString = "mongodb+srv://cluster0.iw6qi1g.mongodb.net/"

mongoose.Promise = global.Promise;

mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  
mongoose.connection.on("connected", () => {
    console.log(`Mongoose connected to ${connectionString}`)
});

mongoose.connection.on("error", (err) => {
    console.log(`Mongoose connection error ${err}`)
});

mongoose.connection.on("disconnected", () => {
    console.log("Mongoose disconnected")
});