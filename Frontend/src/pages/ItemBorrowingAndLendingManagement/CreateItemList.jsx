import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

export default function CreateItemList() {
    const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    quantity: '',
    place: '',
    date: new Date().toISOString().split('T')[0], // Default to today in YYYY-MM-DD format
    category: 'borrowed' // Default selected option
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/item/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${currentUser?.token}`,
        },
        body: JSON.stringify({ ...formData, userRef: currentUser?._id }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || 'Failed to create borrowed or lent item');
      }

      setSuccess(true);
      setTimeout(() => navigate('/item-list'), 500); // Redirect after 0.5 seconds
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7 text-[#0F0E47]">Add Borrowed Or Lent Item</h1>
      
      {error && <p className="text-red-600 text-center">{error}</p>}
      {success && <p className="text-green-700 text-center">Item added successfully! Redirecting...</p>}
      
      
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          name="name"
          placeholder="Item Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="border p-3 rounded-lg"
        />
        
        <input
          type="number"
          name="quantity"
          placeholder="Quantity"
          value={formData.quantity}
          onChange={handleChange}
          required
          className="border p-3 rounded-lg"
        />
        
        <input
          type="text"
          name="place"
          placeholder="Place"
          value={formData.place}
          onChange={handleChange}
          required
          className="border p-3 rounded-lg"
        />
        
        <input
          type="date"
          name="date"
          placeholder="Date"
          value={formData.date}
          onChange={handleChange}
          required
          className="border p-3 rounded-lg"
        />

        <div className="">
          <label className="block text-gray-700 font-medium mb-2">
            Category
          </label>
          <div className="flex space-x-4">
            <div className="flex items-center">
              <input
                type="radio"
                id="borrow"
                name="category"
                value="borrow"
                checked={formData.category === 'borrowed'}
                onChange={handleChange}
                className="mr-2"
              />
              <label htmlFor="borrow">Borrow</label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                id="lent"
                name="category"
                value="lent"
                checked={formData.category === 'lent'}
                onChange={handleChange}
                className="mr-2"
              />
              <label htmlFor="lent">Lent</label>
            </div>
          </div>
        </div>
            
        <button
          type="submit"
          className="bg-[#0F0E47] text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80 "
          disabled={loading}
        >
          {loading ? 'Adding...' : 'Add Item'}
        </button>
        
      </form>
      
    </div>
  );
}
