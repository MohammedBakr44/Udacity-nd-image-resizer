import supertest from 'supertest';
import app from "../main";

const request = supertest(app);

it('GET /', async () => {

    const response = await request.get("/");
    expect(response.status).toEqual(200);
})

it("GET /api", async () => {
    return await request.get("/api").expect(200);
})

describe("File not found", () => {
    it('returns 400', async () => {
        return await request.get("/api/resize/?file=test&width=200&height=200").expect(400);
    })
})

describe("Image endpoints", () => {
    it('returns an image', async () => {
        return await request.get("/api/resize/?file=fjord&width=200&height=400").expect(200);
    })
})

describe("Invalid width(NaN)", () => {
    it('returns 400 and Invalid width', async () => {
        return await request.get("/api/resize/?file=fjord&width=n&height=200").expect(400);
    })
})


describe("Invalid width(negative number)", () => {
    it('returns 400 and Invalid width', async () => {
        return await request.get("/api/resize/?file=fjord&width=-1&height=200").expect(400);
    })
})

describe("Invalid height(NaN)", () => {
    it('returns 400 and Invalid height', async () => {
        return await request.get("/api/resize/?file=fjord&width=200&height=t").expect(400);
    })
})


describe("Invalid height(negative number)", () => {
    it('returns 400 and Invalid height', async () => {
        return await request.get("/api/resize/?file=fjord&width=200&height=-1").expect(400);
    })
})