//mongoose
import mongoose from "mongoose";

export const ConnectDB=()=>{

mongoose.connect('mongodb://127.0.0.1:27017/contact-crud').then(()=>{
    console.log('Successfully Connected to MongoDB');
}).catch((err)=>{
    console.log('Error connecting to MongoDB:', err);
});
}

