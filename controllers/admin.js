

exports.getTaskInfo = (req, res, next) =>{
    res.render('index');
    //res.send('<h1>helllo from taskinfo </h1>');
    console.log('view rendered');

}
exports.getRemainJobs =(req, res, next) =>{
    res.render('admin/login');
    //res.send('<h1>ramaining jobs here</h1>');
    console.log('Remaining jobs here');
}


exports.getCompletedTasks =(req, res, next) =>{
    res.send('<h1>completed jobs here</h1>');
    console.log('completed jobs here');
}


exports.getTotalTasks =(req, res, next) =>{
    res.send('<h1>Total jobs here</h1>');
    console.log('Total jobs here');
}


exports.getEditTask =(req, res, next) =>{
    res.send('<h1>edit here jobs here</h1>');
    console.log('Edit jobs here');
}



exports.getDeleteTask =(req, res, next) =>{
    res.send('<h1>Delete from here jobs here</h1>');
    console.log('Delete jobs here');
}