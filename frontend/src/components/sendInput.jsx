import React, { useState } from "react";
import { IoSend } from "react-icons/io5";
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
import { setMessages } from "../redux/messageSlice";


const SendInput = ()=>{
    
    const [message,setMessage] = useState("");
    const dispatch = useDispatch();
    const {selectedUser} = useSelector(store=>store.user);
    const {messages} = useSelector(store=>store.message);

    const onSubmitHandler =async (e)=>{
        e.preventDefault();
        
        if (!selectedUser || !selectedUser._id) {
            console.error('Selected user or _id is undefined or null.');
            return; // Optionally handle this case, e.g., show an error message to the user
        }

        try {
            const res = await axios.post(`http://localhost:8000/api/v1/message/send/${selectedUser?._id}`,{message},{
                headers:{
                    'Content-Type':'application/json',
                },
                withCredentials:true
            });
            
            console.log(res);
            dispatch(setMessages([...messages,res?.data?.newMessage]))
            // alert(message);
            setMessage("");
        } catch (error) {
            console.log(error);
        }

        
    }

    return(<div>
        <form onSubmit={onSubmitHandler} className="px-4 my-3">
            <div className="w-full relative">
                <input type="text" 
                value={message} 
                onChange={(e)=>setMessage(e.target.value)}
                placeholder="Send a message..."
                className="border text-sm rounded-lg block w-full bg-gray-800 text-white p-3 border-zinc-500"
                />
                <button type="submit"  className="absolute flex items-center inset-y-0 end-0 pr-3">
                    <IoSend></IoSend>
                </button>
            </div>
        </form>
    </div>);
}

export default SendInput;