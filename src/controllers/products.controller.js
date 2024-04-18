import Products from "../models/Products";
import mongoose from "mongoose";

export const createProduct = async (req, res) => {
    try {
        const { name, description, img1, img2, img3, img4, color, descripcion, precio, categoria, tamaño, temporada, genero, price, amount, typeProduct, content, imgUrl } = req.body;
        const newProduct = new Products({ name, description, img1, img2, img3, img4, color, descripcion, precio, categoria, tamaño, temporada, genero, price, amount, typeProduct, content, imgUrl });
        const productSave = await newProduct.save();
        return res.status(201).json(productSave);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error saving product" });
    }
}

export const getProducts = async (req, res) => {
    try {
        const products = await Products.find();
        return res.status(200).json(products);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error" });
    }
}

export const getProductById = async (req, res) => {
    try {
        const productId = req.params.productId;
        const isValidObjectId = mongoose.Types.ObjectId.isValid(productId);
        
        if (!isValidObjectId) {
            return res.status(400).json({ message: "Invalid product ID" });
        }

        const product = await Products.findById(productId);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        return res.status(200).json(product);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const updateProductById = async (req, res) => {
    try {
        const productId = req.params.productId;
        const isValidObjectId = mongoose.Types.ObjectId.isValid(productId);
        
        if (!isValidObjectId) {
            return res.status(400).json({ message: "Invalid product ID" });
        }

        const updatedProduct = await Products.findByIdAndUpdate(productId, req.body, { new: true });

        if (!updatedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }

        return res.status(200).json(updatedProduct);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error" });
    }
}

export const deleteProductById = async (req, res) => {
    try {
        const productId = req.params.productId;
        const isValidObjectId = mongoose.Types.ObjectId.isValid(productId);
        
        if (!isValidObjectId) {
            return res.status(400).json({ message: "Invalid product ID" });
        }

        await Products.findByIdAndDelete(productId);
        return res.status(204).send();
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error" });
    }
}

export const patchAmountProduct = async (req, res) => {
    try {
        const productId = req.params.productId;
        const isValidObjectId = mongoose.Types.ObjectId.isValid(productId);
        
        if (!isValidObjectId) {
            return res.status(400).json({ message: "Invalid product ID" });
        }

        const { amount } = req.body;

        if (!amount) {
            return res.status(400).json({ message: "Amount is required" });
        }
        if (amount <= 0) {
            return res.status(400).json({ message: "Only positive quantities are allowed" });
        }

        const product = await Products.findById(productId);
        
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        
        product.amount += amount;
        await product.save();

        return res.status(200).json({ message: "Product quantity updated successfully", product });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error" });
    }
}
