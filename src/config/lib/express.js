const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');
const { getGlobalConfig } = require('../index');
const cors = require('cors');

module.exports = () => {
    const app = express();
    const globalConfig = getGlobalConfig();

    const corsOptions = {
        credentials: true,
        origin: (origin, callback) => {
            return callback(null, true);

            callback(new Error("Not allowed by CORS"));
        },
    };

    app.use(cors(corsOptions));
    app.use(express.json());
    app.use(cookieParser(process.env['COOKIE_SECRET']));
    app.set('port', process.env['PORT']);

    globalConfig.routes.forEach(
        routPath => require(path.resolve(routPath))(app)
    );

    globalConfig.strategies.forEach(
        strategyPath => require(path.resolve(strategyPath))()
    );

    return app;
}
