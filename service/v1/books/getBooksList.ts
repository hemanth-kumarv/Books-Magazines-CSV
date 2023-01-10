import fs from "fs";
import path from "path";
import csvParser from "csv-parser";
import { getAuthorsList, IAuthor } from "../authors/getAuthorsList";

interface IBook {
  title: string;
  isbn: string;
  authors: IAuthor[];
  description: string;
}

/**
 * Function to read content of books.csv file
 * @param query search bar input to filter books by title/author
 * @returns list of sorted and filtered books present in CSV file
 */
export const getBooksList = (query: string) =>
  new Promise<IBook[]>(async (resolve, reject) => {
    const results: IBook[] = [];

    const authorsMap = await getAuthorsList();
    fs.createReadStream(path.join(__dirname, "/../../../assets/books.csv"))
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
              (book) =>
                book.title?.includes(query) ||
                book.authors?.findIndex((author) =>
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
