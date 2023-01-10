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
exports.getBooksList = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const csv_parser_1 = __importDefault(require("csv-parser"));
const getAuthorsList_1 = require("../authors/getAuthorsList");
/**
 * Function to read content of books.csv file
 * @param query search bar input to filter books by title/author
 * @returns list of sorted and filtered books present in CSV file
 */
const getBooksList = (query) => new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
    const results = [];
    const authorsMap = yield (0, getAuthorsList_1.getAuthorsList)();
    fs_1.default.createReadStream(path_1.default.join(__dirname, "/../../../assets/books.csv"))
        .pipe((0, csv_parser_1.default)({ separator: ";" }))
        .on("data", (data) => {
        const authors = data.authors.split(",").map((email) => authorsMap.get(email) || {
            email: "",
            firstname: "",
            lastname: "",
        });
        results.push(Object.assign(Object.assign({}, data), { authors }));
    })
        .on("end", () => {
        let filteredResults = query
            ? results === null || results === void 0 ? void 0 : results.filter((book) => {
                var _a, _b;
                return ((_a = book.title) === null || _a === void 0 ? void 0 : _a.includes(query)) ||
                    ((_b = book.authors) === null || _b === void 0 ? void 0 : _b.findIndex((author) => { var _a; return (_a = author.email) === null || _a === void 0 ? void 0 : _a.includes(query); })) > -1;
            })
            : results; // Filtering title and authors on input query
        filteredResults = filteredResults.sort((a, b) => a.title < b.title ? -1 : 1); // Sorting data by title
        resolve(filteredResults);
    });
}));
exports.getBooksList = getBooksList;
