const Product = require('./product.model');
const ProductDescription = require('./product-description.model');

const getProductList = async (req, res) => {
    try {
        const products = await Product.findAll();

        res.status(200).send(products);
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal server error");
    }
}

const getProduct = async (req, res) => {
    try {
        const { id } = req.params;

        const product = await Product.findOne({
            where: { id },
            include: [
                {
                    model: ProductDescription,
                    as: 'description',
                }
            ]
        });

        if (!product) return res.status(404).send('No such item');

        res.status(200).send(product);
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal server error");
    }
}

module.exports =
{
    getProductList,
    getProduct
}
