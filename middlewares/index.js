const checkIfAuthorised = (req, res, next) => {
    if (req.session.user) {
        if (req.session.user.user_type_id == 1 || req.session.user.user_type_id == 2) {
            next()
        } else {
            req.flash("error_msg", "You are not authorised to access this page");
            res.redirect('/');
        }
    } else {
        req.flash("error_msg", "You are not authorised to access this page");
        res.redirect('/');
    }


}

module.exports = {
    checkIfAuthorised
}