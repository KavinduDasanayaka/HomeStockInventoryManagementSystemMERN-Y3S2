import express from 'express';
import multer from "multer";
import {
    createPreviewInventoryListing,handleUpload
} from '../controllers/previewinventory.controller.js';
import { verifyToken , authenticate } from '../utils/verifyUser.js';

const router = express.Router();


router.post('/create', verifyToken,authenticate, createPreviewInventoryListing);

const upload = multer({ dest: "uploads/" });
router.post("/upload", upload.single("image"), handleUpload);

// router.delete('/delete/:id', verifyToken, deletegroceryListing);
// router.post('/update/:id', verifyToken, updategroceryListing);
// router.get('/get/:id', verifyToken, getgroceryListing);
// router.get('/getExpire', verifyToken, authenticate,getExpiringListingsFiveDays);

export default router;