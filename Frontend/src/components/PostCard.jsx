import React from "react";
import ReactStars from "react-rating-stars-component";
import { Link } from "react-router-dom";

function PostCard(postData) {
  return (
    <div class="bg-[#90D5FF] Drelative flex w-80 flex-col rounded-2xl bg-white border border-gray-200 shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-105">
   <div class="relative mx-4 -mt-6 h-40 overflow-hidden rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-600 shadow-md shadow-blue-500/50">
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
            class="relative overflow-hidden rounded-full bg-blue-900 py-3 px-8 text-sm font-semibold uppercase text-white shadow-md transition-all duration-300 ease-in-out hover:bg-blue-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 active:scale-95 disabled:pointer-events-none disabled:opacity-50"
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
