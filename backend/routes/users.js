//required variables/constants
const router = require('express').Router();
let User = require('../models/user.model');

//Will get all users from mongo database and returns as JSON
router.route('/').get((req, res) => {
    User.find()
    .then(users => res. json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

//Post to create new users
router.route('/add').post((req, res) => {
    const username = req.body.username;
    const newUser = new User ({username});
    //saves user to mongodb
    newUser.save()
    .then(() => res.json('User added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;