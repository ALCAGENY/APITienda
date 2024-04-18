import User from "../models/User";
import Role from "../models/Role";

export const createUser = async (req, res) => {
    try {
        const { username, email, password, telefono, img, direccion } = req.body;

        const newUser = new User({
            username,
            email,
            telefono,
            img,
            direccion,
            password: await User.encryptPassword(password)
        });

        const role = await Role.findOne({ name: "Socio" });

        newUser.roles = [role._id];
        await newUser.save();

        return res.status(201).json({ message: 'User added successfully' });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error" });
    }
};

export const getUsers = async (req, res) => {
    try {
        const ROLE = await Role.findOne({ name: "Socio" });

        const usersWithRoles = await User.find({ roles: ROLE }).populate('roles');

        const formattedUsers = usersWithRoles.map(user => ({
            username: user.username,
            email: user.email,
            telefono: user.telefono,
            img: user.img,
            direccion: user.direccion,
            id: user.id,
            roles: user.roles.map(role => role.name)
        }));

        return res.status(200).json(formattedUsers);

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error fetching users" });
    }
};

export const deleteUser = async (req, res) => {
    try {
        const { userId } = req.params;

        if (!userId) return res.status(400).json({ message: "User ID is required" });

        await User.findByIdAndDelete(userId);
        return res.status(204).send();

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error deleting user" });
    }
};

export const changePassword = async (req, res) => {
    try {
        const { passwordActual, passwordNew } = req.body;
        const { userId } = req.params;

        const user = await User.findById(userId);

        if (!user) return res.status(404).json({ message: "User not found" });

        const matchPassword = await User.comparePassword(passwordActual, user.password);

        if (!matchPassword) return res.status(401).json({ message: "Invalid credentials" });

        const hashedPassword = await User.encryptPassword(passwordNew);
        const updatedUser = await User.findByIdAndUpdate(userId, { password: hashedPassword }, { new: true });

        return res.status(200).json({ message: "Password updated successfully", updatedUser });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error" });
    }
};
