import mongoose from "mongoose";

const PreviewInventorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 0
    },
    unitPrice: {
        type: Number,
        required: true,
        min: 0
    },
    userRef: {
        type: String,
        required: true,
    },
}, {
    timestamps: true
});

const PreviewInventory = mongoose.model('PreviewInventory', PreviewInventorySchema);

export default PreviewInventory;