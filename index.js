import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();
const port = 3002;

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.get("/new-blog", (req, res) => {
  newBlogMaker();
  res.render("blog.ejs")
})

app.listen(port, () => {
  console.log(`running on: ${port}`);
});





function newBlogMaker() {
  console.log(`active`);
}