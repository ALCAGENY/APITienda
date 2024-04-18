import Orders from "../models/Orders";


export async function checkProductsAvailability(id) {
    const errorsSearchId = [];
    const completeOrders = [];
    const waitOrders = [];
    const idProducts = [];

    for (const idPedido of id) {
        try {
            const pedido = await Orders.findOne({ _id: idPedido }, { buyerData: 0, _id: 0, status: 0, date: 0 })
                .populate('products.idProduct', 'amount').lean();
                console.log(pedido.products);
            if (!pedido) {
                errorsSearchId.push(`Pedido con ID ${idPedido} no encontrado`);
                continue;
            }

            let allProductsAvailable = true;

            for (const product of pedido.products) {
                if (product.quantity > product.idProduct.amount) {
                    allProductsAvailable = false;
                    break;
                } 
            }

            if (allProductsAvailable) {
                //sacar las id de los productos
                for (let j = 0; j < pedido.products.length; j++) {
                    idProducts.push({idProduct: pedido.products[j].idProduct._id, 
                                    amount: pedido.products[j].quantity,
                                    total: pedido.products[j].total_price});     
                }
                
                completeOrders.push(idPedido);
            
                
            } else {
               waitOrders.push(idPedido);
            }

        } catch (error) {
            console.error(`Error al procesar el pedido ${idPedido}:`, error);
            errorsSearchId.push(`Error al procesar el pedido ${idPedido}`);
        }
    }

    return { completeOrders, waitOrders, errorsSearchId, idProducts};
}
