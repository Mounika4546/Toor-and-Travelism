import express from 'express'
import { deleteUser, getAllUser, getSingleUser, updateUser } from '../controllers/userController.js';
const router=express.Router()

import { verifyAdmin, verifyUser } from '../utils/verifyToken.js';
// PUT: Update a user by ID
router.put('/:id',verifyUser,updateUser);

// DELETE: Delete a user by ID
router.delete('/:id',verifyUser, deleteUser);

// GET: Get a single user by ID
router.get('/:id',verifyUser, getSingleUser);

// GET: Get all users
router.get('/',verifyAdmin, getAllUser);


export default router