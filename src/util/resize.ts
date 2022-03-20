import sharp from 'sharp';

async function resize(imagePath: string, file: string, width: number, height: number, resizedImage: string): Promise<void> {
    await sharp(`${imagePath}/${file}.jpg`)
        .resize(width, height)
        .toFile(resizedImage)
}

export default resize;