import React from "react";
import ReactStars from "react-rating-stars-component";
import { Link } from "react-router-dom";

function PostCard(postData) {
  return (
    <div class="relative flex w-80 flex-col rounded-xl bg-[#ffda21]  bg-clip-border text-gray-700 shadow-md border-cyan-600 border outline-none hover:outline hover:outline-4 hover:outline-cyan-800">
      <div class="relative mx-4 -mt-6 h-40 overflow-hidden rounded-xl bg-blue-gray-500 bg-clip-border text-white shadow-lg shadow-blue-gray-500/40 bg-gradient-to-r from-blue-500 to-blue-600">
        <img src={postData.data.avatar} alt="FoodImage" />
      </div>
      <div class="p-6">
        <h5 class="mb-2 block font-sans text-xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
          {postData.data.name}
        </h5>
        <p class="block font-sans text-base font-light leading-relaxed text-inherit antialiased"> 
          {postData.data.detail}
        </p>
      </div>
      <div class="p-6 pt-0">
        <Link to={`/specific-Post/${postData.data._id}`}>
          <button
            data-ripple-light="true"
            type="button"
            class="select-none rounded-lg bg-blue-500 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          >
            See More...
          </button>
        </Link>
      </div>
      <div className="pl-4">
        <p>
          Uploaded By {postData.data.user?.username}(
          {postData.data.user?.country} )
        </p>
      </div>
    </div>
  );
}

export default PostCard;
