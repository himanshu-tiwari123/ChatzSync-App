import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedUser } from '../redux/userSlice';

const  OtherUser = (props)=>{
    const user = props.user;
    const dispatch = useDispatch();
    const {selectedUser,onlineUsers} = useSelector(store=>store.user);
    const isOnline = Array.isArray(onlineUsers) && onlineUsers.includes(user._id);


    const selectedUserHandler = (user)=>{
       //store the fetched information on redux
    //    console.log(user);
       dispatch(setSelectedUser(user));
    }
    return (
        <>
            <div onClick={()=>selectedUserHandler(user)} className={` ${selectedUser?._id === user?._id  ? 'bg-green-800':''}  flex gap-2 items-center bg-zinc-100 text-black hover:bg-green-800 rounded-sm p-2 cursor-pointer`}>
          
                
                <div className={`avatar ${isOnline ? 'online':''}`}>
                    <div className='w-12 rounded-full'>
                        <img src={user?.profilePhoto} alt="user-profile" />
                    </div>
                </div>

                <div className='flex flex-col flex-1'>
                    <div className='flex justify-between gap-2 flex-1'>
                        <p className=''>{user?.fullName}</p>
                    </div>
                </div>

            </div>

            <div className='divider my-0 py-0 h-1'></div>
            
        </>
    )
}

export default OtherUser