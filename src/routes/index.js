const express = require("express");
const task = require("../model/task");
const router = express.Router();

const model = require("../model/task")();

router.get("/", (req, res) => {
  model.find({}, (err, tasks) => {
    if (err) throw err;
    res.render("index", {
      title: "CRUD",
      tasks: tasks,
    });
  });
});

router.post("/add", (req, res) => {
  let body = req.body;
  body.status = false;

  model.create(body, (err, task) => {
    if (err) throw err;
    res.redirect("/");
  });
});

router.get("/turn/:id", (req, res) => {
  let id = req.params.id;
  model.findById(id, (err, task) => {
    if (err) throw err;
    task.status = !task.status;
    task.save().then(() => res.redirect("/")); //redirecciona  servidor a ruta inicial
  });
});

router.get("/delete/:id", (req, res) => {
  let id = req.params.id;
  model.remove({ _id: id }, (err, task) => {
    if (err) throw err;
    res.redirect("/");
  });
});

router.get("/edit/:id", async (req, res) => {
  let id = req.params.id;
  try {
    const Task = await model.findById(req.params.id).lean();
    res.render("edit", { Task: Task });
  } catch (error) {
    console.log(error.message);
  }
});

router.post("/edit/:id", async (req, res) => {
  await model.findByIdAndUpdate(req.params.id, req.body);

  res.redirect("/");
});

module.exports = router;
