import fs from "fs";
import path from "path";

interface IAddNewMagazine {
  title: string;
  isbn: string;
  authors: string[];
  publishedAt: string;
}

/**
 * Function to add magazine to CSV file
 * @param magazine data to add to magazines.csv file
 * @returns latest added row in csv file
 */
export const addNewMagazine = ({
  title,
  isbn,
  authors,
  publishedAt,
}: IAddNewMagazine) =>
  new Promise<void>((resolve, reject) => {
    const dataToWrite =
      [title, isbn, authors.join(","), publishedAt].join(";") + "\n"; // Separating fields with semicolon and adding new line

    const filePath = path.join(__dirname, "/../../../assets/magazines.csv");
    fs.writeFile(filePath, dataToWrite, { flag: "a" }, (err) => {
      if (err) {
        console.log(
          "Some error occurred - file either not saved or corrupted file saved.",
          err
        );
      } else {
        console.log("New Magazine saved!\n", dataToWrite);
        resolve();
      }
    });
  });
