import mongoose from 'mongoose';

const groceryListingSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    userRef: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const GroceryListing = mongoose.model('GroceryListing', groceryListingSchema);

export default GroceryListing;