const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const { User, BlacklistedToken } = require('../../models');
const userDAL = require('../../dal/users')
const {checkIfAuthenticatedJWT} = require('../../middlewares')

const generateToken = (user, secret, expiry) => {
    // three arguments:
    // arg 1: JWT payload
    // arg 2: token secret
    // arg 3: configuration object
    return jwt.sign({
        'first_name': user.first_name,
        'last_name' : user.last_name,
        'id': user.id,
        'email': user.email,
        'user_type_id' : user.user_type_id
    }, secret, {
        'expiresIn': expiry // w for weeks, m for minutes, s for seconds
    });
}

const getHashedPassword = (password) => {
    const sha256 = crypto.createHash('sha256');
    const hash = sha256.update(password).digest('base64');
    return hash;
}

router.post('/register', async function (req, res) {

    let { first_name, last_name, email, password } = req.body

    try{

        let user = await userDAL.getUserByEmail(email)

        if(user){
            return res.status(400).send({"message" : "This email has been used to sign up for an account"})

        } else {
            let newUser = new User({
                first_name,
                last_name,
                email,
                password : getHashedPassword(password),
                user_type_id: 3
            })
            await newUser.save() 
            return res.status(200).send({"message": "Registration successful"})
        }
        
    } catch(e) {
        res.status(500).send({"message" : "We have encountered an internal server error"})
    }
})




router.post('/login', async (req, res) => {

    try{

        let user = await User.where({
            'email': req.body.email
        }).fetch({
            require: false
        });
    
        if (user && user.get('password') == getHashedPassword(req.body.password)){
            console.log(user.toJSON())
            let accessToken = generateToken(user.toJSON(), process.env.TOKEN_SECRET, "1h");
            let refreshToken = generateToken(user.toJSON(), process.env.REFRESH_TOKEN_SECRET, "1w");
            
            return res.status(200).send({
                accessToken,
                refreshToken
            })
        } else {
            return res.status(400).send({
                'error':"Wrong email or password"
            })
        }

    } catch (e) {
        res.status(500).send({'message': "Internal server error, please contatc administrator"})
    }
})

router.post('/refresh', async function(req,res){

    if (!req.body.refreshToken) {
        return res.sendStatus(401);
    };

    let blacklistedToken = await BlacklistedToken.where({
        'token': req.body.refreshToken
    }).fetch({
        require: false
    })

    if (blacklistedToken) {
        res.status(401);
        return res.send({
            'message':"The refresh token has already expired."
        })
    }

    jwt.verify(req.body.refreshToken, process.env.REFRESH_TOKEN_SECRET, function(err, payload){
        if (err) {
            return res.sendStatus(401);
        }
        let accessToken = generateToken(payload, process.env.TOKEN_SECRET, '1h');
        res.status(200).send({
            accessToken
        })
    })
})

router.get('/profile', checkIfAuthenticatedJWT, function(req,res) {
    console.log(req.user)
    res.send(
        req.user
    //     {
    //     'message':"Welcome " + req.user.first_name
    // }
    )
})

router.post('/logout', async(req,res)=>{
    if (!req.body.refreshToken) {
        console.log('1')
        res.sendStatus(401);
    } else {
        jwt.verify(req.body.refreshToken, process.env.REFRESH_TOKEN_SECRET,
            async function(err,payload){
                if (err) {
                    console.log(err)
                    console.log('2')
                    return res.sendStatus(401);
                } 
                const token = new BlacklistedToken();
                token.set('token', req.body.refreshToken);
                token.set('date_created', new Date())
                await token.save();
                res.send({
                    'message':"logged out"
                })
            })
    }
})

module.exports = router;