const express = require("express");
const mysql = require("mysql");

//Create connection
const db = mysql.createConnection({
  host: "localhost",
  user: "paparis",
  password: "123456",
  database: "nodemysql",
});

//Connect
db.connect((err) => {
  if (err) {
    console.log(err);
  }
  console.log("MySql Connected...");
});

const app = express();

// Create DB
app.get("/createdb", (req, res) => {
  let sql = "CREATE DATABASE nodemysql";
  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
    }
    console.log(result);
    res.send("Database created...");
  });
});

//Create table
app.get("/createpoststable", (req, res) => {
  let sql = `CREATE TABLE posts(
    id INT AUTO_INCREMENT,
    title VARCHAR(255),
    body VARCHAR(255),
    PRIMARY KEY (id)
    )`;
  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
    }
    console.log(result);
    res.send("posts table created...");
  });
});

//Insert post 1
app.get("/addpost1", (req, res) => {
  let post = { title: "Post one", body: "this is post number one" };
  let sql = "INSERT INTO posts SET ?";
  let query = db.query(sql, post, (err, result) => {
    if (err) {
      console.log(err);
    }
    console.log(result);
    res.send("Post 1 Added");
  });
});

//Insert post 2
app.get("/addpost2", (req, res) => {
  let post = { title: "Post two", body: "this is post number two!" };
  let sql = "INSERT INTO posts SET ?";
  let query = db.query(sql, post, (err, result) => {
    if (err) {
      console.log(err);
    }
    console.log(result);
    res.send("Post 2 Added");
  });
});

//Select posts
app.get("/getposts", (req, res) => {
  let sql = "SELECT * FROM posts";
  let query = db.query(sql, (err, results) => {
    if (err) {
      console.log(err);
    }
    console.log(results[0].title);
    res.send("Posts fetched...");
  });
});

//Select single post
app.get("/getpost/:id", (req, res) => {
  let sql = `SELECT * FROM posts WHERE id = ${req.params.id}`;
  let query = db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
    }
    console.log(result);
    res.send("Post fetched...");
  });
});

//Update post
app.get("/updatepost/:id", (req, res) => {
  let newTitle = "Updated Title oeo";
  let sql = `UPDATE posts SET title = '${newTitle}' WHERE id = ${req.params.id}`;
  let query = db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
    }
    console.log(result);
    res.send("Post updated...");
  });
});

//delete post
app.get("/deletepost/:id", (req, res) => {
  let sql = `DELETE FROM posts WHERE id = ${req.params.id}`;
  let query = db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
    }
    console.log(result);
    res.send("Post deleted...");
  });
});

app.listen("3000", () => {
  console.log("server started on port 3000");
});
