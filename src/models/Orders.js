import { Schema, model } from "mongoose";

const ordersSchema = new Schema({

    buyerData: {
        name: {type: String, required: true},
        email: {type: String, required: true},
        phone: {type: Number, required: true}

    },

    products: [
        {
            idProduct: {
                type: Schema.Types.ObjectId,
                ref: "Product",
                required: true
            },
            quantity: Number,
            total_price: Number
        }
    ],

    status: {
        type: String,
        enum: ["Pendiente", "En espera", "Completado", "Cancelado"],
        default: "Pendiente"
    
    },

    date: {
        type: String,
        required: true,
        default: () => new Date().toISOString().split('T')[0] 
    }
}, {
    versionKey: false
})


export default model("Orders", ordersSchema)