const {
    createUser,
    updateUser,
    deleteUser,
    getUsers,
    getUser,
    login,
    logout
} = require('./user.controller');
const { createUserSchema, updateUserSchema } = require('./user.schema');
const validate = require('../core/middlewares/validate');
const authStrategy = require('./user-authentication.middleware');

module.exports = (app) => {
    app.route('/users')
        .post(validate(createUserSchema), createUser)
        .get(authStrategy, getUsers)

    app.route('/users/:id')
        .get(getUser)
        .patch(authStrategy, validate(updateUserSchema), updateUser)
        .delete(authStrategy, deleteUser);

    app.route('/users/login').post(login);

    app.route('/users/logout').post(authStrategy, logout)
}
