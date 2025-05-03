import mongoose from "mongoose";

const PreviewInventorySchema = new mongoose.Schema({
    item: {
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
        type: String,
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