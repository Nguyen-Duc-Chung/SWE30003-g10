import User from "../models/user.model.js";
import { redis } from "../lib/redis.js";
import jwt from "jsonwebtoken"

const generateToken = (userID) =>{
    const accessToken = jwt.sign({userID}, "accessTokenKey", {expiresIn: "15m"});

    const refreshToken = jwt.sign({userID}, "refreshTokenkey", {expiresIn: "1d"});
    // console.log({accessToken: accessToken, refreshToken: refreshToken});
    
    return {accessToken ,refreshToken  }

    
}

const storeRefreshToken = async (userId, refreshToken) => {
    await redis.set(`refresh_Token:${userId}`, refreshToken, "Ex", 7 * 24 * 60 *60)
}

const setCookies = (res, accessToken , refreshToken) => {
    res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 15 * 60 * 1000,
    });

    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
    })
}
 
export const signup = async (req, res) =>{
    const  { email, password, name , phoneNumber } = req.body;

    try{
    const userExists = await User.findOne({ email});

    if(userExists) {
        return res.status(400).json({message: "Tài khoản Email đã tồn tại"});
    }
    
    const user = await User.create( { email, password, name , phoneNumber });

    // console.log(user._id);
    const {accessToken , refreshToken} = generateToken(user._id);

    await storeRefreshToken(user._id, refreshToken);

    setCookies(res, accessToken, refreshToken);

    res.status(200) .json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
    });

    } catch (error) {
        console.log("Error in signup controller", error.message);
        res.status(500).json({message: error.message});
    }
};

export const login = async (req, res) => {

    try{
        const { email, password } = req.body;
        const user = await User.findOne({email});
        // console.log(user);

        if(user && (await user.comparePassword(password))){
           const { accessToken , refreshToken } =  generateToken(user._id);

           await storeRefreshToken(user._id, refreshToken);

           setCookies(res, accessToken, refreshToken);

           res.json({
              _id: user._id,
              name: user.name,
              email: user.email,
              role: user.role,
           })
        } else {
            res.status(400).json({message: "Mật khẩu hoặc Email không đúng"});
        }
    } catch (err) {
        console.log("Error in login controller", err.message);
        res.status(500).json({message: err.message});

    }
}

export const logout = async (req, res) => {
    try{
         const refreshToken = req.cookies.refreshToken;
        if(refreshToken){
            const decoded = jwt.verify(refreshToken, "refreshTokenkey");
            // console.log({Decoded: decoded})
            await redis.del(`refresh_Token:${decoded.userID}`);

        }
            res.clearCookie("accessToken");
            res.clearCookie("refreshToken");
            res.json({message: "Logged out successfully"});

        // console.log("after logout",refreshToken);
    } catch (err) {
        console.log("Error in logout controller", err.message); 
        res.status(500).json({message: err.message});

    }
    
}

// Get detailed user info (excluding password)
export const getUserInfo = async (req, res) => {
	try {
		const user = await User.findById(req.user._id).select("-password");
		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}
		res.json(user);
	} catch (err) {
		console.error("Error in getUserInfo:", err.message);
		res.status(500).json({ message: "Server error" });
	}
};


export const refreshToken = async (req, res) => { 
    try{
        const refreshToken = req.cookies.refreshToken;

        if(!refreshToken){
           res.status(401).json({message:"No Refresh token provided"});
        }

        const decoded = jwt.verify(refreshToken, "refreshTokenkey");

        // console.log({Decoded: decoded});

        const storedToken = await redis.get(`refresh_Token:${decoded.userID}`);

        // console.log('Take the token in Redis:',storedToken);

        if(storedToken !== refreshToken){
            res.status(401).json({ message: "Refresh Token does not match" })
        }

        const accessToken = jwt.sign({userID: decoded.userID}, "accessTokenKey", {expiresIn: "15m"});

        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge: 15 * 60 * 1000
        });

        res.json({message: "Token refreshed successfully",
                  "New Access Token": accessToken
        });

    } catch (err) {
        console.log("Error in refreshToken controller", err.message);
        res.status(500).json({message: err.message});

    }
 }

 export const  getProfile = async (req, res) => {
    try {
        res.json(req.user);
    } catch(error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
 }