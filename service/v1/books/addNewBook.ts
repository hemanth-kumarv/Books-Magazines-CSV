import fs from "fs";
import path from "path";

interface IAddNewBook {
  title: string;
  isbn: string;
  authors: string[];
  description: string;
}

/**
 * Function to add book to CSV file
 * @param book data to add to books.csv file
 * @returns latest added row in csv file
 */
export const addNewBook = ({
  title,
  isbn,
  authors,
  description,
}: IAddNewBook) =>
  new Promise<void>((resolve, reject) => {
    const dataToWrite =
      [title, isbn, authors.join(","), description].join(";") + "\n"; // Separating fields with semicolon and adding new line

    const filePath = path.join(__dirname, "/../../../assets/books.csv");
    fs.writeFile(filePath, dataToWrite, { flag: "a" }, (err) => {
      if (err) {
        console.log(
          "Some error occurred - file either not saved or corrupted file saved.",
          err
        );
      } else {
        console.log("New book saved!\n", dataToWrite);
        resolve();
      }
    });
  });
