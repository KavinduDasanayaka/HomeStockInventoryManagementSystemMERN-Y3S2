import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function GroceryList() {
  const { currentUser } = useSelector((state) => state.user);
  const [orderHistory, setOrderHistory] = useState([]);
  const [showListingsError, setShowListingsError] = useState(false);
  const [deleteId, setDeleteId] = useState(null); // To store the item to be deleted

  const [filtered, setFiltered] = useState(false);

  useEffect(() => {
    fetchData();
    fetchDataExpire();
  }, [currentUser]);

  // Fetch data for filtered items
  const fetchDataExpire = async () => {
    try {
      const res = await fetch(`api/grocery/getExpire`);
      const data = await res.json();
      if (data.success === false) {
        return;
      }
      setFiltered(data.length);
      console.log(filtered);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchData = async () => {
    try {
      setShowListingsError(false);
      const res = await fetch(`/api/user/grocerylistings/${currentUser._id}`);
      const data = await res.json();
      if (data.success === false) {
        setShowListingsError(true);
        return;
      }

      setOrderHistory(data);
    } catch (error) {
      setShowListingsError(true);
    }
  };

  const handleDeleteConfirmation = (groceryId) => {
    setDeleteId(groceryId); // Show the confirmation modal
  };

  const handleCancelDelete = () => {
    setDeleteId(null); // Hide the confirmation modal
  };

  const handleGroceryDelete = async () => {
    try {
      const res = await fetch(`/api/grocery/delete/${deleteId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
        return;
      }

      setOrderHistory((prev) =>
        prev.filter((grocery) => grocery._id !== deleteId)
      );
      setDeleteId(null); // Hide the confirmation modal after deletion
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="px-10 ">

      {typeof filtered === "number" && filtered > 0 && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-800 p-4 mb-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <p className="text-lg font-semibold">
              ⚠️ System identified {filtered} near-expire item(s). Please check
              them or utilize the recipe generation option!
            </p>
            <Link to="/Generate">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-red-800 transition duration-300">
                Generate Recipe
              </button>
            </Link>
          </div>
        </div>
      )}

      <h1 className="text-3xl text-center font-semibold my-7 text-[#0F0E47]">
        Grocery List
      </h1>
      <div className="flex justify-end mb-4">
        <Link to="/create-grocery-list">
          <button className="bg-green-700 text-white px-4 py-2 rounded-lg">
            Add Grocery Items
          </button>
        </Link>
      </div>

      <table className="w-full border-2 border-[#77b1d4]">
        <thead>
          <tr className="bg-[#517891] text-white text-left">
            <th className="border border-[#517891] px-4 py-2">Name</th>
            <th className="border border-[#517891] px-4 py-2">Brand</th>
            <th className="border border-[#517891] px-4 py-2">Quantity</th>
            <th className="border border-[#517891] px-4 py-2">Date</th>
            <th className="border border-[#517891] px-4 py-2">Edit</th>
            <th className="border border-[#517891] px-4 py-2">Delete</th>
          </tr>
        </thead>

        <tbody>
          {orderHistory?.map((elem, index) => (
            <tr key={index} className="bg-[#77b1d4] text-black">
              <td className="border-b-2 border-b-[#77b1d4] px-4 py-2">
                {elem.name}
              </td>
              <td className="border-b-2 border-b-[#77b1d4] px-4 py-2">
                {elem.brand}
              </td>
              <td className="border-b-2 border-b-[#77b1d4] px-4 py-2">
                {elem.quantity}
              </td>
              <td className="border-b-2 border-b-[#77b1d4] px-4 py-2">
                {new Date(elem.date).toLocaleDateString()}
              </td>
              <td className="border-b-2 border-b-[#77b1d4] px-4 py-2 text-center">
                <Link to={`/update-grocery-list/${elem._id}`}>
                  <button className="bg-green-700 flex text-white px-3 py-1 rounded-lg">
                    Edit
                  </button>
                </Link>
              </td>
              <td className="border-b-2 flex border-b-[#77b1d4] px-4 py-2 text-center">
                <button
                  onClick={() => handleDeleteConfirmation(elem._id)}
                  className="bg-red-700 text-white px-3 py-1 rounded-lg"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <p className="text-red-700 mt-5">
        {showListingsError ? "Error showing listings" : ""}
      </p>

      {/* Confirmation Modal */}
      {deleteId && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-5 rounded-lg shadow-lg text-center">
            <p className="text-xl mb-4">
              Are you sure you want to delete this grocery?
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleGroceryDelete}
                className="bg-red-700 text-white px-4 py-2 rounded-lg"
              >
                OK
              </button>
              <button
                onClick={handleCancelDelete}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
