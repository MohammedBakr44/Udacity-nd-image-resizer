"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const image_1 = __importDefault(require("./api/image"));
const routes = express_1.default.Router();
routes.get('/', (request, response) => {
    response.status(200).send('Main API');
});
routes.use('/resize', image_1.default);
exports.default = routes;
