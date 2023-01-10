import fs from "fs";
import path from "path";
import csvParser from "csv-parser";

export interface IAuthor {
  email: string;
  firstname: string;
  lastname: string;
}

/**
 * Function to read content of authors.csv file
 * @returns HashMap<email, data> of authors to aggregate details to books/magazines
 */
export const getAuthorsList = () =>
  new Promise<Map<string, IAuthor>>((resolve, reject) => {
    const results: Map<string, IAuthor> = new Map();

    fs.createReadStream(path.join(__dirname, "/../../../assets/authors.csv"))
      .pipe(csvParser({ separator: ";" }))
      .on("data", (data) => results.set(data?.email, data))
      .on("end", () => {
        resolve(results);
      });
  });
