import axios from 'axios'
import React, { useEffect,useState } from 'react'
import { BASE_URL } from '../constants/urls'
import {useSelector,useDispatch} from 'react-redux'
import { addFeed, removeFeed } from '../utils/feedSlice'
import UserCard from './UserCard'


const Feed = () => {
    const feed = useSelector(state=>state.feed)
    const dispatch=useDispatch()
    const [requestStatus,setRequestStatus]=useState(false)
    const fetchFeed=async()=>{
        if(feed) return
        try{
            const res=await axios.get(BASE_URL+"/user/feed",{withCredentials:true})
            console.log("from user feed ")
            console.log(res.data.data)
            dispatch(addFeed(res.data.data))
        }
        catch(err){
            console.log("prob. in catching fields --> "+err.message)
        }
    }


    useEffect(()=>{
        fetchFeed()
    },[])




    const handleRequest=async(status)=>{
        try{
             await axios.post(BASE_URL+"/request/send/"+status+"/"+feed[0]._id,{},{
                withCredentials:true
            })
            setRequestStatus(true)
            setTimeout(()=>{
                setRequestStatus(false)
            },1000)

            
            //remove the user from feed in redux

            const UpdatedFeed=feed.filter((fd)=>{
                return !(fd._id===(feed[0]._id))
            })
            console.log("here are the updated fields")
            console.log(feed)
            //dispatch(removeFeed())
            console.log(UpdatedFeed)
            //check whether it works as patch or post
            dispatch(addFeed(UpdatedFeed))
        }
        catch(err){
           console.log("handle request error "+err.message); 
        }
    }

  return (
    <>
    { requestStatus &&(<div className="toast toast-top toast-center">
  <div className="alert alert-info">
    <span>Request sent </span>
  </div>
</div>)}
       { feed && feed.length>0?(
            <div className='flex flex-col'>
            <UserCard user={feed[0]}/>
            <div className=" flex justify-around  mt-4 gap-7">
            
            <button
                  className="btn btn-primary  "
                  onClick={()=>handleRequest("ignore")}
                >
                   Ignore
                </button>
                
                <button
                  className="btn btn-secondary  "
                 onClick={()=>handleRequest("interested")} 
                >
                   Interested 
                </button>
              </div>
            
          
            </div>
        ):(<>
        No new users Found !!!
        </>)
       }
       </>
    
  )
}

export default Feed