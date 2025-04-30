import React, { useState, useEffect } from "react";
import axios from "axios";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/atom-one-dark.css";
import { toPng } from "html-to-image";

export default function GenerateRecipe() {
  const [filtered, setFiltered] = useState([]);
  const [showListingsError, setShowListingsError] = useState(false);
  const [Instruction, setInstruction] = useState({
    ingredients: "",
    servingSize: "",
    style: "",
    timing: "",
    additional: false,
  });
  const [recipe, setrecipe] = useState("");
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Function to generate a recipe
  async function GenerateRecipe() {
    setLoading(true);
    try {
      const response = await axios.post("api/ai/get-recipe/", { Instruction });

      const Recipe = String(response.data)
        .replace(/<think>.*?<\/think>/gs, "")
        .trim();

      setrecipe(Recipe);
      console.log(Recipe);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error fetching recipe:", error);
      setrecipe([]);
      alert("Failed to generate recipe. Please try again later.");
    }
    setLoading(false);
  }
  
    // Function to download recipe as PNG
    const downloadPNG = () => {
      const recipeElement = document.getElementById("recipe-container");
      toPng(recipeElement)
        .then((dataUrl) => {
          const link = document.createElement("a");
          link.download = "recipe.png";
          link.href = dataUrl;
          link.click();
        })
        .catch((error) => {
          console.error("Error generating PNG:", error);
        });
    };

  // Fetch data for filtered items
  const fetchData = async () => {
    try {
      setShowListingsError(false);
      const res = await fetch(`api/grocery/getExpire`);
      const data = await res.json();
      if (data.success === false) {
        setShowListingsError(true);
        return;
      }
      setFiltered(data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setShowListingsError(true);
    }
  };

  // Initial fetch on component mount
  useEffect(() => {
    fetchData();
  }, []);

  // Update ingredients dynamically when filtered changes
  useEffect(() => {
    if (filtered.length > 0) {
      setInstruction((prev) => ({
        ...prev,
        ingredients: filtered.map((item) => item.name).join(", "),
      }));
    }
  }, [filtered]);

  // Handle input changes for the form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInstruction((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    GenerateRecipe();
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    fetchData();
    setIsModalOpen(false);
  };

  return (
    <div className="pt-10">
      <div className="w-full max-w-4xl p-6 m-auto border-2 border-purple-200 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-6 text-purple-700">
          Expire near items
        </h1>
        <table className="w-full border-collapse bg-gradient-to-r from-[#77b1d4] to-[#a1c6e8] rounded-lg mt-6 shadow-md">
          <thead>
            <tr className="text-white">
              <th className="border-b-2 p-4 text-left">Name</th>
              <th className="border-b-2 p-4 text-left">Date</th>
              <th className="border-b-2 p-4 text-left">Quantity</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(filtered) && filtered.length > 0 ? (
              filtered.map((item, index) => (
                <tr
                  key={index}
                  className="bg-white hover:bg-gray-100 transition-all duration-200"
                >
                  <td className="border-t p-4">{item.name}</td>
                  <td className="border-t p-4">{item.date}</td>
                  <td className="border-t p-4">{item.quantity}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center p-4 text-gray-500">
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="relative pl-80 pt-5">
        <button
          onClick={openModal}
          className="px-4 py-2 bg-purple-500 text-white font-bold rounded-lg hover:bg-purple-700 transition duration-300"
        >
          Generate Recipe
        </button>

        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
              <h2 className="text-2xl font-bold mb-4">Popup Form</h2>
              <form onSubmit={handleFormSubmit}>
                <div className="mb-4">
                  <label
                    className="block text-sm font-medium mb-2"
                    htmlFor="ingredients"
                  >
                    Ingredients
                  </label>
                  <input
                    type="text"
                    id="ingredients"
                    name="ingredients"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    value={Instruction.ingredients}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-sm font-medium mb-2"
                    htmlFor="servingSize"
                  >
                    Serving Size
                  </label>
                  <input
                    type="text"
                    id="servingSize"
                    name="servingSize"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    value={Instruction.servingSize}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-sm font-medium mb-2"
                    htmlFor="style"
                  >
                    Style
                  </label>
                  <input
                    type="text"
                    id="style"
                    name="style"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    value={Instruction.style}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-sm font-medium mb-2"
                    htmlFor="timing"
                  >
                    Timing
                  </label>
                  <input
                    type="text"
                    id="timing"
                    name="timing"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    value={Instruction.timing}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-sm font-medium mb-2"
                    htmlFor="additional"
                  >
                    Do you need additional items?
                  </label>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="additional"
                      name="additional"
                      className="w-5 h-5 text-purple-500 border-gray-300 rounded focus:ring-purple-500"
                      checked={Instruction.additional}
                      onChange={(e) =>
                        setInstruction((prev) => ({
                          ...prev,
                          additional: e.target.checked, // Update the additional attribute
                        }))
                      }
                    />
                    <span className="ml-2 text-sm text-gray-700">Yes</span>
                  </div>
                </div>
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="px-4 py-2 bg-red-500 text-white font-bold rounded-lg hover:bg-red-700 transition duration-300 mr-2"
                  >
                    Close
                  </button>
                  <button
                    type="submit"
                    className={`px-4 py-2 font-bold rounded-lg transition duration-300 ${
                      loading
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-green-500 hover:bg-green-700 text-white"
                    }`}
                    disabled={loading}
                  >
                    {loading ? "Generating..." : "Generate Recipe"}
                  </button>
                </div>
              </form>
              {loading && (
                <p className="text-center text-purple-500 mt-4">
                  Generating recipe...
                </p>
              )}
            </div>
          </div>
        )}
      </div>

      {recipe ? (
        <div className="flex justify-center items-center mt-6">
          <div
            id="recipe-container" // Add an ID for PNG generation
            className="bg-white text-gray-800 p-6 rounded-lg shadow-lg max-w-2xl w-full"
          >
            <Markdown rehypePlugins={[rehypeHighlight]}>{recipe}</Markdown>
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-4">No recipe available.</p>
      )}

      {recipe && (
        <div className="flex justify-center mt-4 space-x-4">
          <button
            onClick={downloadPNG}
            className="px-4 py-2 bg-green-500 text-white font-bold rounded-lg hover:bg-green-700 transition duration-300"
          >
            Download as PNG
          </button>
        </div>
      )}
    </div>
  );
}
