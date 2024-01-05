import * as dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import * as bodyParser from 'body-parser';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { userRouter } from './controller/user.router';
import { deviceRouter } from './controller/device.router';
import { deviceTypeRouter } from './controller/deviceType.router';
import { issueRouter } from './controller/issue.router';
import { questionRouter } from './controller/question.router';

import { expressjwt } from 'express-jwt';

import { problemRouter } from './controller/problem.router';

const app = express();
dotenv.config();
const port = process.env.APP_PORT || 3000;

const swaggerOpts = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API (needs a good name, but my brain not braining)',
            version: '1.0.0',
        },
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
        security: [
            {
                bearerAuth: [],
            },
        ],
    },
    apis: ['./controller/*.router.ts'],
};

const swaggerSpec = swaggerJSDoc(swaggerOpts);
const jwtSecret = process.env.JWT_SECRET;

app.use(
    expressjwt({ secret: jwtSecret, algorithms: ['HS256'] }).unless({
        path: [
            // public routes that don't require authentication
            /^\/api-docs\.*/,
            '/users/login',
            '/users/signup',
            '/users',
        ],
    })
);
app.use(cors());
app.use(bodyParser.json());

app.get('/status', (req, res) => {
    res.json({ message: 'Back-end is running...' });
});

app.use('/users', userRouter);
app.use('/devices', deviceRouter);
app.use('/deviceTypes', deviceTypeRouter);
app.use('/problems', problemRouter);
app.use('/issues', issueRouter);
app.use('/questions', questionRouter);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(port || 3001, () => {
    console.log(`Back-end is running on port ${port}.`);
});
app.use((error, req, res, next) => {
    if (error.name === 'UnauthorizedError') {
        res.status(401).json({ status: 'unauthorized', errorMessage: error.message });
    } else if (error.name === 'Error') {
        res.status(400).json({ status: 'error', errorMessage: error.message });
    } else {
        next();
    }
});
