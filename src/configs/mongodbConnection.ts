import mongoose from 'mongoose';

const connection = (mongodbURL:string) => {
  try {
    mongoose.connect(mongodbURL);
    console.log('db connected successfully');
  } catch (error) {
    console.log(error);
  }
};

export default connection;
