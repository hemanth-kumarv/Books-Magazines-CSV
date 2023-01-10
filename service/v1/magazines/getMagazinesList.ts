import fs from "fs";
import path from "path";
import csvParser from "csv-parser";
import { getAuthorsList, IAuthor } from "../authors/getAuthorsList";

export interface IMagazines {
  title: string;
  isbn: string;
  authors: IAuthor[];
  publishedAt: Date;
}

/**
 * Function to read content of magazines.csv file
 * @param query search bar input to filter magazines by title/author
 * @returns list of sorted and filtered magazines present in CSV file
 */
export const getMagazinesList = (query: string) =>
  new Promise<IMagazines[]>(async (resolve, reject) => {
    const results: IMagazines[] = [];

    const authorsMap = await getAuthorsList();
    fs.createReadStream(path.join(__dirname, "/../../../assets/magazines.csv"))
      .pipe(csvParser({ separator: ";" }))
      .on("data", (data) => {
        const authors = data.authors.split(",").map(
          (email: string) =>
            authorsMap.get(email) || {
              email: "",
              firstname: "",
              lastname: "",
            }
        );
        results.push({ ...data, authors });
      })
      .on("end", () => {
        let filteredResults = query
          ? results?.filter(
              (magazine) =>
                magazine.title?.includes(query) ||
                magazine.authors?.findIndex((author) =>
                  author.email?.includes(query)
                ) > -1
            )
          : results; // Filtering title and authors on input query

        filteredResults = filteredResults.sort((a, b) =>
          a.title < b.title ? -1 : 1
        ); // Sorting data by title
        resolve(filteredResults);
      });
  });
