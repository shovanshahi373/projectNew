module.exports = (req, res ) => {

    if(!req.session.IsLoggedIn){
        return res.redirect('/user/login');
    }
    next();

}