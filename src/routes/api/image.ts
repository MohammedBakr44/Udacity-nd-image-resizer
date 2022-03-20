
import express from 'express';
import path from 'path';
import { promises as fs } from 'fs';
import sharp from 'sharp';

const image = express.Router();

image.get('/', async (req, res) => {
    const width: number = parseInt(req.query.width as string);
    const height: number = parseInt(req.query.height as string);
    const file = req.query.file as string;
    const imagePath = path.resolve("assets")
    console.log(imagePath)
    const resizedPath = path.resolve("assets", "resized");
    const resizedImage = `${resizedPath}/${file}_${width}_${height}.jpg`;
    // * response.status(200).sendFile(`${imagePath}/${file}.jpg`);
    // * response.status(200).send(`${imagePath}/${file}_${width}_${height}`);
    // * response.status(200).send(`${imagePath}/${file}.jpg`);
    if (!width || width <= 0) {
        return res.status(400).send("Invalid width");
    } else if (!height || height <= 0) {
        return res.status(400).send("Invalid height");
    } else if (!file) {
        return res.status(400).send("file mustn't be empty");
    } else if (!(`${file}.jpg` in (await fs.readdir(`${imagePath}`)))) {
        return res.status(400).send("File does not exist");
    }

    if (!(`${file}_${width}_${height}.jpg` in (await fs.readdir(resizedPath)))) {
        await resize(imagePath, file, width, height, resizedImage)
    }

    res.status(200).sendFile(resizedImage);
})

async function resize(imagePath: string, file: string, width: number, height: number, resizedImage: string): Promise<void> {
    await sharp(`${imagePath}/${file}.jpg`)
        .resize(width, height)
        .toFile(resizedImage)
    // .then(data => { res.status(200).sendFile(data.toString()) })
}

export default image;
