import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import LikeButton from "../../../components/LikeButton";

function SpecificPost() {
  const { id: postID } = useParams();
  const [comment, setComment] = useState("");
  const [specData, setSpecData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const getSpecificPost = async (id) => {
      try {
        setLoading(true);
        setError(false);
        const response = await fetch(`/api/create/specific-post/${id}`);
        if (!response.ok) throw new Error("Failed to fetch post details");
        const data = await response.json();
        setSpecData(data);
      } catch (err) {
        setError(true);
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    };
    getSpecificPost(postID);
  }, [postID]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!comment.trim()) {
      toast.error("Please provide a valid comment.");
      return;
    }

    try {
      setSubmitting(true);
      const response = await fetch(`/api/create/${postID}/create-review`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          comment,
          name: currentUser?.name || "Anonymous",
          avatar: currentUser?.avatar || "fallback-avatar-url",
        }),
      });

      if (!response.ok) throw new Error("Failed to submit review");

      toast.success("Review submitted successfully!");
      setComment("");
      setSpecData((prev) => ({
        ...prev,
        reviews: [
          ...prev.reviews,
          {
            name: currentUser?.name || "You",
            comment,
            createdAt: "Just now",
            avatar: currentUser?.avatar,
          },
        ],
      }));
    } catch (error) {
      toast.error(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto my-10 p-8 bg-[#505081] text-white rounded-lg shadow-xl">
      {loading ? (
        <p className="text-center text-xl font-semibold animate-pulse">
          Loading post details...
        </p>
      ) : error ? (
        <p className="text-center text-red-400 text-xl font-semibold">
          Failed to load post. Please try again later.
        </p>
      ) : (
        <div className="grid md:grid-cols-2 gap-8">
          {/* Post Details Section */}
          <div className="md:col-span-1">
            <div className="mb-6 text-center">
              <img
                src={specData?.avatar || "fallback-image-url"}
                className="w-full max-w-xl rounded-lg shadow-lg object-cover"
                alt={specData?.name}
              />
            </div>
            <div className="flex items-center gap-3 mb-4">
              <img
                src={specData?.user?.avatar || "fallback-avatar-url"}
                className="w-10 h-10 rounded-full"
                alt="User"
              />
              <p className="text-lg font-semibold text-gray-300">
                {specData?.user?.username}
              </p>
            </div>
            <h2 className="text-4xl font-extrabold text-gray-100">
              {specData?.name}
            </h2>
            <p className="text-lg text-gray-300 mt-4">{specData?.detail}</p>
            <p className="text-2xl font-semibold text-green-400 mt-4">
              Rating: {specData?.score}
            </p>

            <div className="mt-6">
              <p className="text-lg font-medium text-gray-200">Ingredients:</p>
              <ul className="list-disc pl-6 space-y-1">
                {specData?.ingredients?.map((type, index) => (
                  <li key={index} className="text-gray-300">
                    {type}
                  </li>
                ))}
              </ul>
            </div>

            {/* Like Button */}
            <div className="mt-6 flex justify-center">
              <LikeButton
                postId={specData._id}
                initialLikes={specData.likes.length}
                initiallyLiked={specData.likes.includes(currentUser._id)}
              />
            </div>

            {/* Review Form */}
            <div className="mt-8 bg-gray-800 p-6 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold text-green-400 mb-4">
                Add a Review
              </h3>
              <form onSubmit={submitHandler} className="space-y-4">
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-600 rounded-lg bg-gray-900 text-gray-300 focus:ring-2 focus:ring-green-400"
                  rows="4"
                  placeholder="Write your review here..."
                ></textarea>
                <button
                  type="submit"
                  className={`w-full py-3 rounded-lg font-bold text-white transition ${
                    submitting
                      ? "bg-gray-500 cursor-not-allowed"
                      : "bg-green-500 hover:bg-green-600"
                  }`}
                  disabled={submitting}
                >
                  {submitting ? "Submitting..." : "Submit"}
                </button>
              </form>
            </div>
          </div>

          {/* Reviews Section */}
          <div className="md:col-span-1 bg-gray-800 p-6 rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold mb-4 text-green-400">Reviews</h3>
            {specData?.reviews?.length > 0 ? (
              <div className="space-y-4">
                {specData?.reviews.map((review, index) => (
                  <div
                    key={index}
                    className="p-4 bg-gray-700 rounded-lg shadow-md"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={review.avatar || "fallback-avatar-url"}
                        className="w-10 h-10 rounded-full"
                        alt="User"
                      />
                      <div>
                        <p className="text-blue-400 font-semibold">
                          {review.name}
                        </p>
                        <p className="text-gray-400 text-sm">
                          {review.createdAt}
                        </p>
                      </div>
                    </div>
                    <p className="text-gray-200 mt-2">{review.comment}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-400">
                No reviews yet. Be the first to leave a review!
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default SpecificPost;
