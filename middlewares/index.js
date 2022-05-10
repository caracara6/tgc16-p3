const jwt = require('jsonwebtoken');

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

const checkIfAuthenticatedJWT = function(req,res,next) {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        // console.log('authHeader => ', authHeader)
        const token = authHeader.split(' ')[1];

        // console.log('access token =>', token)

        jwt.verify(token, process.env.TOKEN_SECRET, function(err, payload){
            if (err) {
                console.log('status 403')
                return res.sendStatus(403);
            }

            req.user = payload;
            next();
        })
    } else {
        res.sendStatus(403);
    }
}

module.exports = {
    checkIfAuthorised,
    checkIfAuthenticatedJWT
}