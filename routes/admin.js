const express = require ('express');

const adminController = require('../controllers/admin');

const router = express.Router();

//admin/taskinfo  GET Route
 router.get('/taskinfo', adminController.getTaskInfo);

//admin/remainJobs  GET Route
 router.get('/ramainTasks', adminController.getRemainJobs);

//admin/completedTasks  GET Route
router.get('/completedTasks' ,adminController.getCompletedTasks);

//admin/totalTasks  GET Route
router.get('/totalTasks', adminController.getTotalTasks);

//admin/totalTasks  GET Route
router.get('/task/edit', adminController.getEditTask);

//admin/task/edit  POST Route
//router.post('/task/edit', adminController.postEditTask);

router.get('/task/delete', adminController.getDeleteTask);

//router.post('/task/delete', adminController.postDeleteTask);


module.exports = router;
