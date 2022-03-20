import express, { request, response } from 'express';
import path from 'path';
import fs from 'fs';
import sharp from 'sharp';

const image = express.Router();

image.get('/', async (request, response) => {
    const width: number = parseInt(request.query.width! as string);
    const height: number = parseInt(request.query.height! as string);
    const file = request.query.file! as string;
    const imagePath = path.resolve(__dirname, "../../", "assets");
    const resizedPath = path.resolve(__dirname, "../../", "assets", "resized");
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
    } else if (!(fs.existsSync(`${imagePath}/${file}.jpg`)) &&
        !(fs.existsSync(`${resizedPath}/${file}_${width}_${height}.jpg`))) {
        return response.status(400).send("File does not exist");
    }
    // ? path.resolve(__dirname, "assets")
    if (fs.existsSync(resizedImage)) {
        return response.status(200).sendFile(resizedImage);
    } else {
        sharp(`${imagePath}/${file}.jpg`)
            .resize({ width, height })
            .toFile(resizedImage)
            .then(data => { response.status(200).sendFile(data.toString()) })
    }
})

export default image;