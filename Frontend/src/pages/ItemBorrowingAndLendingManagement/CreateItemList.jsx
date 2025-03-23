import React, { useState, useEffect } from 'react';
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
  const [showPopup, setShowPopup] = useState(false);

  // Effect to show popup when error or success changes
  useEffect(() => {
    if (error || success) {
      setShowPopup(true);
      
      // Auto-hide popup after 3 seconds
      const timer = setTimeout(() => {
        setShowPopup(false);
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [error, success]);

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

  // Popup notification component
  const Notification = () => {
    if (!showPopup) return null;
    
    return (
      <div className={`fixed top-4 right-4 p-4 rounded-lg shadow-lg max-w-xs z-50 transition-all transform ${
        showPopup ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'
      } ${error ? 'bg-red-100 text-red-800 border border-red-200' : 'bg-green-100 text-green-800 border border-green-200'}`}>
        <div className="flex items-start">
          <div className="flex-shrink-0">
            {error ? (
              <svg className="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            )}
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium">
              {error || 'Item added successfully! Redirecting...'}
            </p>
          </div>
          <div className="ml-auto pl-3">
            <button
              onClick={() => setShowPopup(false)}
              className="inline-flex text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7 text-[#0F0E47]">Add Borrowed Or Lent Item</h1>
      
      {/* Notification popup */}
      <Notification />
      
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
        
        <label className="block text-gray-700 font-medium gap-4">
          Remind Date
        </label>
        
        <input
          type="date"
          name="date"
          placeholder="Date"
          value={formData.date}
          onChange={handleChange}
          min={new Date().toISOString().split('T')[0]} // Restrict past dates
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
                id="borrowed"
                name="category"
                value="borrowed"
                checked={formData.category === 'borrowed'}
                onChange={handleChange}
                className="mr-2"
              />
              <label htmlFor="borrowed">Borrow</label>
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
          className="bg-[#0F0E47] text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80"
          disabled={loading}
        >
          {loading ? 'Adding...' : 'Add Item'}
        </button>
      </form>
    </div>
  );
}