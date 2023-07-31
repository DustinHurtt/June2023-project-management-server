var express = require('express');
var router = express.Router();

/* GET home page. */

const Task = require("../models/Task");
const Project = require("../models/Project");

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
//  POST /api/tasks  -  Creates a new task
router.post("/", (req, res, next) => {

  const { title, description, projectId } = req.body;
 
  Task.create({ title, description, project: projectId })
    .then(newTask => {
      return Project.findByIdAndUpdate(
        projectId, 
        { $push: { tasks: newTask._id }},
        {
            new:true
        })
    })
    .then(response => res.json(response))
    .catch(err => res.json(err));
});

module.exports = router;