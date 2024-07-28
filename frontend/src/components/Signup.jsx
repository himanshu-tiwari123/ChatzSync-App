import React, { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import axios from  "axios";
import toast from 'react-hot-toast';


const Signup = ()=>{
    const [user,setUser] = useState({
        fullName:"",
        username:"",
        password:"",
        confirmPassword:"",
        gender:"",
    })
const navigate = useNavigate();

const handleCheckbox = (gender)=>{
    setUser({...user,gender});
}

const onSubmitHandler =async (e)=>{
    e.preventDefault();
    
    try {
        // console.log(user)
        const res = await axios.post('http://localhost:8000/api/v1/user/register',user,{
            headers:{
                'Content-Type':'application/json',
                // 'Authorization': `Bearer ${process.env.MONGO_URI}`,

            },
            withCredentials:true,
        })
        if(res.data.success){
            navigate("/login");
            toast.success(res.data.message);

        }
    } catch (error) {
        toast.error(error.response.data.message);
        console.log(error);
    }
    setUser({
        fullName:"",
        username:"",
        password:"",
        confirmPassword:"",
        gender:"",
    })
}

    return (
        <div className="min-w-96 mx-auto">
          <div className='w-full p-6 rounded-lg shadow-md bg-800 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-60 border border-gray-100'>
            <h1 className='text-3xl font-bold text-center text-300'>
                Sign Up
            </h1>
            <form onSubmit={onSubmitHandler} >
                <div>
                    <label htmlFor="" className='label p-2'>
                        <span className='text-base label-text'>Full Name :</span>
                    </label>
                    <input value={user.fullName} onChange={(e)=>setUser({...user,fullName:e.target.value})} className='w-full input input-bordered h-10' 
                    type="text" placeholder='Enter your name' />
                </div>

                <div>
                    <label htmlFor="" className='label p-2'>
                        <span className='text-base label-text'>Username :</span>
                    </label>
                    <input value={user.username} onChange={(e)=>setUser({...user,username:e.target.value})} className='w-full input input-bordered h-10' 
                    type="email" placeholder='Enter your email-id' />
                </div>

                <div>
                    <label htmlFor="" className='label p-2'>
                        <span className='text-base label-text'>Password :</span>
                    </label>
                    <input value={user.password} onChange={(e)=>setUser({...user,password:e.target.value})} className='w-full input input-bordered h-10' 
                    type="password" placeholder='Enter your password' />
                </div>

                <div>
                    <label htmlFor="" className='label p-2'>
                        <span className='text-base label-text'>Confirm Password :</span>
                    </label>
                    <input value={user.confirmPassword} onChange={(e)=>setUser({...user,confirmPassword:e.target.value})} className='w-full input input-bordered h-10' 
                    type="password" placeholder='Confirm your password' />
                </div>

                {/* For Gender */}

                <div className='flex items-center'>
                    <div className='flex items-center my-4 mx-3'>
                        Male: 
                        <input value={user.gender}
                        checked={user.gender === 'male'} onChange={()=>handleCheckbox("male")}
                          type="checkbox"  className='checkbox'/>
                    </div>
                    <div className=' flex items-center my-4'>
                        Female: 
                        <input value={user.gender} 
                        checked={user.gender === 'female'} onChange={()=>handleCheckbox("female")}
                        type="checkbox" className='checkbox'/>
                    </div>
                    {/*FOR LOGIN  */}
                </div >
                <div className='w-full mx-auto flex items-center'>
                <p>Already have an account ?   </p>
                <Link to="/login" className='ml-2'>Login</Link>
                </div>
                
                <div>
                    <button type='submit' className='btn btn-block btn-md mt-2 border border-slate-700'>Sign Up</button>
                </div>
            </form>
          </div>
        </div>
    )
}

export default Signup