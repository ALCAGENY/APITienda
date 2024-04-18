import Products from "../models/Products";
import Sales from "../models/sales";

export async function decreaseProductQuantities(idProducts) {
    try {
        for (const product of idProducts) {
            const dbProduct = await Products.findById(product.idProduct);
            
            if (!dbProduct) {
                throw new Error(`Producto con ID ${product.idProduct} no encontrado`);
            }

            dbProduct.amount -= product.amount;
            await dbProduct.save();
        }

        await generateSales(idProducts);
        return { success: true, message: "Documentos creados exitosamente" };
    } catch (error) {
        throw new Error(`Error al decrementar los productos: ${error.message}`);
    }
}

async function generateSales(data) {
    try {
        await Sales.insertMany(data);
    } catch (error) {
        throw new Error(`Error al crear los documentos del reporte: ${error.message}`);
    }
}

