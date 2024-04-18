import { Schema, model } from "mongoose";

const ProductSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    img1: {
        type: String,
        required: true
    },
    img2: {
        type: String,
        required: true
    },
    img3: {
        type: String,
        required: true
    },
    img4: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    precio: {
        type: String,
        required: true
    },
    categoria: {
        type: String,
        required: true
    },
    tamaño: {
        type: String,
        required: true
    },
    temporada: {
        type: String,
        required: true
    },
    genero: {
        type: String,
        required: true
    }
}, {
    versionKey: false // sirve para que las ID no tengan "_"
});

export default model('Product', ProductSchema);
