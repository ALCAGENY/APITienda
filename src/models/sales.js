import { Schema, model } from "mongoose";

const SalesSchema = new Schema({

    idProduct: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },

    amount: { type: Number, required: true },
    total: { type: Number, required: true },

    date: {
        type: Date,
        required: true,
        default: Date.now
    }


}, {
    versionKey: false
});


export default model("Sales", SalesSchema);
