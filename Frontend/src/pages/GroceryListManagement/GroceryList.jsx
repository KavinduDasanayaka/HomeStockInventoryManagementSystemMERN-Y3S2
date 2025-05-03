import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function GroceryList() {
  const { currentUser } = useSelector((state) => state.user);
  const [orderHistory, setOrderHistory] = useState([]);
  const [showListingsError, setShowListingsError] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [previewItems, setPreviewItems] = useState([]);
  const [filtered, setFiltered] = useState(false);

  useEffect(() => {
    fetchData();
    fetchDataExpire();
    fetchPreviewItems();
  }, [currentUser]);

  const fetchDataExpire = async () => {
    try {
      const res = await fetch(`api/grocery/getExpire`);
      const data = await res.json();
      if (data.success === false) {
        return;
      }
      setFiltered(data.length);
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

  const fetchPreviewItems = async () => {
    try {
      setShowListingsError(false);
      const res = await fetch(`/api/previewInventory/get-previewInventory/${currentUser._id}`);
      const data = await res.json();
      if (data.success === false) {
        setShowListingsError(true);
        return;
      }
      setPreviewItems(data);
    } catch (error) {
      setShowListingsError(true);
    }
  };

  const handleDeleteConfirmation = (groceryId) => {
    setDeleteId(groceryId);
  };

  const handleCancelDelete = () => {
    setDeleteId(null);
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
      setDeleteId(null);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gray-50 min-h-screen">
      {typeof filtered === "number" && filtered > 0 && (
        <div className="mb-8 p-4 bg-red-50 border-l-4 border-red-500 rounded-lg shadow-sm flex items-center justify-between">
          <p className="text-lg font-medium text-red-800">
            ⚠️ System identified {filtered} near-expire item(s). Please check them or utilize the recipe generation option!
          </p>
          <Link to="/Generate">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300">
              Generate Recipe
            </button>
          </Link>
        </div>
      )}

      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800">Grocery List</h1>
        <Link to="/create-grocery-list">
          <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition duration-300">
            Add Grocery Items
          </button>
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-800 text-white">
              <th className="px-6 py-4 text-left font-semibold">Name</th>
              <th className="px-6 py-4 text-left font-semibold">Brand</th>
              <th className="px-6 py-4 text-left font-semibold">Quantity</th>
              <th className="px-6 py-4 text-left font-semibold">Date</th>
              <th className="px-6 py-4 text-center font-semibold">Edit</th>
              <th className="px-6 py-4 text-center font-semibold">Delete</th>
            </tr>
          </thead>
          <tbody>
            {orderHistory?.map((elem, index) => (
              <tr
                key={index}
                className="border-b hover:bg-gray-100 transition duration-200"
              >
                <td className="px-6 py-4">{elem.name}</td>
                <td className="px-6 py-4">{elem.brand}</td>
                <td className="px-6 py-4">{elem.quantity}</td>
                <td className="px-6 py-4">
                  {new Date(elem.date).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 text-center">
                  <Link to={`/update-grocery-list/${elem._id}`}>
                    <button className="bg-green-600 text-white px-4 py-1 rounded-lg hover:bg-green-700 transition duration-300">
                      Edit
                    </button>
                  </Link>
                </td>
                <td className="px-6 py-4 text-center">
                  <button
                    onClick={() => handleDeleteConfirmation(elem._id)}
                    className="bg-red-600 text-white px-4 py-1 rounded-lg hover:bg-red-700 transition duration-300"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <h2 className="text-2xl font-semibold text-gray-800 p-6">Preview Inventory</h2>
        <table className="w-full">
          <thead>
            <tr className="bg-gray-800 text-white">
              <th className="px-6 py-4 text-left font-semibold">Name</th>
              <th className="px-6 py-4 text-left font-semibold">Unit Price</th>
              <th className="px-6 py-4 text-left font-semibold">Quantity</th>
            </tr>
          </thead>
          <tbody>
            {previewItems?.map((elem, index) => (
              <tr
                key={index}
                className="border-b hover:bg-gray-100 transition duration-200"
              >
                <td className="px-6 py-4">{elem.item}</td>
                <td className="px-6 py-4">{elem.unitPrice}</td>
                <td className="px-6 py-4">{elem.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showListingsError && (
        <p className="text-red-600 mt-5 text-center">Error showing listings</p>
      )}

      {deleteId && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60">
          <div className="bg-white p-8 rounded-xl shadow-2xl max-w-md w-full">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
              Confirm Deletion
            </h2>
            <p className="text-gray-600 mb-6 text-center">
              Are you sure you want to delete this grocery item?
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleGroceryDelete}
                className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition duration-300"
              >
                Delete
              </button>
              <button
                onClick={handleCancelDelete}
                className="bg-gray-300 text-gray-800 px-6 py-2 rounded-lg hover:bg-gray-400 transition duration-300"
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