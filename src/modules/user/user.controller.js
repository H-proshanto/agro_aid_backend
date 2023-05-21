const jwt = require('jsonwebtoken');
const User = require('./user.model');
const { sendEmail } = require('../../config/lib/email-service/email.service');

const createUser = async (req, res) => {
    try {
        const { firstName, lastName, dob, gender, address, email, password, confirmPassword } = req.body;

        if (password !== confirmPassword) return res.status(400).send("Passwords do not match");

        const existUser = await User.findOne({ where: { email }, });

        if (existUser) return res.status(400).send('A user already exists with this email');

        const user = await User.create(
            {
                firstName,
                lastName,
                email,
                password,
                dob,
                gender,
                address,
            }
        );

        const options = {
            to: email,
            subject: "Greetings",
            text: "Thank you for creating an account",
            html: "<b>Thank you for creating an account</b>"
        };

        await sendEmail(options);

        const modifiedUser = { ...user.dataValues };
        delete modifiedUser.password;

        res.status(201).send(modifiedUser);
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal server error");
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne(
            {
                where: { email }
            }
        )
        console.log(user);
        if (!user || !user.password || !user.validatePassword(password))
            return res.status(401).send('Invalid credentials');

        const payload = {
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            dob: user.dob,
            gender: user.gender,
            address: user.address,
            profileImage: user.profileImage,
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h", issuer: user.email });
        payload.token = token;

        res.cookie("access_token", token, {
            httpOnly: true,
            signed: true
        });

        res.status(200).send(payload);
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal server error");
    }
}

const logout = (req, res) => {
    try {
        res.clearCookie("access_token");

        res.status(200).send("Logout successful");
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal server error");
    }
}

const getUsers = async (req, res) => {
    try {
        const users = await User.findAll({
            attributes: { exclude: "password" },
        });

        res.status(200).send(users);
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal server error");
    }
}

const getUser = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findOne({
            where: { id },
            attributes: { exclude: "password" }
        });

        if (!user) return res.status(404).send('No such user exists');

        res.status(200).send(user);
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal server error");
    }
}

const updateUser = async (req, res) => {
    try {
        const { id } = req.user;
        const modifiedData = req.body;
        delete modifiedData.id;

        await User.update(
            {
                ...modifiedData,
            },
            {
                where: { id },
            }
        );
        const modifiedUser = { ...req.user.dataValues, ...modifiedData };
        delete modifiedUser.password;

        res.status(200).send(modifiedUser);
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal server error");
    }
}

const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        User.destroy({
            where: { id },
        });

        res.status(200).send('User deleted successfully');
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal server error");
    }
}

const findUser = email => User.findOne({ where: { email } });

module.exports =
{
    createUser,
    login,
    logout,
    getUsers,
    getUser,
    updateUser,
    deleteUser,
    findUser
}
