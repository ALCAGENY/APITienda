import Orders from "../models/Orders";

import { checkProductsAvailability } from "../libs/checkProductsAvailability";
import { decreaseProductQuantities } from "../libs/decreaseProduct";

export const createOrders = async (req, res) => {

    try {
        const { buyerData, products } = req.body;

        const newOrder = new Orders({ buyerData, products });

        const ordersSave = await newOrder.save();

        return res.status(201).json({ ordersSave });

    } catch (error) {
        return res.status(500).json({ message: "Error the server" });
    }

}



export const getOrders = async (req, res) => {
    try {

        const orders = await Orders.find({ status:{$in:["En espera", "Pendiente"]} }).populate('products.idProduct');
        if (orders.length === 0) return res.status(200).json({ message: "no hay pedidos pendientes" });

        return res.status(200).json({ orders });
    } catch (error) {
        return res.status(500).json({ message: "Error server" });
    }
}




export const changeStatusOrders = async (req, res) => {
    try {
        const { id, status } = req.body;

        if (status === "Cancelado") {
            try {
                const result = await Orders.updateMany({ _id: { $in: id } }, { $set: { status: status } });

                if (result.n === 0) {
                    return res.json({ message: "No se encontraron pedidos para actualizar" });
                } else {
                    return res.json({ message: "El estado de los pedidos ha sido actualizado correctamente" });
                }
            } catch (error) {
                return res.status(500).json({ message: "Ocurrió un error al intentar actualizar los pedidos", error: error.message });
            }
        } else {
            // Verificar disponibilidad de productos en los pedidos
            const { completeOrders, waitOrders, errorsSearchId, idProducts } = await checkProductsAvailability(id);

            if (errorsSearchId.length>0) return res.status(400).json({errorsSearchId});
            //Actualizar estados de los pedidos
            await Orders.updateMany({ _id: { $in: completeOrders } }, { $set: { status: "Completado" } });
            await Orders.updateMany({ _id: { $in: waitOrders } }, { $set: { status: "En espera" } });

            // descontar los productos adquiridos: 
            await decreaseProductQuantities(idProducts);

            return res.status(201).json({ completeOrders, waitOrders});
        }



    } catch (error) {
        return res.status(500).json({ message: "Error en el servidor", error: error.message });
    }
}


