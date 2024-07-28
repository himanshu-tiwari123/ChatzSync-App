import React, { useState } from 'react'
import {BiSearchAlt2} from 'react-icons/bi'
import OtherUsers from './otherUsers'
import axios from 'axios';
import toast from 'react-hot-toast'
import {useNavigate}  from "react-router-dom"
import { useSelector,useDispatch } from 'react-redux';
import { setAuthUser, setOtherUsers } from '../redux/userSlice';


const Sidebar = ()=>{
    const [search,setSearch] = useState("");
    const {otherUsers} = useSelector(store=>store.user);
    const dispatch = useDispatch();

    const navigate = useNavigate();
    const logoutHandler =async ()=>{
        try {
        const res = await axios.get(`http://localhost:8000/api/v1/user/logout`)
        navigate("/login");
        toast.success(res.data.message);
        dispatch(setAuthUser(null));
        } catch (error) {
            console.log(error);
        }
    }
    const searchSubmitHandler=(e)=>{
        e.preventDefault();
        const conversationUser = otherUsers?.find((user)=>user.fullName.toLowerCase().includes(search.toLowerCase()));
        if(conversationUser){
            dispatch(setOtherUsers([conversationUser]));
        }else{
            toast.error("User not found!")
        }
    }
    return (
        <div className='border-r border-slate-500 p-4 flex flex-col'>
            <form  onSubmit={searchSubmitHandler} action="" className='flex items-center gap-2'>
                <input 
                value={search} onChange={(e)=>setSearch(e.target.value)}
                className='input input-bordered rounded-md' type="text" 
                placeholder='Search...'/>

                <button type='submit' className='btn btn-circle bg-gray-600 text-white'>
                    <BiSearchAlt2  size="24px"></BiSearchAlt2>
                </button>
            </form>
            <div className='divider px-3'></div>
            <OtherUsers></OtherUsers>
            <div className='mt-3'>
                <button className='btn btn-sm' onClick={logoutHandler}>Logout</button>
            </div>
        </div>
    )
}

export default Sidebar