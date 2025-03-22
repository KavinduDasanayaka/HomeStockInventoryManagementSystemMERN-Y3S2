import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';

export default function Inventory() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({ name: '', quantity: '' });
  const [editItem, setEditItem] = useState(null);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await axios.get('http://localhost:5173/api/inventory');
      setItems(response.data);
    } catch (error) {
      toast.error('Error fetching inventory.');
    }
  };

  const handleAddItem = async () => {
    if (!newItem.name || !newItem.quantity) {
      toast.warning('Please fill all fields.');
      return;
    }
    try {
      const response = await axios.post('http://localhost:5173/api/inventory', newItem);
      setItems([...items, response.data]);
      setNewItem({ name: '', quantity: '' });
      toast.success('Item added successfully!');
    } catch (error) {
      toast.error('Error adding item.');
    }
  };

  const handleDeleteItem = async (id) => {
    try {
      await axios.delete(`http://localhost:5173/api/inventory/${id}`);
      setItems(items.filter(item => item._id !== id));
      toast.success('Item deleted!');
    } catch (error) {
      toast.error('Error deleting item.');
    }
  };

  const handleEditItem = (item) => {
    setEditItem({ ...item });
  };

  const handleUpdateItem = async () => {
    if (!editItem.name || !editItem.quantity) {
      toast.warning('Please fill all fields.');
      return;
    }
    try {
      const response = await axios.post(
        `http://localhost:5173/api/inventory/update/${editItem._id}`, 
        { name: editItem.name, quantity: Number(editItem.quantity) }
      );
      setItems(items.map(item => (item._id === editItem._id ? response.data : item)));
      setEditItem(null);
      toast.success('Item updated!');
    } catch (error) {
      toast.error('Error updating item.');
    }
  };

  return (
    <div className='py-10 px-4 max-w-4xl mx-auto'>
      <ToastContainer />
      <h1 className='text-3xl font-bold mb-6 text-[#0F0E47] text-center'>Inventory Management</h1>

      {/* Add New Item */}
      <div className='flex gap-2 mb-6'>
        <input
          type='text'
          placeholder='Item Name'
          className='border rounded p-2 w-full'
          value={newItem.name}
          onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
        />
        <input
          type='number'
          placeholder='Quantity'
          className='border rounded p-2 w-24'
          value={newItem.quantity}
          onChange={(e) => setNewItem({ ...newItem, quantity: e.target.value })}
        />
        <button
          className='bg-green-500 text-white px-4 py-2 rounded'
          onClick={handleAddItem}
        >
          Add
        </button>
      </div>

      {/* Inventory List */}
      <ul className='border rounded p-4 bg-gray-50'>
        {items.map(item => (
          <li key={item._id} className='flex justify-between items-center p-2 border-b'>
            {editItem && editItem._id === item._id ? (
              <div className='flex gap-2 w-full'>
                <input
                  type='text'
                  className='border rounded p-1 w-full'
                  value={editItem.name}
                  onChange={(e) => setEditItem({ ...editItem, name: e.target.value })}
                />
                <input
                  type='number'
                  className='border rounded p-1 w-24'
                  value={editItem.quantity}
                  onChange={(e) => setEditItem({ ...editItem, quantity: e.target.value })}
                />
                <button className='bg-blue-500 text-white px-3 py-1 rounded' onClick={handleUpdateItem}>
                  Save
                </button>
              </div>
            ) : (
              <>
                <span>{item.name} - {item.quantity}</span>
                <div className='flex gap-2'>
                  <button
                    className='bg-yellow-500 text-white px-2 py-1 rounded'
                    onClick={() => handleEditItem(item)}
                  >
                    Edit
                  </button>
                  <button
                    className='bg-red-500 text-white px-2 py-1 rounded'
                    onClick={() => handleDeleteItem(item._id)}
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}