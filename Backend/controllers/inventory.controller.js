import { Inventory } from '../models/inventory.model.js';

// Get all inventory items
export const getInventory = async (req, res) => {
  try {
    const items = await Inventory.find();
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: "Error fetching items" });
  }
};

// Add a new inventory item
export const addInventory = async (req, res) => {
  try {
    const { name, quantity, expireDate } = req.body;
    const newItem = new Inventory({ name, quantity, expireDate });
    await newItem.save();
    res.json(newItem);
  } catch (error) {
    res.status(500).json({ message: "Error adding item" });
  }
};

// Delete an inventory item
export const deleteInventory = async (req, res) => {
  try {
    await Inventory.findByIdAndDelete(req.params.id);
    res.json({ message: "Item deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting item" });
  }
};

// Update an inventory item (POST request)
export const updateInventory = async (req, res) => {
  try {
    const { name, quantity, expireDate } = req.body;
    const updatedItem = await Inventory.findByIdAndUpdate(
      req.params.id,
      { name, quantity, expireDate },
      { new: true }
    );

    if (!updatedItem) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.json(updatedItem);
  } catch (error) {
    console.error("Error updating item:", error);
    res.status(500).json({ message: "Error updating item" });
  }
};
