import React,{useState} from 'react'
import { Link,useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { setAuthUser } from '../redux/userSlice'

const Login = ()=>{
    
    const [user,setUser] = useState({
            username:"",
            password:"",
    })

    const dispatch = useDispatch();
    const navigate = useNavigate();
   
    
    const onSubmitHandler =async (e)=>{
        e.preventDefault();
        try {
            // console.log(user)
            const res = await axios.post('http://localhost:8000/api/v1/user/login',user,{
                headers:{
                    'Content-Type':'application/json'
                },
                withCredentials:true,
            })
           
        navigate("/");
        // console.log(res.data);
        dispatch(setAuthUser(res.data));
    } catch (error) {
        if (error.response) {
            // Request made and server responded with a status code
            toast.error(error.response.data.message);
            console.log(error.response); // The server response
        }
        }
        
        setUser({
            
            username:"",
            password:"",
           
        })
    }
    return (
        <div className="min-w-96 mx-auto">
          <div className='w-full p-6 rounded-lg shadow-md bg-800 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-60 border border-gray-100'>
            <h1 className='text-3xl font-bold text-center text-300'>
                Login
            </h1>
            <form onSubmit={onSubmitHandler}>
                

                <div>
                    <label htmlFor="" className='label p-2'>
                        <span className='text-base label-text'>Username :</span>
                    </label>
                    <input  
                    value={user.username} onChange={(e)=>setUser({...user,username:e.target.value})}
                    className='w-full input input-bordered h-10' 
                    type="email" placeholder='Enter your email-id' />
                </div>

                <div>
                    <label htmlFor="" className='label p-2'>
                        <span className='text-base label-text'>Password :</span>
                    </label>
                    <input 
                    value={user.password} onChange={(e)=>setUser({...user,password:e.target.value})}
                    className='w-full input input-bordered h-10' 
                    type="password" placeholder='Enter your password' />
                </div>

               
                
                <div className='w-full mx-auto flex items-center mt-4'>
                <p>Not registred yet ? </p>
                <Link to="/Signup" className='ml-2'>Sign Up</Link>
                </div>
                
                <div>
                    <button type="submit" className='btn btn-block btn-md mt-2 border border-slate-700'>Login</button>
                </div>
            </form>
          </div>
        </div>
    )
}

export default Login