import Tour from '../models/Tour.js';

// Create a new tour
export const createTour = async (req, res) => {
    const { title } = req.body;

    try {
        // Check if a tour with the same title already exists
        const existingTour = await Tour.findOne({ title });

        if (existingTour) {
            return res.status(400).json({
                success: false,
                message: `A tour with the title "${title}" already exists. Please choose a different title.`
            });
        }

        const newTour = new Tour(req.body);
        const savedTour = await newTour.save();

        res.status(200).json({
            success: true,
            message: 'Successfully created the tour.',
            data: savedTour
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Failed to create the tour. Try again.',
            error: err.message
        });
    }
};
// Get a single tour by ID
export const getSingleTour = async (req, res) => {
    const id = req.params.id;
    try {
        const tour = await Tour.findById(id).populate('reviews');
        if (!tour) {
            return res.status(404).json({
                success: false,
                message: 'Tour not found.'
            });
        }
        res.status(200).json({
            success: true,
            data: tour
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Failed to get the tour.',
            error: err.message
        });
    }
};

export const getAllTour = async (req, res) => {
    const page = parseInt(req.query.page) || 0; // Default to page 0 if not given
   
    try {
        const tours = await Tour.find({})
            .populate('reviews')
            .skip(page * 8)   // <-- Corrected here
            .limit(8);        // <-- Corrected here

        res.status(200).json({
            success: true,
            count: tours.length,
            data: tours
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve tours.',
            error: err.message
        });
    }
};


// Update a tour by ID
export const updateTour = async (req, res) => {
    const id = req.params.id;

    try {
        const updatedTour = await Tour.findByIdAndUpdate(id, { $set: req.body }, { new: true });
        if (!updatedTour) {
            return res.status(404).json({
                success: false,
                message: 'Tour not found.'
            });
        }
        res.status(200).json({
            success: true,
            message: 'Tour successfully updated.',
            data: updatedTour
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Failed to update the tour.',
            error: err.message
        });
    }
};

// Delete a tour by ID
export const deleteTour = async (req, res) => {
    const id = req.params.id;
    try {
        const deletedTour = await Tour.findByIdAndDelete(id);

        if (!deletedTour) {
            return res.status(404).json({
                success: false,
                message: 'Tour not found.'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Tour successfully deleted.'
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Failed to delete the tour.',
            error: err.message
        });
    }
};


export const getTourBySearch = async (req, res) => {
    const city = new RegExp(req.query.city, 'i'); // case-insensitive search
    const distance = parseInt(req.query.distance); // fixed this line
    const maxGroupSize = parseInt(req.query.maxGroupSize);

    try {
        const tours = await Tour.find({
            city,
            distance: { $gte: distance },
            maxGroupSize: { $gte: maxGroupSize }
        });

        res.status(200).json({
            success: true,
            message: "successful",
            data: tours,
        });
    } catch (err) {
        res.status(404).json({
            success: false,
            message: "not found",
        });
    }
};

//get featured tour
export const getFeaturedTour= async (req, res) => {

    try {
        const tours = await Tour.find({featured:true}).populate('reviews').limit(8);
        res.status(200).json({
            success: true,
            message:"successful",
            data: tours
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'not found',
        });
    }
};

export const getTourCount=async(req,res) =>{
    try{
        const tourCount=await Tour.estimatedDocumentCount();

        res.status(200).json({ success:true,data:tourCount});

    }
    catch(err){
        res.status(500).json({success:false,message:"failed to fetch"})
    }
}

