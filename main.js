const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const rateLimit = require('express-rate-limit');
const { connect } = require('./src/db/mongo');
const errorMiddleware = require('./src/middlewares/error');
const authRoutes = require('./src/modules/auth');
const userRoutes = require('./src/modules/user');
const config = require('./src/config');

async function start() {
    await connect();

    const app = express();

    app.use(helmet());
    app.use(bodyParser.json());

    app.use(
        rateLimit({
            windowMs: 1 * 60 * 1000,
            max: 100
        })
    );

    app.use('/auth', authRoutes);
    app.use('/users', userRoutes);

    app.use(errorMiddleware);

    app.listen(config.port, () => {
        console.log(`Server running on port ${config.port}`);
    });
}

start();
