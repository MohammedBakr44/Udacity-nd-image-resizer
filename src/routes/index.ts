import express from 'express';
import image from './api/image';

const routes = express.Router();
routes.get("/", (request: express.Request, response: express.Response) => {
    response.status(200).send("Main API");
})

routes.use("/resize", image);

export default routes;