import Sales from "../models/sales";

export const getReports = async (req, res) => {
    try {
        const { startDate, endDate } = req.body;

        const sales = await Sales.find({
            date: { $gte: new Date(startDate), $lte: new Date(endDate) }
        }).populate("idProduct");


        if (!sales || sales.length === 0) 
            return res.status(200).json({ message: `No hay reportes del ${startDate} al ${endDate}` });

        const productSummary = [];

        sales.forEach(sale => {
            const { idProduct, amount, total } = sale;
            const { typeProduct } = idProduct;


            const existingProduct = productSummary.find(product => product.name === typeProduct);
            if (existingProduct) {
                existingProduct.amount += amount;
                existingProduct.total += total;
            } else {
                productSummary.push({
                    name: typeProduct,
                    amount: amount,
                    total: total
                });
            }
        });

        return res.status(200).json(productSummary);

    } catch (error) {
        return res.status(500).json({ message: "Error del servidor" });
    }
}



    
