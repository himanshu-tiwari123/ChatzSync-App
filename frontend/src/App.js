
import './App.css';
import {createBrowserRouter,RouterProvider} from 'react-router-dom'
import Signup from './components/Signup.jsx';
import HomePage from "./components/HomePage.jsx";
import Login from './components/Login.jsx'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import io from 'socket.io-client'
import { setOnlineUsers } from './redux/userSlice.js';
import { setSocket } from './redux/socketSlice.js';

const router = createBrowserRouter([
  {
    path:"/",
    element:<HomePage/>
  },
  {
    path:"/signup",
    element:<Signup/>
  },
  {
    path:"/login",
    element:<Login/>
  }
])

function App() {
  // const [socket,setSocket] = useState(null);
  const {authUser} = useSelector(store=>store.user);
  const {socket} = useSelector(store=>store.socket);
  const dispatch = useDispatch();
  
  useEffect(()=>{
      if(authUser){
        const socket = io("http://localhost:8000",{
          query:{userId:authUser._id}
        });

        dispatch(setSocket(socket));

        socket.on('getOnlineUsers',(onlineUsers)=>{
           dispatch(setOnlineUsers(onlineUsers));
        });

        return () => socket.close();
      }
      else{
        if(socket){
          socket.close();
          dispatch(setSocket(null));
        }
      }
      
  },[authUser]);

  return (
    <div className="p-4 h-screen flex items-center justify-center">
     
    <RouterProvider  router={router}></RouterProvider> 
    </div>
  );
}

export default App;
