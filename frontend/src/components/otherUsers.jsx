import React from 'react'
import OtherUser from './otherUser.jsx'
import useGetOtherUsers from '../hooks/useGetOtherUsers.jsx';
import { useSelector } from 'react-redux';

const  OtherUsers = ()=>{
    //my custom hooks:
    useGetOtherUsers();
    const {otherUsers} = useSelector(store=>store.user)
    if(!otherUsers ){
        return ; //early return in react
    }

    return (
        <div className='overflow-auto flex-1'>
            {
                otherUsers?.map((user)=>{
                    return(
                        <OtherUser key={user._id} user={user}></OtherUser>  
                    )
                })
            }
            

            
        </div>
    )
}

export default OtherUsers