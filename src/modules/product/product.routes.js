const {
    getProduct,
    getProductList,
} = require('./product.controller');
const authStrategy = require('../user/user-authentication.middleware');

module.exports = (app) => {
    app.route('/products')
        .get(authStrategy, getProductList)

    app.route('/products/:id')
        .get(authStrategy,getProduct)


}
