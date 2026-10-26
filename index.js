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
let blogArrary = [];
let blogId;
let blogTitle;
let blogBody;

app.use(express.static("public"));
app.use(express.json());

app.get("/", (req, res) => {
  res.render("index.ejs" , { blogs:blogArrary });
});

app.get("/new-blog", (req, res) => {
  newBlogMaker();
  res.render("blog.ejs")
})

app.post("/post-blog", (req, res) => {
  newBlogPoster(req.body);
  res.json({ success: true, redirectUrl: "/" });
})


app.delete("/remove-blog/:id", (req, res) => {
  const idToDelete = Number(req.params.id);
  
  blogArrary = blogArrary.filter(blog => blog.id !== idToDelete);

  res.json({ success: true, redirectUrl: "/" });
});

app.get("/blog/:id", (req, res) => {
  const requestedId = Number(req.params.id); 
  

  const foundBlog = blogArrary.find(blog => blog.id === requestedId);

  if (foundBlog) {
    res.render("blog-detail.ejs", { blog: foundBlog });
  } else {
    res.status(404).send("Blog post not found!");
  }
});

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
  blogArrary.push(delivery);
}