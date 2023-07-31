var express = require('express');
var router = express.Router();
var mongoose = require('mongoose')

/* GET home page. */

const Project = require("../models/Project");
const Task = require("../models/Task");

router.get('/', function(req, res, next) {
    Project.find()
    .populate('tasks')
    .then(allProjects => res.json(allProjects))
    .catch(err => res.json(err));
});
//  POST /api/projects  -  Creates a new project
router.post("/", (req, res, next) => {

  const { title, description } = req.body;
 
  Project.create(
    { 
        title, 
        description,
    }
    )
    .then((response) => {
        console.log("Response", response)
        res.json(response)
    })
    .catch((err) => {
        console.log(err)
        res.json(err)
        next(err)
    });

});

// routes/project.routes.js
// ...

//  GET /api/projects/:projectId -  Retrieves a specific project by id
router.get('/project-details/:projectId', (req, res, next) => {
    const { projectId } = req.params;
  
    if (!mongoose.Types.ObjectId.isValid(projectId)) {
      res.status(400).json({ message: 'Specified id is not valid' });
      return;
    }
  
    // Each Project document has a `tasks` array holding `_id`s of Task documents
    // We use .populate() method to get swap the `_id`s for the actual Task documents
    Project.findById(projectId)
      .populate('tasks')
      .then(project => res.status(200).json(project))
      .catch(error => res.json(error));
  });
  
  
  // PUT  /api/projects/:projectId  -  Updates a specific project by id
  router.put('/project-update/:projectId', (req, res, next) => {
    const { projectId } = req.params;
  
    if (!mongoose.Types.ObjectId.isValid(projectId)) {
      res.status(400).json({ message: 'Specified id is not valid' });
      return;
    }
  
    Project.findByIdAndUpdate(projectId, req.body, { new: true })
      .then((updatedProject) => res.json(updatedProject))
      .catch(error => res.json(error));
  });
  
  
  // DELETE  /api/projects/:projectId  -  Deletes a specific project by id
  router.delete('/project-delete/:projectId', (req, res, next) => {
    const { projectId } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(projectId)) {
      res.status(400).json({ message: 'Specified id is not valid' });
      return;
    }
  
    Project.findByIdAndRemove(projectId)
      .then(() => res.json({ message: `Project with ${projectId} is removed successfully.` }))
      .catch(error => res.json(error));
  });
  
  
  // ...
  

module.exports = router;
