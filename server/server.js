var express = require('express')
var bodyParser = require('body-parser')
const cors = require('cors')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const _ = require('lodash');

var { User } = require('./models/user');
var { Branch } = require('./models/branches');
var { Product } = require('./models/product');
var { mongoose } = require('./DB/mongoose');

const port = process.env.PORT || 4444;

var app = express();

app.use(cors())
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send({
        massege: 'welcome to war4a server'
    })
})

app.post('/signUp', (req, res) => {

    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(req.body.password, salt, (err, hash) => {
            var user = new User({
                email: req.body.email,
                password: hash,
                name: req.body.name,
                typeOfUser: req.body.typeOfUser,
                mobile: req.body.mobile
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
                    profilePic: userObject.profilePic,
                    mobile: userObject.mobile,
                    name: userObject.name
                })
            } else {
                res.status(400).send({ error: "password don't match" })
            }
        })
    }).catch((e) => {
        res.status(404).send({ error: "email not found" })
    })
})

app.post('/createBranch', (req, res) => {

    var branch = new Branch({
        name: req.body.name,
        mobile: req.body.mobile,
        area: req.body.area,
        ownerId: req.body.ownerId,
        openingHours: req.body.openingHours,
        address: req.body.address
    });

    branch.save().then((doc) => {
        res.send(doc);
    }, (e) => {
        res.status(400).send(e);
    })

});

app.post('/getAllBranch', (req, res) => {

    Branch.find().then((branchesArray) => {
        res.send(branchesArray)
    }).catch((e) => {
        res.send(e)
    })

});

app.post('/newProduct', (req, res) => {

    var product = new Product({
        name: req.body.name,
        desc: req.body.desc,
        price: req.body.price,
        quantity: req.body.quantity,
        madeIn: req.body.madeIn,
        productimage: req.body.productimage,
        category: req.body.category,
        branchId: req.body.branchId
    });

    product.save().then((doc) => {
        res.send(doc);
    }, (e) => {
        res.status(400).send(e);
    })

});

app.post('/getAllProducts', (req, res) => {
    
        Product.find().then((productesArray) => {
            res.send(productesArray)
        }).catch((e) => {
            res.send(e)
        })
    
    });




app.listen(port, () => {
    console.log(`startes on port ${port}`)
});

