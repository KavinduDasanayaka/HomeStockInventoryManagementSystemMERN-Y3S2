import mongoose from 'mongoose';

const inventorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
  expireDate: { type: Date, required: true }, // Added expireDate field
});

export const Inventory = mongoose.model('Inventory', inventorySchema);
