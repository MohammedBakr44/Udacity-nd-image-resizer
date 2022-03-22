
import express, { Response } from 'express';
import path from 'path';
import { promises as fs } from 'fs';
import resize from '../../util/resize';

const image = express.Router();

image.get('/', async (request: express.Request, response: express.Response) => {
    const width: number = parseInt(request.query.width as string);
    const height: number = parseInt(request.query.height as string);
    const file = request.query.file as string;
    const imagePath = path.resolve("assets");
    const resizedPath = path.resolve("assets", "resized");
    const resizedImage = `${resizedPath}/${file}_${width}_${height}.jpg`;
    // * response.status(200).sendFile(`${imagePath}/${file}.jpg`);
    // * response.status(200).send(`${imagePath}/${file}_${width}_${height}`);
    // * response.status(200).send(`${imagePath}/${file}.jpg`);
    if (!width || width <= 0) {
        return response.status(400).send("Invalid width");
    } else if (!height || height <= 0) {
        return response.status(400).send("Invalid height");
    } else if (!file) {
        return response.status(400).send("file mustn't be empty");
    } else if (!((await fs.readdir(`${imagePath}`)).find(item => item == `${file}.jpg`))) {
        return response.status(400).send("File does not exist");
    }

    if (!(`${file}_${width}_${height}.jpg` in (await fs.readdir(resizedPath)))) {
        await resize(imagePath, file, width, height, resizedImage)
        //              
    }

    response.status(200).sendFile(resizedImage);
})

export default image;
