import Booking from '../models/Booking.js';

export const createBooking = async (req, res) => {
    console.log("Received Booking Data:", req.body); // 👈 log request body
  
    const newBooking = new Booking(req.body);
  
    try {
      const savedBooking = await newBooking.save();
  
      console.log("Saved Booking:", savedBooking); // 👈 log saved data
  
      res.status(200).json({
        success: true,
        message: "Your tour is booked",
        data: savedBooking,
      });
    } catch (error) {
      console.error("Booking error:", error); // 👈 show error in terminal
  
      res.status(500).json({
        success: false,
        message: error.message || "Internal server error",
      });
    }
  };
  

  export const getBooking = async(req,res) =>{
    const id=req.params.id
    try{
        const book=await Booking.findById(id)

        res.status(200).json({
            success:true,
            message:"successful",
            data:book,
        });
    }
    catch(error){
        res.status(404).json({
            success: false, // should be false!
            message: "not found",
            // send the error message for debugging
        });
    }
  }

  export const getAllBooking = async (req, res) => {
    try {
      const books = await Booking.find(); // <-- find all
      res.status(200).json({
        success: true,
        message: "successful",
        data: books,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message || "internal server error",
      });
    }
  };
  