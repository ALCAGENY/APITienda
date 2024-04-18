import dotenv from "dotenv"

dotenv.config();

export default {
    SECRET: process.env.JWT_SECRET,
    PORT: process.env.PORT,
    MONGODB_HOST: process.env.MONGODB_HOST,
    MONGODB_DATABASE: process.env.MONGODB_DATABASE
}