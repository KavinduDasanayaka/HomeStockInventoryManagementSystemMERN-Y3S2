import express from 'express';
import {
    creategroceryListing,
    updategroceryListing,
    deletegroceryListing,
    getgroceryListing,
    getExpiringListingsFiveDays,
} from '../controllers/grocerylist.controller.js';
import { verifyToken , authenticate } from '../utils/verifyUser.js';

const router = express.Router();


router.post('/create', verifyToken, creategroceryListing);
router.delete('/delete/:id', verifyToken, deletegroceryListing);
router.post('/update/:id', verifyToken, updategroceryListing);
router.get('/get/:id', verifyToken, getgroceryListing);
router.get('/getExpire', verifyToken, authenticate,getExpiringListingsFiveDays);

export default router;