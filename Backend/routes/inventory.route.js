import express from 'express';
import { getInventory, addInventory, deleteInventory, updateInventory } from '../controllers/inventory.controller.js';

const router = express.Router();

router.get('/', getInventory);
router.post('/', addInventory);
router.delete('/:id', deleteInventory);
router.post('/update/:id', updateInventory); 



export default router;
