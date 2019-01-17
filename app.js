import dotenv from 'dotenv';
import swagger from 'swagger-jsdoc';
import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import validator from 'express-validator';
import webpack from 'webpack';
import path from 'path';
import webpackMiddleware from 'webpack-dev-middleware';
import userRouter from './server/routes/userRouter';
import bookRouter from './server/routes/bookRouter';
import webpackConfig from './webpack.config';

dotenv.load();
const app = express();

const swaggerDefinition = {
  info: {
    title: 'Hello-Books Swagger API',
    version: '1.0.0',
    description: 'Documentation of Hello Books API',
  },
  host: 'localhost:8000',
  basePath: '/',
};

// options for the swagger docs
const options = {
  // import swaggerDefinitions
  swaggerDefinition,
  // path to the API docs
  apis: ['./server/routes/*.js'],
  securityDefinitions: {
    jwt: {
      type: 'apiKey',
      name: 'Authorization',
      in: 'header'
    }
  },
};

// initialize swagger-jsdoc
const swaggerSpec = swagger(options);

app.use(logger('dev'));
if (process.env.NODE_ENV !== 'production') {
  app.use(webpackMiddleware(webpack(webpackConfig)));
}
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(validator());
app.use('/api/v1/users', userRouter);
app.use('/api/v1/books', bookRouter);

app.get('/docs', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

app.get('/api', (req, res) => {
  res.header(200);
  res.send('Welcome to Hello-Books API');
});


app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './client/index.html'));
});

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`The server is listening on port ${port}`);
});
export default app;
