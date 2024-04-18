import { Schema, model } from "mongoose";
import bcryptjs from "bcryptjs";

const userSchema = new Schema ({
    username: {
        type: String,
        required: true 
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    telefono: {
        type: String,
        required: true
    },
    img:{
        type: String,
        required: true
    },
    direccion: {
        type: String,
        required: true
    },
    roles: [{
        ref:"Role",
        type: Schema.Types.ObjectId
    }]
 }, {
    versionKey: false
 });

userSchema.statics.encryptPassword = async(password) => {    
    try {
        const salt = await bcryptjs.genSalt(10);
        return await bcryptjs.hash(password, salt);
    } catch (error) {
        throw new Error ('Failed to hash the password');
    }
}

userSchema.statics.comparePassword = async (password, receivedPassword) => {
    return await bcryptjs.compare(password, receivedPassword);
}

export default model ("User", userSchema);
