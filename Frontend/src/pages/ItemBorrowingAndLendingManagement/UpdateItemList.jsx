import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function UpdateItemList() {
  const { id } = useParams(); // Get item ID from the URL
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);

  const [formData, setFormData] = useState({
    name: '',
    quantity: '',
    place: '',
    date: new Date().toISOString().split('T')[0],
    category: ''
  });

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGroceryDetails();
  }, []);

  const fetchGroceryDetails = async () => {
    try {
      const res = await fetch(`/api/item/get/${id}`);
      const data = await res.json();

      if (!res.ok) {
        setError(data.message || 'Error fetching item details');
        toast.error(data.message || 'Error fetching item details');
        return;
      }

      const formattedDate = new Date(data.date).toISOString().split('T')[0];

      setFormData({
        name: data.name,
        quantity: data.quantity,
        place: data.place,
        date: formattedDate,
        category: data.category
      });
      setLoading(false);
    } catch (err) {
      setError('Something went wrong while fetching the data');
      toast.error('Something went wrong while fetching the data');
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const res = await fetch(`/api/item/update/${id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.message || 'Failed to update item');
        toast.error(data.message || 'Failed to update item');
        return;
      }

      // Show success toast message
      toast.success('Item updated successfully! 🎉');

      // Redirect after delay to allow users to see the message
      setTimeout(() => {
        navigate('/item-list');
      }, 1000);
    } catch (err) {
      setError('Something went wrong. Please try again.');
      toast.error('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <ToastContainer />
      <h1 className="text-3xl font-semibold text-center my-7 text-[#0F0E47]">
        Update Borrowed or Lent Item
      </h1>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <form onSubmit={handleUpdate} className="flex flex-col gap-4">
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

          <div>
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

          {error && <p className="text-red-600">{error}</p>}
              
          <button
            type="submit"
            className="bg-green-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80"
          >
            Update Item 
          </button>
          
        </form>
      )}
    </div>
  );
}
