import User from "../models/user.model.js";
import Message from "../models/message.model.js";
import cloudinary from "../lib/cloudinary.js"
import { getReceiverSocketId, io } from "../lib/socket.js";




export const getUsersForSidebar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;

    const users = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");
    res.status(200).json(users);
  } catch (error) {
    console.error("Error in getUsersForSidebar:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};





export const getMessages =async (req,res)=>{
  try {
    const {id:userToChatId} = req.params
    const myId = req.user._id
    const message = await Message.find({
      $or:[
        {senderId:userToChatId,receiverId:myId},
        {senderId:myId,receiverId:userToChatId}
      ]
    })
    res.status(200).json(message)
    
  } catch (error) {
      console.error("Error in getMessages:", error.message);
    res.status(500).json({ message: "Server error" });
  }
}





export const sendMessages =async (req,res)=>{
  try {
    const {text,image} = req.body
    const {id:receiverId}=req.params;
    const senderId = req.user._id

    let imageUrl;
    if(image){
      const uploadResponse = await cloudinary.uploader.upload(image)
      imageUrl = uploadResponse.secure_url
    }
    const newMessage = new Message({
      senderId,
      receiverId,
      text,
      image:imageUrl
    })
    await newMessage.save()






    //Realtime functionality with socket.io
const receiverSocketId = getReceiverSocketId(receiverId)
if(receiverSocketId){
  io.to(receiverSocketId).emit("newMessage",newMessage)
}
    
res.status(201).json(newMessage)

  } catch (error) {
       console.error("Error in sendMessages:", error.message);
    res.status(500).json({ message: "Server error" });
  }
}