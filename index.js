import express from "express";
import bodyParser, { json } from "body-parser";

const app = express();
const port = 3002;
let blogArrary = [];
let blogId;

app.use(bodyParser.urlencoded({extended:true }))
app.use(express.static("public"));
app.use(express.json());

app.get("/", (req, res) => {
  res.render("index.ejs" , { blogs:blogArrary });
});

app.get("/new-blog", (req, res) => {
  res.render("blog.ejs")
})

app.post("/post-blog", (req, res) => {
  newBlogPoster(req.body);
  res.json({ success: true, redirectUrl: "/" });
})

app.get("/edit-blog/:id", (req, res) => {
  const idToEdit =  Number(req.params.id);

  const foundBlog = blogArrary.find(blog => blog.id === idToEdit);

  if (foundBlog) {
    res.render("blog.ejs", { blog: foundBlog });
  }  else {
    res.status(404).send("Blog post not found!");
  }
})

app.put("/update-blog/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = blogArrary.findIndex(blog => blog.id === id);

  if (index === -1) {
    return res.status(404).json({ success: false });
  }

  blogArrary[index] = {
    ...blogArrary[index],
    title: req.body.title,
    body: req.body.body,
    previewText: req.body.previewText
  };

  res.json({ success: true, redirectUrl: `/blog/${id}` });
});

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





function newBlogPoster(delivery) {
  console.log(`blog poster here`);
  blogId = delivery.id;
  console.log(blogId);
  blogArrary.push(delivery);
}