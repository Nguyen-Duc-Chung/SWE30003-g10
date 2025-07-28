import jwt from "jsonwebtoken";
import User from "../models/user.model.js";


export const protectRoute = async ( req , res , next) => {
    try {

        const accessToken = req.cookies.accessToken;

        if(!accessToken){
            return  res.status(401).json({message: "Unauthorized - no access token provided"})
        }

        try {
            const decoded = jwt.verify( accessToken , "accessTokenKey" );
            const user = await User.findById(decoded.userID).select("-password");
            
            if(!user){
                return res.status(401).json({ message: "User not found" });
            }

            req.user = user;

            next();

        } catch (error) {
            	if (error.name === "TokenExpiredError") {
				return res.status(401).json({ message: "Unauthorized - Access token expired" });
			}
			throw error;

        }

    } catch (error) {
        console.log("Error in protectRoute middleware", error.message);
        res.status(401).json({message: "Unauthorized - invalid access token"});

    }
}

export const adminRoute = (req, res, next) => {
    if(req.user && ( req.user.role === "Admin" || 
                     req.user.role === "Pharmacists" || 
                     req.user.role === "Product_Manager" ||
                     req.user.role === "Cashiers" )){
        next();
    } else {
        res.status(403).json({message: "Access denied - Admin and Staff only" });
    }
}