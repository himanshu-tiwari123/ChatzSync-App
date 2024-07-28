import React from "react";
import Message from "./Message";
import useGetMessages from "../hooks/useGetMessages";
import { useSelector } from "react-redux";
import useGetRealTimeMessage from "../hooks/useGetRealTimeMessage";

const Messages = () =>{
    useGetMessages();
    useGetRealTimeMessage();
    const {messages} = useSelector(store=>store.message);
    if (!Array.isArray(messages)) {
        return null; // or handle this case appropriately
      }
    return (
    <div className="px-4 flex-1 overflow-auto">
        {
            messages && messages?.map((messages)=>{
            return (
                <Message key={messages._id} message={messages}></Message>
            )
            })
        }
   
    </div>
    )
    
}
export default Messages