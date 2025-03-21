import { useState } from 'react';
import axios from "axios";

function LikeButton({ postId, initialLikes, initiallyLiked }) {

  
  const [likes, setLikes] = useState(initialLikes);
  const [liked, setLiked] = useState(initiallyLiked);

  const handleLike = async () => {

    try {
      const res = await axios.patch(`/api/create/${postId}/like`);
      setLikes(res.data.likes);
      setLiked(res.data.liked);
    } catch (error) {
      console.error("Error liking post", error);
    }
  };

  return (
    <button
      onClick={handleLike}
      className={`flex justify-center items-center px-4 py-3 shadow-inner border-3 rounded-full text-xl font-bold cursor-pointer transition-all duration-400 ease-in-out 
        ${liked ? 'bg-red-500 text-white scale-95' : 'bg-gray-200 text-gray-500 hover:bg-gray-300 hover:scale-95 hover:animate-movingBorders'}`}
    >

      <svg
        className="empty fill-red-500 transition-opacity duration-100 ease-in-out"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="24"
        height="24"
      >
        <path fill="none" d="M0 0H24V24H0z"></path>
        <path
          d="M16.5 3C19.538 3 22 5.5 22 9c0 7-7.5 11-10 12.5C9.5 20 2 16 2 9c0-3.5 2.5-6 5.5-6C9.36 3 11 4 12 5c1-1 2.64-2 4.5-2z"
        ></path>
      </svg>

      <svg
        className={`filled ${liked ? 'opacity-100 animate-beatingHeart' : 'opacity-0'} absolute top-[14px] left-[16px] transition-opacity duration-100 ease-in-out`}
        height="24"
        width="24"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M0 0H24V24H0z" fill="none"></path>
        <path
          d="M16.5 3C19.538 3 22 5.5 22 9c0 7-7.5 11-10 12.5C9.5 20 2 16 2 9c0-3.5 2.5-6 5.5-6C9.36 3 11 4 12 5c1-1 2.64-2 4.5-2z"
        ></path>
      </svg>

      {liked ? 'Liked' : 'Like'}({likes})
    </button>
  );
}

export default LikeButton;
