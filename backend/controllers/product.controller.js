import { redis } from "../lib/redis.js";
import cloudinary from "../lib/cloudinary.js";
import Product from "../models/product.model.js";


export const getAllProducts = async (req,res) => {
    try {
        const products = await Product.find({});
        res.json({ products });
    }catch (error){
        console.log("Error in getAllProducts controller", error.message); 
        res.status(500).json({message: error.message});
    }
}


export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
        return res.json(product);
        }
    return res.status(404).json({ message: "Product not found" });
  } catch (error) {
   console.error("Error in getProductById controller", error.message);
   return res.status(500).json({ message: error.message });
 }
};

export const getFeaturedProducts = async (req, res) => {

    try{

        let featuredProducts = await redis.get("featuredProducts");

        if(featuredProducts){
            return res.json(JSON.parse(featuredProducts));
        }

         featuredProducts = await Product.find({isFeatured: true});

        if(!featuredProducts){
            res.status(404).json({message: "No featured products found"});
        }
        await redis.set("featured_products", JSON.stringify(featuredProducts));

        res.json(featuredProducts);



    } catch (error){
        console.log("Error in getFeaturedProducts controller", error.message);
        res.status(500).json({message: error.message});
    }
} 

export const createProduct = async (req, res) => {
    try{

        const { brand,name, description, price, category,
                specific_category, image, manufacturing_country, 
                requirePrescription, subject, Inventory_Quantity // ✅✅✅✅ Thêm Inventory_Quantity
            } = req.body;

        let cloudinaryResponse = null;

        if(image){
            cloudinaryResponse = await cloudinary.uploader.upload(image, {folder: "products" });
        }

        const product = await Product.create({
            brand,
            name,
            description,
            price,
            image: cloudinaryResponse?.secure_url ? cloudinaryResponse.secure_url : "",
            category,
            specific_category,
            manufacturing_country,
            requirePrescription,
            subject,
            Inventory_Quantity // ✅✅✅✅ Thêm Inventory_Quantity
        });

        res.status(201).json(product);


    }catch (error){
        console.log("Error in createProduct controller", error.message);
        res.status(500).json({message: error.message});
    }
};

export const deleteProduct = async (req, res) => {
    try{
        const product = await Product.findById(req.params.id);

        if(!product){
            res.status(404).json({message: "Product not found"});
        }

        	if (product.image) {
			const publicId = product.image.split("/").pop().split(".")[0];
			try {
				await cloudinary.uploader.destroy(`products/${publicId}`);
				console.log("deleted image from cloduinary");
			} catch (error) {
				console.log("error deleting image from cloduinary", error);
			}
		}

        await Product.findByIdAndDelete(req.params.id);
        res.json({message: "Product deleted successfully"});



    }catch(error) {
        console.log("Error in deleteProduct controller", error.message);
        res.status(500).json({message: error.message});
    }
}

export const getRecommendedProducts = async (req,res) => {
    try{

        const products = await Product.aggregate([
            {
                $sample: {size: 4},
            },
            {
                $project:{
                    _id: 1,
                    name: 1,
                    description:1,
                    image: 1,
                    price:1,
                    Inventory_Quantity: 1, // NEW CODE ✅✅✅ INCLUDE THIS FIELD
                    requirePrescription: 1 // NEW CODE ✅✅✅ Optional: also needed for ProductCard logic
                }
            }
        ])

        res.json(products);

    }catch(err){
        console.log("Error in getRecommendedProducts controller", error.message); 
        res.status(500).json({message: error.message});
    }
}

export const getProductsByCategory = async (req, res) => {
    try{
        const {category} = req.params;
        const products = await Product.find({category});

        res.json({products});

    } catch (error) {
        console.log("Error in getProductsByCategory controller", error.message);
        res.status(500).json({message: error.message});
    }
}

export const get_Products_By_Specific_Category = async (req, res) => {
    try{
        const {specific_category} = req.params;
        const products = await Product.find({specific_category});
        res.json({products});

    } catch(error) {
        console.log("Error in get_Products_By_Specific_Category controller", error.message);
        res.status(500).json({message: error.message});
    }
} 

export const toggleFeaturedProduct = async (req,res) => {
	try {
		const product = await Product.findById(req.params.id);
		if (product) {
			product.isFeatured = !product.isFeatured;
			const updatedProduct = await product.save();
			await updateFeaturedProductsCache();
			res.json(updatedProduct);
		} else {
			res.status(404).json({ message: "Product not found" });
		}

    } catch(error) {
        console.log("Error in toggleFeaturedProduct controller", error.message);
        res.status(500).json({message: error.message});
    }
}

async function updateFeaturedProductsCache() {
	try {
		// The lean() method  is used to return plain JavaScript objects instead of full Mongoose documents. This can significantly improve performance

		const featuredProducts = await Product.find({ isFeatured: true }).lean();
		await redis.set("featured_products", JSON.stringify(featuredProducts));
	} catch (error) {
		console.log("error in update cache function");
	}
}

// ✅✅✅✅ NEW CODE FOR UPDATE INVENTORY QUANTITIES
export const updateInventoryQuantities = async (req, res) => {
  try {
    const { cartItems } = req.body;

    for (const item of cartItems) {
      await Product.findByIdAndUpdate(item.productId, {
        $inc: { Inventory_Quantity: -item.quantity }
      });
    }

    res.status(200).json({ message: "Inventory updated" });
  } catch (err) {
    console.error("Error updating inventory:", err.message);
    res.status(500).json({ message: "Failed to update inventory" });
  }
};
