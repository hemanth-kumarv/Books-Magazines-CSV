"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addNewBook = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
/**
 * Function to add book to CSV file
 * @param book data to add to books.csv file
 * @returns latest added row in csv file
 */
const addNewBook = ({ title, isbn, authors, description, }) => new Promise((resolve, reject) => {
    const dataToWrite = [title, isbn, authors.join(","), description].join(";") + "\n"; // Separating fields with semicolon and adding new line
    const filePath = path_1.default.join(__dirname, "/../../../assets/books.csv");
    fs_1.default.writeFile(filePath, dataToWrite, { flag: "a" }, (err) => {
        if (err) {
            console.log("Some error occurred - file either not saved or corrupted file saved.", err);
        }
        else {
            console.log("New book saved!\n", dataToWrite);
            resolve();
        }
    });
});
exports.addNewBook = addNewBook;
