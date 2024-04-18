import Jwt, { decode } from "jsonwebtoken";
import config from "../config";
import User from "../models/User";
import Role from "../models/Role";

export const verifyToken = async (req, res, next) => {
    const token = req.headers["x-access-token"];
   

    if (!token) return res.status(403).json({ message: "No token provided" });

    try {
        const decodedToken = Jwt.verify(token, config.SECRET);
        req.userId = decodedToken.id;

        const user = await User.findById(req.userId, { password: 0 });

        if (!user) return res.status(404).json({ message: "No user found" });

        next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid token" });
    }
};


export const isAdmin = async (req, res, next) => {

    const user = await User.findById(req.userId);
    const role = await Role.find({ _id: { $in: user.roles } })

    for (let i = 0; i < role.length; i++) {
        if (role[i].name === "Admin") {
            next()
            return
        }
    }

    return res.status(403).json({ message: "Permission denied. Only administrators have access." })

}