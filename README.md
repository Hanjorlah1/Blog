# Simple Blog App

A beginner-friendly blog application built with Node.js and Express.  
This is my first backend project — featuring full create, read, update, and delete (CRUD) capabilities for blog posts.

## 🚀 Features

- **Create:** Write and publish new blog posts.
- **Read:** View all posts on the homepage or open full post details.
- **Update:** Edit existing posts smoothly.
- **Delete:** Remove posts instantly.
- **Empty State:** Clean, user-friendly UI layout when no posts exist.

## 🛠️ Technologies Used

- **Backend:** Node.js, Express
- **Frontend & Templates:** EJS (Embedded JavaScript), HTML5, CSS3, Vanilla JavaScript
- **Middleware:** Body-parser

## 💻 How to Run Locally
  
1. **Clone the repository:**
   ```bash
   git clone https://github.com/Hanjorlah1/Blog.git
   ```

2. **Navigate into the project folder:**
   ```bash
   cd Blog
   ```

3. **Install dependencies:**
   ```bash
   npm install
   ```

4. **Start the server:**
   ```bash
   node index.js
   ```

5. **Open your browser and navigate to:**
   ```text
   http://localhost:3002
   ```

## 🧠 What I Learned

- Setting up and structuring a basic Express server.
- Creating semantic RESTful routing structures (`GET`, `POST`, `PUT`, `DELETE`).
- Injecting dynamic content using EJS templates and modular layout partials.
- Extracting and incoming form data safely with `body-parser`.
- Managing temporary server-side application state via JavaScript arrays.
- Executing full CRUD workflows completely from scratch.

## ⚠️ Notes

- **In-Memory Storage:** Posts are stored temporarily in a server-side array. This means data resets whenever you restart the Node.js process.
- **Learning Phase:** As my very first backend application, my current focus is on fundamental core routing and architecture rather than advanced security or database persistence.

## 🔮 Future Improvements

- [ ] Connect a persistent data layer (like MongoDB or a local JSON file store).
- [ ] Add explicit query or title search bars.
- [ ] Implement secure, random, or auto-incrementing unique IDs on the server.
- [ ] Set up comprehensive server-side input and form validation.
- [ ] Fully adapt styles for completely responsive mobile viewing.
- [ ] Incorporate secure backend authentication and routing practices.

---

Built with 💻 by **David Oyaniran**  
300 Level CS Student | Building in public.
