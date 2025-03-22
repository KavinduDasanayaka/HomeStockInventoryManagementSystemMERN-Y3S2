import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

export default function CreateGrocery() {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    quantity: '',
    date: new Date().toISOString().split('T')[0],
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
      const res = await fetch('/api/grocery/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${currentUser?.token}`,
        },
        body: JSON.stringify({ ...formData, userRef: currentUser?._id }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || 'Failed to create grocery item');
      }

      setSuccess(true);
      setTimeout(() => navigate('/grocery-list'), 1000); // Redirect after 1 seconds
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7 text-[#0F0E47]">Add Grocery Item</h1>
      
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
          type="text"
          name="brand"
          placeholder="Brand"
          value={formData.brand}
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
          type="date"
          name="date"
          placeholder="Date"
          value={formData.date}
          onChange={handleChange}
          required
          className="border p-3 rounded-lg"
        />
            {/*<Link to='/grocery-list'>
        <button
        className='bg-red-700 text-white p-3 rounded-lg uppercase hover:opacity-95'>
        Back
        </button> 
        </Link>*/}
        <button
          type="submit"
          className="bg-[#0F0E47] text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80 "
          disabled={loading}
        >
          {loading ? 'Adding...' : 'Add Grocery'}
        </button>
        
      </form>
      
    </div>
  );
}