# Books-Magazines from CSV

A webapp rendered on ExpressJS (written in Typescript) through view engines with Pug, to read the contents of Books and Magazines from CSV files (read using [csv-parser](https://www.npmjs.com/package/csv-parser)), and to aggregate details of authors (stored in another CSV file) by their email id. New Books and Magazines may be added to the CSV file too!

You also may filter the books/magazines by the title, or by author's email ID. At any time, you also can download the CSV file by clicking the download icon.

## Features

- Bootstrap Design (Navs and Containers)
- Read data from CSV file (stored on the server)
- Search bar filter on Title and Author's email
- Download CSV
- Add data directly to the CSV

## Demo

Here is a working live demo : https://github.com/hemanth-kumarv/Books-Magazines-CSV

### Books tab

![](/screenshots/books.png)

### Magazines tab

![](/screenshots/magazines.png)

## Setup

Clone this repo to your desktop and run `npm install` to install all the dependencies.

You might want to look into `index.ts` to change the port.

## Usage

After you clone this repo to your desktop, go to its root directory and run `npm install` to install its dependencies.

Once the dependencies are installed, you need to run `npm run dev` to create a dist folder to start the server.
Then you can run `npm start` to start the application from the auto generated dist files. You will then be able to access it at `localhost:3000`

## To-do

- Unit Testing
- Add input validation to Book/Magazine
- Add authors
- Better UX
- Error handling
