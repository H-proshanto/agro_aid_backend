const {
    getStoryById,
    getStories,
} = require('./product.controller');
const authStrategy = require('../user/user-authentication.middleware');

module.exports = (app) => {
    app.route('/stories')
        .get(authStrategy, getStories)

    app.route('/stories/:id')
        .get(authStrategy, getStoryById)
}
