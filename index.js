import express from "express";
import bodyParser, { json } from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
import path from "path";
import fs from "fs/promises";
import { writeFile, mkdir} from "fs/promises";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const port = 3002;
let blogId;
let blogTitle;
let blogBody;

app.use(express.static("public"));
app.use(express.json());

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.get("/new-blog", (req, res) => {
  newBlogMaker();
  res.render("blog.ejs")
})

app.post("/post-blog", (req, res) => {
  newBlogPoster(req.body);
  res.sendStatus(200);
})

app.listen(port, () => {
  console.log(`running on: ${port}`);
});





function newBlogMaker() {
  console.log(`active`);
}

function newBlogPoster(delivery) {
  console.log(`blog poster here`);
  blogId = delivery.id;
  console.log(blogId);
  createAndStoreJSON(delivery);
}

async function createAndStoreJSON(toStore) {
  try {
    const jsonString = JSON.stringify(toStore, null, 2);
    await fs.writeFile(`${blogId}.json`, jsonString, "utf-8");
    console.log(`${blogId}.json saved successfully`);
  } catch (error) {
    console.log(`error creatin the json file:`, error);
  }
}