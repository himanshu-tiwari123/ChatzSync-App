import React, { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux';


const Message = ({message})=>{
  const scroll = useRef();

  const {authUser,selectedUser} = useSelector(store=>store.user); 
  console.log(authUser);
  
  useEffect(()=>{
     scroll.current?.scrollIntoView({behaviour:"smooth"});
  },[message]);

  return(
  <div ref={scroll}   className={`chat ${authUser?._id === message?.senderId ? 'chat-end':'chat-start'} `}>
  <div className="chat-image avatar">
    <div className="w-10 rounded-full">
      <img
        alt="Tailwind CSS chat bubble component"
        src={message?.senderId === authUser?._id ? authUser.profilePhoto : selectedUser.profilePhoto} />
    </div>
  </div>
  <div className="chat-header">
    
    <time className="text-xs opacity-50 text-white" >{new Date().getHours()}:{new Date().getMinutes()}</time>
  </div>
  <div className={`chat-bubble ${authUser?._id !== message?.senderId ? 'bg-gray-200 text-black':''}`}>{message?.message}</div>
  <div className="chat-footer opacity-50"></div>
</div>

    )
}
export default Message