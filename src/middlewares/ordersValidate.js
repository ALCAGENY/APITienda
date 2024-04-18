import mongoose from "mongoose";

export const verifyFields = async (req, res, next) => {
    try {
        
        const { name, email, phone } = req.body.buyerData;

        if (!name || !email || !phone) {
            return res.status(400).json({ message: "Error, the buyer's data is incomplete" });
        }

        const validateProducts = verifyFieldsProducts(req.body.products);

        if (Object.keys(validateProducts).length > 0) {
            return res.status(400).json({ message: "Error in products", errors: validateProducts });
        }
        
        next();
        
    } catch (error) {
        return res.status(500).json({ message: "server error" });
    }
};

function verifyFieldsProducts(products) {
    const requiredFields = ['idProduct', 'quantity', 'total_price'];
    const errorsMessage = {};

    if (!products || !products.length) {
        return { message: "There are no products" };
    }

    for (let i = 0; i < products.length; i++) {
        const productErrors = {};

        for (const field of requiredFields) {
            if (!products[i][field]) {
                productErrors[field] = `The ${field} is required`;
            }
        }
        console.log(products[i].idProduct);
        // Validar la existencia y el formato del ID del producto utilizando isValidObjectId
        if (!mongoose.Types.ObjectId.isValid(`${products[i].idProduct}`)) {
            productErrors['idProduct'] = 'Invalid product ID';
        }

        if (Object.keys(productErrors).length > 0) {
            errorsMessage[`Product ${i + 1}`] = productErrors;
        }
    }

    return errorsMessage;
}


export const verifyStatusAndIds = async (req, res, next) => {
    const { status, id } = req.body;

    try {
        if (!status && !id) {
            return res.status(400).json({ message: "Both 'id' and 'status' fields are required" });
        }
        if (!status) {
            return res.status(400).json({ message: "Status field is required" });
        }
        if (!id || id.length === 0) {
            return res.status(400).json({ message: "The id is required" });
        }
        
        next(); 
    } catch (error) {
        res.status(500).json({ message: "Error during server-side validation" });
    }
}
