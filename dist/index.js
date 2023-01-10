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
const getBooksList_1 = require("./service/v1/books/getBooksList");
const getMagazinesList_1 = require("./service/v1/magazines/getMagazinesList");
const dayjs_1 = __importDefault(require("dayjs"));
const getAuthorsList_1 = require("./service/v1/authors/getAuthorsList");
const addNewMagazine_1 = require("./service/v1/magazines/addNewMagazine");
const addNewBook_1 = require("./service/v1/books/addNewBook");
const app = (0, express_1.default)();
const port = 3000;
// CORS, JSON and URL Encoded Middlewares
const cors_1 = __importDefault(require("cors"));
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.static("assets"));
// Setup for rendering view engine with pug
app.set("view engine", "pug");
app.set("views", path_1.default.join(__dirname, "assets"));
app.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { search, tab = "books" } = req.query;
    const books = yield (0, getBooksList_1.getBooksList)(tab == "books" ? search : "");
    const magazines = yield (0, getMagazinesList_1.getMagazinesList)(tab == "magazines" ? search : "");
    const authorsHashMap = yield (0, getAuthorsList_1.getAuthorsList)(); // To display authors for new book/magazine
    res.render("homePage", {
        books,
        magazines,
        dayjs: dayjs_1.default,
        searchData: search,
        activeTab: tab,
        authorsList: Array.from(authorsHashMap.values()),
        filter: (query = "", activeTab = "books") => {
            window.history.replaceState("", "", `?tab=${activeTab}&search=${query}`);
            window.location.reload();
        },
    });
}));
// API to add new book to CSV file
app.post("/book", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Add Book incoming body :>> ", req.body);
    const { title, isbn, authors, description } = req.body;
    yield (0, addNewBook_1.addNewBook)({
        title,
        isbn,
        authors: Array.isArray(authors) ? authors : [authors],
        description,
    });
    res.end();
}));
// API to add new magazine to CSV file
app.post("/magazine", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Add Magazine incoming body :>> ", req.body);
    const { title, isbn, authors, publishedAt } = req.body;
    yield (0, addNewMagazine_1.addNewMagazine)({
        title,
        isbn,
        authors: Array.isArray(authors) ? authors : [authors],
        publishedAt,
    });
    res.end();
}));
app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
exports.default = app;
