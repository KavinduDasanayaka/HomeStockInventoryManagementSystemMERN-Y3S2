import express from 'express';
import {
    createitemBorrowingAndLending,
    getitemBorrowingAndLending,
    updateitemBorrowingAndLending,
    deleteitemBorrowingAndLending,
    
} from '../controllers/itemborrowingandlending.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();


router.post('/create', verifyToken, createitemBorrowingAndLending);
router.delete('/delete/:id', verifyToken, deleteitemBorrowingAndLending);
router.post('/update/:id', verifyToken, updateitemBorrowingAndLending);
router.get('/get/:id', getitemBorrowingAndLending);

export default router;
