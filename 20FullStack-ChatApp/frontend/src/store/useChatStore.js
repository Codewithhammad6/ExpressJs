import {create} from "zustand"
import { axiosInstance } from "../lib/axios"
import toast from "react-hot-toast"
import { useAuthStore } from "./useAuthStore"
import { Socket } from "socket.io-client"


export const useChatStore = create((set,get)=>({
messages:[],
users:[],
selectedUser:null,
isUsersLoading:false,
isMessagesLoading:false,



getUsers:async ()=>{
    set({isUsersLoading:true})
    try {
       const res = await axiosInstance.get("/message/users")
       set({users:res.data})
    } catch (error) {
        toast.error(error.response.data.message)
    }finally{
    set({isUsersLoading:false})
    }
},


getMessages:async (userId)=>{
    set({isMessagesLoading:true})
    try {
       const res = await axiosInstance.get(`/message/${userId}`)
       set({messages:res.data})
    } catch (error) {
        toast.error(error.response.data.message)
    }finally{
    set({isMessagesLoading:false})
    }
},

sendMessage:async (messageData)=>{
    const {selectedUser, messages} = get()
    try {
       const res = await axiosInstance.post(`/message/send/${selectedUser._id}`,messageData)
       set({messages:[...messages,res.data]})
    } catch (error) {
        toast.error(error.response.data.message)
    }
},

subscribeToMessages: () => {
  const { selectedUser } = get();
  const socket = useAuthStore.getState().socket;

  if (!selectedUser || !socket?.connected) return;

  socket.off("newMessage");

  socket.on("newMessage", (newMessage) => {
    const isMessageSentFromSelectedUser = newMessage.senderId === selectedUser._id;
    if (!isMessageSentFromSelectedUser) return;

    set({
      messages: [...get().messages, newMessage],
    });
  });
},

unsubscribeFromMessages: () => {
  const socket = useAuthStore.getState().socket;
  if (socket?.connected) {
    socket.off("newMessage");
  }
},




setSelectedUser:(selectedUser)=>set({selectedUser})


}))