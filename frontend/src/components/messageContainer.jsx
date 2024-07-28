import React,{useEffect} from 'react'
import SendInput from './sendInput.jsx'
import Messages from './Messages.jsx'
import { useSelector } from 'react-redux'
// import { setSelectedUser } from '../redux/userSlice.js'

const  MessageContainer = ()=>{
    const {selectedUser,authUser} = useSelector(store=>store.user);

    // console.log("Selected User:", selectedUser);
    // console.log("Auth User:", authUser);

    //  const dispatch = useDispatch();
    // useEffect(()=>{
    //     return ()=> dispatch(setSelectedUser(null));
    // },[dispatch])
    return (
        <>
        {
            selectedUser !== null ?( 
                <div className='md:min-w-[650px] flex flex-col'>
                <div className='flex gap-2 items-center bg-zinc-800 px-4 py-2 mb-2'>
                
                    <div className='avatar online'>
                        <div className='w-12 rounded-full'>
                           <img src={selectedUser?.profilePhoto} alt="user-profile" />
                        </div>
                    </div>

                    <div className='flex flex-col flex-1'>
                        <div className='flex justify-between gap-2 flex-1'>
                           <p className=''>{selectedUser?.fullName}</p>
                        </div>
                    </div>

                </div>
                <Messages></Messages>
                <SendInput></SendInput>
            </div>
            ):(
            <div className='md:min-w-[650px] flex flex-col justify-center items-center'>
                  <h1 className='text-black text-3xl mb-4 font-bold'>Hello {authUser?.fullName}, Welcome to <span className="text-white">ChatzSync</span> App!</h1>
                  <h1 className='text-black text-2xl font-bold'>Embark on your <span className="text-yellow-500">Chat adventure!</span></h1>
                  <p className='text-gray'>&copy; Himanshu Tiwari </p>

            </div>
             
            )
        }
    </>
            
    )
}

export default MessageContainer