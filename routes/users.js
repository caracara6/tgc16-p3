const express = require('express');
const router = express.Router();
const crypto = require('crypto');

const getHashedPassword = (password) => {
    const sha256 = crypto.createHash('sha256');
    const hash = sha256.update(password).digest('base64');
    return hash;
}

const { User } = require('../models');

const { bootstrapField, loginForm } = require('../forms');

router.get('/login', (req, res) => {

    res.render('users/login', {
        form: loginForm().toHTML(bootstrapField)
    })

})

router.post('/login', (req, res) => {
    loginForm().handle(req, {
        'success': async function (form) {
            let user = await User.where({
                'email': form.data.email
            }).fetch({
                require: false
            })

            if (!user) {
                req.flash('err_msg', "Sorry, your login details are wrong")
                res.redirect('/user/login')
            } else {
                if (user.user_type_id == 1 || user.user_type_id == 2) {
                    // FIXED HASHED PASSWORD HERE
                    if (user.get('password') === getHashedPassword(form.data.password)) {
                        req.session.user = {
                            'id': user.get('id'),
                            'first_name': user.get('first_name'),
                            'last_name': user.get('last_name'),
                            'email': user.get('email')
                        }
                    } else {
                        req.flash('err_msg', "Sorry, your login details are wrong")
                        res.redirect('/user/login')
                    }
                } else {
                    req.flash('err_msg', "You are not authorised to access this website");
                    res.redirect('/');
                }
            }
        },
        'error': function (form) {
            res.render('users/login', {
                'form': form.toHTML(bootstrapField)
            })
        }
    })
})

module.exports = router