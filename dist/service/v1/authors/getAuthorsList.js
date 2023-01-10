"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAuthorsList = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const csv_parser_1 = __importDefault(require("csv-parser"));
/**
 * Function to read content of authors.csv file
 * @returns HashMap<email, data> of authors to aggregate details to books/magazines
 */
const getAuthorsList = () => new Promise((resolve, reject) => {
    const results = new Map();
    fs_1.default.createReadStream(path_1.default.join(__dirname, "/../../../assets/authors.csv"))
        .pipe((0, csv_parser_1.default)({ separator: ";" }))
        .on("data", (data) => results.set(data === null || data === void 0 ? void 0 : data.email, data))
        .on("end", () => {
        resolve(results);
    });
});
exports.getAuthorsList = getAuthorsList;
