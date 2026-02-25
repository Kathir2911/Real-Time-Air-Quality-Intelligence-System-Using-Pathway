import React from 'react';
import { useEffect,useState } from 'react';
const NavBar =()=>{
    const [time,setTime] = useState(new Date())

    useEffect(()=> {
        const interval =  setInterval(() => {
            setTime(new Date());
        },1000);
        return ()=>clearInterval(interval)
    },[])
    const formattedTime = time.toLocaleTimeString();
    

}
export default NavBar;
