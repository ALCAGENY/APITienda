
export const verifyFields = async (req, res, next)=>{

    try {
        const {startDate, endDate} = req.body;
        if (!startDate && !endDate) return res.status(400).json({ message: "is required fields, please complete"});
        next ();

    } catch (error) {
        return res.status(500).json({message: "error the validation in the sever"});
    }

}