const Product = require('./product.model');


const getProductList = async (req, res) => {
    try {
        const products = await Product.findAll();

        res.status(200).send(products);
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

module.exports =
{
    getProductList,
}
