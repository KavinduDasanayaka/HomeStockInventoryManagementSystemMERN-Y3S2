import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function UpdateGroceryList() {
  const { id } = useParams(); // Get grocery ID from the URL
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);

  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    quantity: '',
    date: new Date().toISOString().split('T')[0],
  });

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGroceryDetails();
  }, []);

  const fetchGroceryDetails = async () => {
    try {
      const res = await fetch(`/api/grocery/get/${id}`);
      const data = await res.json();

      if (!res.ok) {
        setError(data.message || 'Error fetching grocery details');
        return;
      }

      const formattedDate = new Date(data.date).toISOString().split('T')[0];

      setFormData({
        name: data.name,
        brand: data.brand,
        quantity: data.quantity,
        date: formattedDate,
      });
      setLoading(false);
    } catch (err) {
      setError('Something went wrong while fetching the data');
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const res = await fetch(`/api/grocery/update/${id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.message || 'Failed to update grocery');
        return;
      }

      navigate('/grocery-list'); // Redirect to grocery list page
    } catch (err) {
      setError('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7 text-[#0F0E47]">
        Update Grocery Item
      </h1>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <form onSubmit={handleUpdate} className="flex flex-col gap-4">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Grocery Name"
            required
            className="border p-3 rounded-lg"
          />

          <input
            type="text"
            name="brand"
            value={formData.brand}
            onChange={handleChange}
            placeholder="Brand"
            required
            className="border p-3 rounded-lg"
          />

          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            placeholder="Quantity"
            required
            className="border p-3 rounded-lg"
          />

          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            placeholder="date"
            required
            className="border p-3 rounded-lg"
          />

          {error && <p className="text-red-600">{error}</p>}

          <button
            type="submit"
            className=" bg-green-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80"
          >
            Update Grocery
          </button>
        </form>
      )}
    </div>
  );
}