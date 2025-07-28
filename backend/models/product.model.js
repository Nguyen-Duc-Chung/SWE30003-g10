import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
    {
		brand: {
			type: String,
			required: true,
		},

        name: {
            type:String,
            required: true,
        },
        description: {
			type: String,
			required: true,
		},
		medicine_component: {
			type: String,
			required: true,
		},
		price: {
			type: Number,
			min: 0,
			required: true,
		},
		image: {
			type: String,
			required: [true, "Image is required"],
		},
		category: {
			type: String,
			required: true,
		},
		isFeatured: {
			type: Boolean,
			default: false,
		},

		specific_category: {
			type: String,
			required: true,
		},

		subject: {
			type: [String],
			required: true,
		},

		manufacturing_country: {
			type: String,
			required: true,
		},
		requirePrescription: {
			type: Boolean,
			default: false,
		},

		Inventory_Quantity: {                         // ✅✅✅✅ Thêm INVENTORY_QUANTITY
            type: Number,
            // required: true,
            min: 0,
            default: 0
        },
		

    },
    { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

export default Product;