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
const fs_1 = __importDefault(require("fs"));
const sharp_1 = __importDefault(require("sharp"));
const image = express_1.default.Router();
image.get('/', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const width = parseInt(request.query.width);
    const height = parseInt(request.query.height);
    const file = request.query.file;
    const imagePath = path_1.default.resolve(__dirname, "../../", "assets");
    const resizedPath = path_1.default.resolve(__dirname, "../../", "assets", "resized");
    const resizedImage = `${resizedPath}/${file}_${width}_${height}.jpg`;
    // * response.status(200).sendFile(`${imagePath}/${file}.jpg`);
    // * response.status(200).send(`${imagePath}/${file}_${width}_${height}`);
    // * response.status(200).send(`${imagePath}/${file}.jpg`);
    if (!width || width <= 0) {
        return response.status(400).send("Invalid width");
    }
    else if (!height || height <= 0) {
        return response.status(400).send("Invalid height");
    }
    else if (!file) {
        return response.status(400).send("file mustn't be empty");
    }
    else if (!(fs_1.default.existsSync(`${imagePath}/${file}.jpg`)) &&
        !(fs_1.default.existsSync(`${resizedPath}/${file}_${width}_${height}.jpg`))) {
        return response.status(400).send("File does not exist");
    }
    // ? path.resolve(__dirname, "assets")
    if (fs_1.default.existsSync(resizedImage)) {
        return response.status(200).sendFile(resizedImage);
    }
    else {
        (0, sharp_1.default)(`${imagePath}/${file}.jpg`)
            .resize({ width, height })
            .toFile(resizedImage)
            .then(data => { response.status(200).sendFile(data.toString()); });
    }
}));
exports.default = image;
