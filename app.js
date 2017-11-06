const express = require('express');
const mysql = require('mysql')

const app = express();

// Create connection
var db = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '321Blast',
  database : 'nodemysql'
});

// Create the db
app.get('/createdb', (req, res) => {
  let sql = 'CREATE DATABASE nodemysql';
  db.query(sql, (err, result) =>{
    if(err) throw err;
    console.log(result);
    res.send('DATABASE CREATED!')
  })
})

// Connect to the server
db.connect((err) =>{
  if(err){
    throw err;
  }
  console.log('MySQL connected')
})

// Create table
app.get('/createposttable', (req, res) => {
  let sql = 'CREATE TABLE posts(id int AUTO_INCREMENT, title VARCHAR(255), body VARCHAR(255), PRIMARY KEY(id))';
  db.query(sql, (err, result) => {
    if(err) throw err;
    console.log(result);
    res.send('Post table created');
  });
});

// Create post
app.get('/addpost', (req, res) => {
  let post = {title:'Post One', body:'This is post number one'};
  let sql = 'INSERT INTO posts SET ?';
  let query = db.query(sql, post, (err, result) => {
    if(err) throw err;
    console.log(result);
    res.send('Post 1 added');
  });
});

// Read posts
app.post('/getposts', (req, res) => {
  let sql = 'SELECT * FROM posts';
  let query = db.query(sql, (err, result) => {
    if(err) throw err;
    console.log(result);
    res.send('Grabbing posts');
  });
});

// Update a post
app.update('/updatepost/:id', (req, res) => {
  let newTitle = 'Updated title';
  let sql = `UPDATE posts SET title = '${newTitle}' WHERE id = ${req.params.id}`;
  let query = db.query(sql, (err, result) => {
    if(err) throw err;
    console.log(result);
    res.send('Updating post');
  });
});

// Delete a post
app.delete('/deletepost/:id', (req, res) => {
  let sql = `DELETE posts WHERE id = ${req.params.id}`;
  let query = db.query(sql, (err, result) => {
    if(err) throw err;
    console.log(result);
    res.send('Deleted post');
  });
});

app.listen('3000' , () => {
  console.log('server started on port 3000')
});
