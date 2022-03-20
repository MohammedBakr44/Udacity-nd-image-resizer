"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const main_1 = __importDefault(require("../main"));
const request = (0, supertest_1.default)(main_1.default);
it('GET /', () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield request.get("/");
    expect(response.status).toEqual(200);
}));
it("GET /api", () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield request.get("/api");
    expect(response.status).toEqual(200);
}));
describe("File not found", () => {
    it('returns 400', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get("/api/resize/?file=test&width=200&height=200");
        expect(response.status).toEqual(400);
    }));
});
describe("Image endpoints", () => {
    it('returns an image', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get("/api/resize/?file=fjord&width=200&height=400");
        expect(response.status).toEqual(400);
    }));
});
describe("Invalid width(NaN)", () => {
    it('returns 400 and Invalid width', () => __awaiter(void 0, void 0, void 0, function* () {
        return yield request.get("/api/resize/?file=fjord&width=n&height=200").expect(400);
    }));
});
describe("Invalid width(negative number)", () => {
    it('returns 400 and Invalid width', () => __awaiter(void 0, void 0, void 0, function* () {
        return yield request.get("/api/resize/?file=fjord&width=-1&height=200").expect(400);
    }));
});
describe("Invalid height(NaN)", () => {
    it('returns 400 and Invalid height', () => __awaiter(void 0, void 0, void 0, function* () {
        return yield request.get("/api/resize/?file=fjord&width=200&height=t").expect(400);
    }));
});
describe("Invalid height(negative number)", () => {
    it('returns 400 and Invalid height', () => __awaiter(void 0, void 0, void 0, function* () {
        return yield request.get("/api/resize/?file=fjord&width=200&height=-1").expect(400);
    }));
});
