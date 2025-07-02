import Invoice from "../models/invoice.model.js"; ;

export const createInvoice = async (req, res) => {
  try {
    const {
      customerName,
      phoneNumber,
      email,
      address,
      totalAmount,
      cartItems,
    } = req.body;

    const newInvoice = await Invoice.create({
      user: req.user._id,
      customerName,
      phoneNumber,
      email,
      address,
      totalAmount,
      cartItems,
    });

    res.status(201).json({ message: "Invoice created", invoice: newInvoice });
    console.log("Invoice created:", newInvoice);
  } catch (error) {
    console.error("Error creating invoice:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getInvoiceInfo = async (req, res) => {
  try {
    const invoice = await Invoice.findOne({ user: req.user._id })
      .sort({ createdAt: -1 })
      .lean();

    if (!invoice) {
      return res.status(404).json({ message: "No invoice found" });
    }

    res.status(200).json(invoice);
  } catch (error) {
    console.error("Error fetching invoice controller:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
