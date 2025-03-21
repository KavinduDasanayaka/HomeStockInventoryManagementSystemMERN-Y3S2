import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function GroceryList() {
  const { currentUser } = useSelector((state) => state.user);
  const [itemHistory, setItemHistory] = useState([]);
  const [showListingsError, setShowListingsError] = useState(false);
  const [deleteId, setDeleteId] = useState(null); // To store the item to be deleted

  useEffect(() => {
    fetchData();
  }, [currentUser]);

  const fetchData = async () => {
    try {
      setShowListingsError(false);
      const res = await fetch(`/api/user/itemlistings/${currentUser._id}`);
      const data = await res.json();
      if (data.success === false) {
        setShowListingsError(true);
        return;
      }

      setItemHistory(data);
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
      const res = await fetch(`/api/item/delete/${deleteId}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
        return;
      }

      setItemHistory((prev) => prev.filter((grocery) => grocery._id !== deleteId));
      setDeleteId(null); // Hide the confirmation modal after deletion
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className='px-10'>
      <h1 className='text-3xl text-center font-semibold my-7 text-[#0F0E47]'>Borrowed And Lent Items List</h1>
      <div className="flex justify-end mb-4">
        <Link to="/create-item-list">
          <button className="bg-green-700 text-white px-4 py-2 rounded-lg">Add Items</button>
        </Link>
      </div>

      <table className="w-full border-2 border-[#8686ac]">
        <thead>
          <tr className="bg-[#272757] text-white text-left">
            <th className="border border-[#272757] px-4 py-2">Name</th>
            <th className="border border-[#272757] px-4 py-2">Quantity</th>
            <th className="border border-[#272757] px-4 py-2">Place</th>
            <th className="border border-[#272757] px-4 py-2">Category</th>  
            <th className="border border-[#272757] px-4 py-2">Remind Date</th>  
            <th className="border border-[#272757] px-4 py-2">Edit</th>  
            <th className="border border-[#272757] px-4 py-2">Delete</th>  
          </tr>
        </thead>

        <tbody>
          {itemHistory?.map((elem, index) => (
            <tr key={index} className='bg-[#505081] text-white'>
              <td className='border-b-2 border-b-[#505081] px-4 py-2'>{elem.name}</td>
              <td className='border-b-2 border-b-[#505081] px-4 py-2'>{elem.quantity}</td>
              <td className='border-b-2 border-b-[#505081] px-4 py-2'>{elem.place}</td>
              <td className='border-b-2 border-b-[#505081] px-4 py-2'>{elem.category}</td>
              <td className='border-b-2 border-b-[#505081] px-4 py-2'>
                    {new Date(elem.date).toLocaleDateString()}
              </td>
              <td className='border-b-2 border-b-[#505081] px-4 py-2 text-center'>
                <Link to={`/update-item-list/${elem._id}`}>
                  <button className="bg-green-700 flex text-white px-3 py-1 rounded-lg">Edit</button>
                </Link>
              </td>
              <td className='border-b-2 flex border-b-[#505081] px-4 py-2 text-center'>
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

      <p className='text-red-700 mt-5'>
        {showListingsError ? 'Error showing listings' : ''}
      </p>

      {/* Confirmation Modal */}
      {deleteId && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-5 rounded-lg shadow-lg text-center">
            <p className="text-xl mb-4">Are you sure you want to delete this item?</p>
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
