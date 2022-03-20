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
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const fs_1 = require("fs");
const sharp_1 = __importDefault(require("sharp"));
const image = express_1.default.Router();
image.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const width = parseInt(req.query.width);
    const height = parseInt(req.query.height);
    const file = req.query.file;
    const imagePath = path_1.default.resolve("assets");
    const resizedPath = path_1.default.resolve("assets", "resized");
    const resizedImage = `${resizedPath}/${file}_${width}_${height}.jpg`;
    // * response.status(200).sendFile(`${imagePath}/${file}.jpg`);
    // * response.status(200).send(`${imagePath}/${file}_${width}_${height}`);
    // * response.status(200).send(`${imagePath}/${file}.jpg`);
    if (!width || width <= 0) {
        return res.status(400).send("Invalid width");
    }
    else if (!height || height <= 0) {
        return res.status(400).send("Invalid height");
    }
    else if (!file) {
        return res.status(400).send("file mustn't be empty");
    }
    else if (!(`${file}.jpg` in (yield fs_1.promises.readdir(`${imagePath}`)))) {
        return res.status(400).send("File does not exist");
    }
    if (!(`${file}_${width}_${height}.jpg` in (yield fs_1.promises.readdir(resizedPath)))) {
        yield resize(imagePath, file, width, height, resizedImage);
    }
    res.status(200).sendFile(resizedImage);
}));
function resize(imagePath, file, width, height, resizedImage) {
    return __awaiter(this, void 0, void 0, function* () {
        yield (0, sharp_1.default)(`${imagePath}/${file}.jpg`)
            .resize(width, height)
            .toFile(resizedImage);
    });
}
exports.default = image;
