import React from 'react'   
  import PostCard from "../../../components/PostCard.jsx";  
  import { useEffect } from "react";

function Timeline() {

  const [data, setData] = React.useState([]);

  const getAllPostData = async () => {
    try {
      const res = await fetch("/api/create/get-all-posts", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      setData(data);
    } catch (error) {
      console.error("Error getting all posts: ", error);
    }

  };

  useEffect(() => {
    getAllPostData();
  }, []);

/*   getAllPostData() */


  return (
    <div className='flex flex-wrap flex-raw gap-8 pt-20 pl-10'>
        {
            data?.map((post,index)=>{
                console.log(Location)
                return(
                    <PostCard key = {post._id} data = {post}/>

                )
            })
        }
    </div>
  )
}


export default Timeline;