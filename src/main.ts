import express from 'express';
import routes from './routes/index';

const app = express();
const port: number = 3000;

app.get('/', (request: express.Request, response: express.Response) => {
    response.status(200).send('Hello');
});

app.use('/api', routes);

app.listen(port, () => {
    console.log(`Server started at port: ${port}`);
});

export default app;
