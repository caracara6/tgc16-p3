const express = require('express');
const router = express.Router();
const crypto = require('crypto');

const getHashedPassword = (password) => {
    const sha256 = crypto.createHash('sha256');
    const hash = sha256.update(password).digest('base64');
    return hash;
}

const { User } = require('../models');

const userDAL = require('../dal/users')

const { bootstrapField, registrationForm, loginForm } = require('../forms');

router.get('/register', (req, res) => {

    res.render('users/register', {
        'form': registrationForm().toHTML(bootstrapField)
    })
})

router.post('/register', async (req, res) => {
    registrationForm().handle(req, {
        'success': async function (form) {

            let user = await userDAL.getUserByEmail(form.data.email)

            if (user) {
                req.flash("err_msg", "This email has been used to create an account. Please login or use another email to register.");
                res.redirect('/user/login')
            } else {
                const newUser = new User({
                    'first_name': form.data.first_name,
                    'last_name': form.data.last_name,
                    'password': getHashedPassword(form.data.password),
                    'email': form.data.email,
                    'user_type_id': 2
                });
                await newUser.save();
                req.session.user = {
                    'id': newUser.get('id'),
                    'first_name': newUser.get('first_name'),
                    'last_name': newUser.get('last_name'),
                    'email': newUser.get('email'),
                    'user_type_id': newUser.get('user_type_id')
                }
                req.flash("success_msg", "You have registered successfully");
                res.redirect('/product-related');
            }
        },
        'error': function (form) {
            res.render('users/register', {
                'form': form.toHTML(bootstrapField)
            })
        }
    })
})

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
                console.log(1)
                req.flash('err_msg', "Sorry, your login details are wrong")
                res.redirect('/user/login')
            } else {
                console.log('else')
                // console.log(user.first_name)
                // console.log(user.user_type_id)
                if (user.get('user_type_id') == 1 || user.get('user_type_id') == 2) {
                    console.log('user type check')
                    // FIXED HASHED PASSWORD HERE
                    if (user.get('password') === getHashedPassword(form.data.password)) {
                        req.session.user = {
                            'id': user.get('id'),
                            'first_name': user.get('first_name'),
                            'last_name': user.get('last_name'),
                            'email': user.get('email'),
                            'user_type_id': user.get('user_type_id')
                        }

                        req.flash('success_msg', "You hvae logged in successfully")
                        res.redirect('/product-related')
                    } else {
                        console.log(2)
                        req.flash('err_msg', "Sorry, your login details are wrong")
                        res.redirect('/user/login')
                    }
                } else {
                    console.log(3)
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

router.get('/logout', (req, res) => {
    req.session.user = null;
    req.flash('success_msg', "You have logged out");
    res.redirect('/user/login');
})

module.exports = router