"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addNewMagazine = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
/**
 * Function to add magazine to CSV file
 * @param magazine data to add to magazines.csv file
 * @returns latest added row in csv file
 */
const addNewMagazine = ({ title, isbn, authors, publishedAt, }) => new Promise((resolve, reject) => {
    const dataToWrite = [title, isbn, authors.join(","), publishedAt].join(";") + "\n"; // Separating fields with semicolon and adding new line
    const filePath = path_1.default.join(__dirname, "/../../../assets/magazines.csv");
    fs_1.default.writeFile(filePath, dataToWrite, { flag: "a" }, (err) => {
        if (err) {
            console.log("Some error occurred - file either not saved or corrupted file saved.", err);
        }
        else {
            console.log("New Magazine saved!\n", dataToWrite);
            resolve();
        }
    });
});
exports.addNewMagazine = addNewMagazine;
