const express = require("express"); 
const cors = require('cors');
const app = express()

const mysql = require("mysql");
require('dotenv').config()
const db = mysql.createConnection({
  host: "localhost",
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: "tasks",
});

app.use(express.json())
app.use(cors())
app.listen(8081, () => {
  console.log("listening")
})


app.get("/tasks", (req, res) => {
  const q = "select * from task";
  db.query(q, (err, data) => {
    console.log(err, data);
    if (err) return res.json({ error: err.sqlMessage });
    else return res.json({ data });
  });
});
app.post("/tasks", (req, res) => {
  const q = `insert into task(taskId, taskTitle, taskDescription)
      values(?)`;
  const values = [...Object.values(req.body)];
  console.log("insert", values);
  db.query(q, [values], (err, data) => {
    console.log(err, data);
    if (err) return res.json({ error: err.sqlMessage });
    else return res.json({ data });
  });
});
app.delete("/tasks/:taskId", (req, res) => {
  const id = req.params.taskId;
  console.log("deleting " + id, req.body);
  const q = `DELETE FROM task WHERE taskId= ?`;
  db.query(q, [id], (err, data) => {
    console.log(err, data);
    if (err) return res.json({ error: err.sqlMessage });
    else res.json({ data })
  })
});