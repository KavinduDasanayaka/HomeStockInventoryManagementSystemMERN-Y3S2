import mongoose from "mongoose";

const itemBorrowingAndLendingSchema = new mongoose.Schema(
    {
    name: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    place: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    category: {
        type: String,
        enum: ["borrowed", "lent"], 
        required: true,
    },
    userRef: {
        type: String,
        required: true,
    },
},
    {timestamps: true}
);

const ItemBorrowingAndLending = mongoose.model('ItemBorrowingAndLending',itemBorrowingAndLendingSchema);

export default ItemBorrowingAndLending;
