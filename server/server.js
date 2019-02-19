var express = require('express')
var bodyParser = require('body-parser')
const cors = require('cors')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const _ = require('lodash');

var { User } = require('./models/user');
var { mongoose } = require('./DB/mongoose');

const port = process.env.PORT || 3333;

var app = express();

app.use(cors())
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send({
        massege: 'welcome to todo server',
        apis: [{
            URL: "https://safe-chamber-93231.herokuapp.com/signUp",
            type:"post req",
            Takes: {
                email: "x@x.x",
                password: "xxxxxx",
                typeOfUser: "user",
                tasks: []
            }, gives: "object that added to DB"
        },{
            URL: "https://safe-chamber-93231.herokuapp.com/login",
            type:"post req",
            Takes: {
                email: "x@x.x",
                password: "xxxxxx"
            }, 
            gives: {
                email: "x@x.x",
                typeOfUser: "user",
                tasks: [{ name: "doing your job", statues: true }]
            }

        }]
    })
})

app.post('/signUp', (req, res) => {

    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(req.body.password, salt, (err, hash) => {
            var user = new User({
                email: req.body.email,
                password: hash,
                tasks: req.body.tasks,
                typeOfUser: req.body.typeOfUser
            });

            user.save().then((doc) => {
                res.send(doc);
            }, (e) => {
                res.status(400).send(e);
            })
        })
    })

});



app.post('/login', (req, res) => {
    User.findOne({ email: req.body.email }).then((userObject) => {
        bcrypt.compare(req.body.password, userObject.password, (err, Res) => {
            if (Res == true) {
                res.send({
                    email: userObject.email,
                    typeOfUser: userObject.typeOfUser,
                    tasks: userObject.tasks
                })
            } else {
                res.status(400).send({ error: "password don't match" })
            }
        })
    }).catch((e) => {
        res.status(404).send({ error: "email not found" })
    })
})


app.listen(port, () => {
    console.log(`startes on port ${port}`)
});

