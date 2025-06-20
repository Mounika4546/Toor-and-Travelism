import express from 'express';
import { 
    createTour, 
    getSingleTour, 
    getAllTour, 
    updateTour, 
    deleteTour,
    getTourBySearch,
    getFeaturedTour,
    getTourCount
} from '../controllers/tourController.js';

import { verifyAdmin } from '../utils/verifyToken.js';

const router = express.Router();

// CRUD operations protected by Admin

// POST: Create a new tour
router.post('/', verifyAdmin, createTour);

// PUT: Update a tour by ID
router.put('/:id', verifyAdmin, updateTour);

// DELETE: Delete a tour by ID
router.delete('/:id', verifyAdmin, deleteTour);

// Normal public routes (no authentication)
// 👇 Specific static routes come first
router.get('/search/getTourBySearch', getTourBySearch); 
router.get('/search/getFeaturedTours', getFeaturedTour); 
router.get('/search/getTourCount', getTourCount); 

// 👇 Dynamic route comes after
router.get('/:id', getSingleTour);  
router.get('/', getAllTour); 


export default router;
