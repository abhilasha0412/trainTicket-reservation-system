const mongoose = require ('mongoose');

const connectDB = async () => {
    try {
        // await mongoose.connect('mongodb://localhost:27017/mydatabase');
        await mongoose.connect('mongodb+srv://abhilashasahu0412:abhilashasahu0412@cluster0.mdrwr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error('Failed to connect to MongoDB', err);
        process.exit(1);
    }
};

module.exports = connectDB;

