import User from "../models/User"
import Role from "../models/Role";

export const checkDuplicateEmail = async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email })
    if (user) return res.json({ message: "The email already exists" });
    next()

}

export const checkDuplicatePhone = async (req, res, next) =>{
    const user = await User.findOne({telefono: req.body.telefono});
    if (user) return res.json({message: "the phone duplicate"});
    next();
}

export const validateFields = (req, res, next) => {
    const { username, email, password, telefono, img } = req.body;
    const errorsMessage = {};

    if (!username && !email && !password &&  !img && !telefono) {
        return res.status(400).json({
            message: "Please provide all required data"
        });
    }

    if (!username) errorsMessage.username = "Username is required";
    if (!password) errorsMessage.password = "Password is required";
    if (!email) errorsMessage.email = "Email is required";
    if (!telefono) errorsMessage.telefono = "The number phone is required";
    if (!img) errorsMessage.img = "The img is required";

    if (Object.keys(errorsMessage).length > 0) {
        return res.status(400).json(errorsMessage);
    }

    next();
};


export const validateFieldsLogin = (req, res, next) => {
    const { username, email, password} = req.body;
    const errorsMessage = {};

    if (!username && !email && !password &&  !img && !telefono) {
        return res.status(400).json({
            message: "Please provide all required data"
        });
    }

    if (!username) errorsMessage.username = "Username is required";
    if (!password) errorsMessage.password = "Password is required";
    if (!email) errorsMessage.email = "Email is required";

    if (Object.keys(errorsMessage).length > 0) {
        return res.status(400).json(errorsMessage);
    }

    next();
};

export const verifyExistedRole = async (req, res, next) => {
    try {
        if (req.body.roles) {
            const ROLES = await Role.find();

            for (let i = 0; i < req.body.roles.length; i++) {
                const roleExists = ROLES.some(role => role.name === req.body.roles[i]);

                if (!roleExists) {
                    return res.status(400).json({
                        message: `Role ${req.body.roles[i]} does not exist`
                    });
                }
            }
        }

        next();
    } catch (error) {
        return res.status(500).json({
            message: 'Server error'
        });
    }
};



