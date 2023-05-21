
module.exports.start = () => {
    const app = require('./express')();

    app.listen(app.get('port'), () => {
        console.log('Running on the port 5000');
    });
}
