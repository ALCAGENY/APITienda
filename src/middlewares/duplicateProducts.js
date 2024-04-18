import mongoose from 'mongoose';
import Products from '../models/Products';

export const validateFields = async (req, res, next) => {
    const requiredFields = ['name', 'description', 'imgUrl', 'price', 'amount', 'typeProduct', 'content'];
    const errorsMessage = {};

    for (const field of requiredFields) {
        if (!req.body[field]) {
            errorsMessage[field] = `The ${field} is required`;
        }
    }

    if (Object.keys(errorsMessage).length > 0) {
        return res.status(400).json(errorsMessage);
    }


    next();
};


export const verifyDuplicate = async (req, res, next) => {
    try {
        const { name, description, price, amount, typeProduct, content } = req.body;

        // Buscar si existe un producto con las mismas características
        const isDuplicate = await Products.findOne({
            name: name,
            description: description,
            price: price,
            amount: amount,
            typeProduct: typeProduct,
            content: content
        });

        if (isDuplicate) {
            // Si existe un producto con las mismas características, retornar un error 409
            return res.status(409).json({ message: "Ya existe un producto con las mismas características" });
        }

        // Si no hay duplicados, continuar con la siguiente función de middleware
        next();
    } catch (error) {
        // Si ocurre algún error durante la búsqueda del producto, retornar un error 500
        return res.status(500).json({ message: "Error al buscar el producto" });
    }
};



