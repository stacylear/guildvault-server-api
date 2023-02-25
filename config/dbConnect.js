const mongoose = require('mongoose'); //require mongoose

//Connect to the database
const dbConnect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Database connected successfully.');
    } catch (error) {
        console.log(error.message); //log any error messages
        process.exit(1); //if error, exit the process
    }
};

dbConnect(); //as soon as I require this file, run the dbConnect function