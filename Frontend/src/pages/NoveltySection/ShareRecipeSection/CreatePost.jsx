import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import ImageUploader from "../../../components/UploadImage";

function CreatePost() {
  const navigate = useNavigate();
  const [isCreatingLoading, setIsCreatingLoading] = useState(false);

/*   console.log(currentUser) */

  const [formData, setFormData] = useState({
    name: "",
    detail: "",
    ingredients: [],
    score: "",
    avatar: "", 
  });

  const handleCreatePost = async () => {
    try {
      if (!formData.name || !formData.detail || !formData.ingredients.length || !formData.avatar || !formData.score) {
        toast.error("Please fill all required fields");
        return;
      }

      setIsCreatingLoading(true);
      const res = await fetch("/api/create/create-post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        setIsCreatingLoading(false);
        return;
      }

      toast.success("Post Shared Successfully");
      setFormData({
        name: "",
        detail: "",
        ingredients: [],
        score: "",
        avatar: "",
      });
      setIsCreatingLoading(false);
    } catch (error) {
      console.error("Error creating post: ", error);
      toast.error("An error occurred while creating the post");
      setIsCreatingLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 ">
      <div className=" rounded-lg p-8 w-full max-w-4xl border-2 border-purple-200">
        <h2 className="text-3xl font-semibold text-center text-blue-600 mb-6">Create Post</h2>
        <form className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="mb-4">
              <label className="block text-lg font-medium text-gray-700">
                Recipe Name:
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="mt-2 block w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter recipe name"
                />
              </label>
            </div>

            <div className="mb-4">
              <label className="block text-lg font-medium text-gray-700">
                Score:
                <input
                  type="number"
                  name="score"
                  value={formData.score}
                  onChange={handleChange}
                  className="mt-2 block w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Rate the recipe"
                />
              </label>
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-lg font-medium text-gray-700">
              What's on your mind:
              <textarea
                name="detail"
                value={formData.detail}
                onChange={handleChange}
                className="mt-2 block w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Share your thoughts..."
              ></textarea>
            </label>
          </div>

          <div className="mb-4">
            <label className="block text-lg font-medium text-gray-700">
              Ingredients: (comma-separated)
              <input
                type="text"
                name="ingredients"
                value={formData.ingredients.join(", ")}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    ingredients: e.target.value.split(", "),
                  })
                }
                className="mt-2 block w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="List your ingredients"
              />
            </label>
          </div>

          <ImageUploader avatar={formData.avatar} setAvatar={(url) => setFormData((prev) => ({ ...prev, avatar: url }))} />

          <button
            type="button"
            onClick={handleCreatePost}
            disabled={isCreatingLoading}
            className="w-full py-3 mt-4 text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:ring-green-500 rounded-lg font-semibold disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            {isCreatingLoading ? (
              <span className="spinner-border spinner-border-sm"></span>
            ) : (
              "Publish Post"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreatePost;
