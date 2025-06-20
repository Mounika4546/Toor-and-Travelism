import User from '../models/User.js';

// Create a new User
export const createUser = async (req, res) => {
    const { title } = req.body;

    try {
        // Check if a User with the same title already exists
        const existingUser = await User.findOne({ title });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: `A User with the title "${title}" already exists. Please choose a different title.`
            });
        }

        const newUser = new User(req.body);
        const savedUser = await newUser.save();

        res.status(200).json({
            success: true,
            message: 'Successfully created the User.',
            data: savedUser
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Failed to create the User. Try again.',
            error: err.message
        });
    }
};
// Get a single User by ID
export const getSingleUser = async (req, res) => {
    const id = req.params.id;
    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found.'
            });
        }
        res.status(200).json({
            success: true,
            data: user
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Failed to get the User.',
            error: err.message
        });
    }
};

// Get all Users
export const getAllUser = async (req, res) => {
    
    try {
        const users = await User.find({}).
        res.status(200).json({
            success: true,
            messsage:"successful",
            data: users
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve Users.',
            error: err.message
        });
    }
};

// Update a User by ID
export const updateUser = async (req, res) => {
    const id = req.params.id;

    try {
        const updatedUser = await User.findByIdAndUpdate(id, { $set: req.body }, { new: true });
        if (!updatedUser) {
            return res.status(404).json({
                success: false,
                message: 'User not found.'
            });
        }
        res.status(200).json({
            success: true,
            message: 'User successfully updated.',
            data: updatedUser
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Failed to update the User.',
            error: err.message
        });
    }
};

// Delete a User by ID
export const deleteUser = async (req, res) => {
    const id = req.params.id;
    try {
        const deletedUser = await User.findByIdAndDelete(id);
        if (!deletedUser) {
            return res.status(404).json({
                success: false,
                message: 'User not found.'
            });
        }
        res.status(200).json({
            success: true,
            message: 'User successfully deleted.'
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Failed to delete the User.',
            error: err.message
        });
    }
};