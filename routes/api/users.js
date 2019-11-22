const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../../models/User');
const jwt = require("jsonwebtoken");
const keys = require('../../config/keys');
const passport = require('passport');
const validateRegisterInput = require('../../validation/register_validations');
const validateLoginInput = require('../../validation/login_validations');


router.post("/register", (req, res) => {
    const { errors, isValid } = validateRegisterInput(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }
    User.findOne({ email: req.body.email }) // check if in the request body that they gave us, the email is already taken
        .then(user => {
            if (user) {
                return res.status(400).json({ email: "A user has already registered with this email address." })
                .then( User.findOne({ username: req.body.username }) 
                .then(user => { 
                    if (user) {
                        return res.status(400).json({ username: "A user has already registered with this username." })
                    }
                }))
            } else {
                const newUser = new User({
                    email: req.body.email,
                    username: req.body.username,
                    password: req.body.password,
                    location: req.body.location
                })

                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;
                        newUser.password = hash;
                        newUser.save()
                            .then(user => {
                                const payload = {
                                    id: user.id,
                                    email: user.email,
                                    username: user.username,
                                    location: user.location
                                }

                                jwt.sign(payload, keys.secretOrKey, { expiresIn: 3600 }, (err, token) => {
                                    res.json({
                                        success: true,
                                        token: "Bearer " + token
                                    })
                                })
                            })
                            .catch(err => console.log(err))
                    })
                })
            }
        })
})

router.post("/login", (req, res) => {

    const { errors, isValid } = validateLoginInput(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }

    const email = req.body.email;
    const password = req.body.password;

    User.findOne({ email })
        .then(user => {
            if (!user) {
                return res.status(404).json({ password: "User doesn't exist" })
            } else {
                bcrypt.compare(password, user.password)
                    .then(isMatch => {
                        if (isMatch) {
                            const payload = {
                                id: user.id,
                                username: user.username,
                                email: user.email
                            };
                            jwt.sign(payload, keys.secretOrKey, { expiresIn: 3600 }, (err, token) => {
                                res.json({
                                    success: true,
                                    token: 'Bearer ' + token
                                })
                            })
                        } else {
                            return res.status(400).json({ password: 'Incorrect password' })
                        }
                    })
            }
        })
})

router.get('/:user_id', (req, res) => {
    User.findById(req.params.user_id)
        .then(user => (res.json({ id: user._doc._id, username: user._doc.username, email: user._doc.email })))
        .catch(err => (res.status(404).json({ user: "User doesn't exist."})))
})

router.delete('/:user_id', (req, res) => {    
    User.findById(req.params.user_id)
      .then(user => {   
          User.deleteOne({ email: user._doc.email})
            .then( user => {
                res.json({msg: 'deleted'})
            })
        })
      .catch(err => res.status(404).json({ user: "User doesn't exist" }));
    
})

router.patch('/:user_id', (req, res) => {
    const filter ={ _id: req.params.user_id };
    const update = req.body
    User.findOneAndUpdate(filter, update, {new: true})
        .then(user => (res.json(user)))       
        .catch(err => res.status(400).json({ user: "Failed to update" }))
})


//PRIVATE AUTH ROUTE
router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.json({
        id: req.user.id,
        handle: req.user.handle,
        email: req.user.email
    });
});

module.exports = router;