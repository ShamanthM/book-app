const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Create a new user
router.post('/', userController.createUser);

// Retrieve all users
router.get('/', userController.getAllUsers);

// Retrieve a user by ID
router.get('/:userID', userController.getUserByID);

// Update a user by ID
router.put('/:userID', userController.updateUser);

// Delete a user by ID
router.delete('/:userID', userController.deleteUser);

module.exports = router;
