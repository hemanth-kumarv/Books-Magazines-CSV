import express, { Express, Request, Response } from "express";
import path from "path";
import { getBooksList } from "./service/v1/books/getBooksList";
import { getMagazinesList } from "./service/v1/magazines/getMagazinesList";
import dayjs from "dayjs";
import { getAuthorsList } from "./service/v1/authors/getAuthorsList";
import { addNewMagazine } from "./service/v1/magazines/addNewMagazine";
import { addNewBook } from "./service/v1/books/addNewBook";

const app: Express = express();

const port: number = 3000;

// CORS, JSON and URL Encoded Middlewares
import cors from "cors";
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("assets"));

// Setup for rendering view engine with pug
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "assets"));

app.get("/", async (req: Request, res: Response) => {
  const { search, tab = "books" } = req.query as {
    search: string; // Query param to filter author/title
    tab: string; // Query param to display books or magazines
  };

  const books = await getBooksList(tab == "books" ? search : "");
  const magazines = await getMagazinesList(tab == "magazines" ? search : "");
  const authorsHashMap = await getAuthorsList(); // To display authors for new book/magazine

  res.render("homePage", {
    books,
    magazines,
    dayjs,
    searchData: search,
    activeTab: tab,
    authorsList: Array.from(authorsHashMap.values()), // converting authors hashmap to array
    filter: (query: string = "", activeTab: string = "books") => {
      window.history.replaceState("", "", `?tab=${activeTab}&search=${query}`);
      window.location.reload();
    },
  });
});

// API to add new book to CSV file
app.post("/book", async (req: Request, res: Response) => {
  console.log("Add Book incoming body :>> ", req.body);
  const { title, isbn, authors, description } = req.body;
  await addNewBook({
    title,
    isbn,
    authors: Array.isArray(authors) ? authors : [authors], // Handling usecase when only one author is selected
    description,
  });
  res.end();
});

// API to add new magazine to CSV file
app.post("/magazine", async (req: Request, res: Response) => {
  console.log("Add Magazine incoming body :>> ", req.body);
  const { title, isbn, authors, publishedAt } = req.body;
  await addNewMagazine({
    title,
    isbn,
    authors: Array.isArray(authors) ? authors : [authors], // Handling usecase when only one author is selected
    publishedAt,
  });
  res.end();
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

export default app;
