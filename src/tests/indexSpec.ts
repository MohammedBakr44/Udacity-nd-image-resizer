import supertest from 'supertest';
import app from '../main';
import resize from '../util/resize';
import path from 'path';
import fs from 'fs';

const request = supertest(app);
const testImagePath = path.resolve('assets');
const testFile = 'fjord';
const testWidth = 200;
const testHeight = 400;
const testResizedPath = path.resolve('assets', 'resized');
const testResizedImage = `${testResizedPath}/${testFile}_${testWidth}_${testHeight}.jpg`;

it('GET /', async () => {
    const response = await request.get('/');
    expect(response.status).toEqual(200);
});

it('GET /api', async () => {
    const response = await request.get('/api');
    expect(response.status).toEqual(200);
});

describe('Image endpoints', () => {
    it('returns an image', async () => {
        const response = await request.get(
            `/api/resize/?file=${testFile}&width=${testWidth}&height=${testHeight}`
        );
        expect(response.status).toEqual(200);
    });
});

describe('File not found', () => {
    it('returns 400', async () => {
        const response = await request.get(
            `/api/resize/?file=test&width=${testWidth}&height=${testHeight}`
        );
        expect(response.status).toEqual(400);
    });
});

describe('Invalid width(NaN)', () => {
    it('returns 400 and Invalid width', async () => {
        return await request
            .get(`/api/resize/?file=fjord&width=n&height=${testHeight}`)
            .expect(400);
    });
});

describe('Invalid width(negative number)', () => {
    it('returns 400 and Invalid width', async () => {
        return await request
            .get(`/api/resize/?file=fjord&width=-1&height=${testHeight}`)
            .expect(400);
    });
});

describe('Invalid height(NaN)', () => {
    it('returns 400 and Invalid height', async () => {
        return await request
            .get(`/api/resize/?file=fjord&width=${testWidth}&height=t`)
            .expect(400);
    });
});

describe('Invalid height(negative number)', () => {
    it('returns 400 and Invalid height', async () => {
        return await request
            .get(`/api/resize/?file=fjord&width=${testWidth}&height=-1`)
            .expect(400);
    });
});

describe('Resize success', () => {
    it('returns a resized image', () => {
        expect(async () => {
            await resize(
                testImagePath,
                testFile,
                testWidth,
                testHeight,
                testResizedImage
            );
        }).not.toThrow();
    });

    afterAll(async () => {
        await fs.rm(testResizedImage, { recursive: true }, err => {
            console.log(err);
            return;
        });
    });
});
