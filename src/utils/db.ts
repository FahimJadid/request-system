import mongoose from 'mongoose';

const connectDB = async () => {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/request-system');
    console.log('MongoDB connected successfully');
};

export default connectDB;