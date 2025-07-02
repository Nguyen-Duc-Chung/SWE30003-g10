import cloudinary from "../lib/cloudinary.js";
import Prescription from "../models/prescription.model.js";

export const createPrescription = async (req, res) => {
  try {
    // console.log("Incoming request body:", req.body);
    // console.log("Authenticated user:", req.user);

    const { fullName, phoneNumber, note, image, productId } = req.body;

    // Validate required fields
    if (!fullName || !phoneNumber || !image || !productId) {
      console.warn("Missing fields:", { fullName, phoneNumber, image, productId });
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Upload image
    let cloudinaryResponse = null;
    if (image) {
      console.log("Uploading image to Cloudinary...");
      cloudinaryResponse = await cloudinary.uploader.upload(image, {
        folder: "prescriptions",
      });
      console.log("Cloudinary upload result:", cloudinaryResponse);
    }

    // Save to database
    const prescriptionData = {
      user: req.user._id,
      fullName,
      phoneNumber,
      note,
      images: [cloudinaryResponse.secure_url],
      product: productId,
    };

    console.log("Creating prescription with data:", prescriptionData);
    const prescription = await Prescription.create(prescriptionData);

    console.log("Prescription created successfully:", prescription._id);
    res.status(201).json(prescription);

  } catch (error) {
    console.error("Error in createPrescription controller:", error);
    res.status(500).json({ message: error.message });
  }
};


export const getAllPrescriptions = async (req,res) => {
    try {
        const prescriptions = await Prescription.find({});
        res.json({ prescriptions });
    }catch (error){
        console.log("Error in getAllPrescriptions controller", error.message); 
        res.status(500).json({message: error.message});
    }
}

export const updatePrescriptionStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    console.log("PATCH request to update prescription:", { id, status });

    if (!["pending", "approved", "rejected"].includes(status)) {
      console.warn("Invalid status value:", status);
      return res.status(400).json({ message: "Invalid status value" });
    }

    const updated = await Prescription.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updated) {
      console.warn("Prescription not found with ID:", id);
      return res.status(404).json({ message: "Prescription not found" });
    }

    console.log("Prescription status updated successfully:", updated);
    res.json(updated);
  } catch (error) {
    console.error("Error in updatePrescriptionStatus controller:", error);
    res.status(500).json({ message: error.message });
  }
};


export const getUserPrescriptionForProduct = async (req, res) => {
  const { productId } = req.params;
  const prescriptions = await Prescription.find({
    user: req.user._id,
    product: productId,
  }).sort({ createdAt: -1 });

  if (!prescriptions.length) return res.json({ status: null });

  return res.json({ status: prescriptions[0].status });
};
