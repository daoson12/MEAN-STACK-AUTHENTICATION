const express = require('express');
const jwt = require('jsonwebtoken')
const router = express.Router()
const User = require('../models/user')
const mongoose = require('mongoose');
const user = require('../models/user');
const db = "mongodb+srv://VictorD:Daoson12@ola12.oiahp.mongodb.net/eventsdb?retryWrites=true&w=majority"

mongoose.connect(db, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true

    },
    err => {
        if (err) {
            console.error('Error!' + err)
        } else {
            console.log('Connected to Mongodb')
        }
    })

function verifyToken(req, res, next) {
    if (!req.headers.authorization) {
        return res.status(401).send('Unauthorized request')
    }
    let token = req.headers.authorization.split(' ')[1]
    if (token === 'null') {
        return res.status(401).send('Unauthorized request')
    }
    let payload = jwt.verify(token, 'secretKey')
    if (!payload) {
        return res.status(401).send('Unauthorized request')

    }
    req.userId = payload.subject
    next()
}


router.get('/', (req, res) => {
    res.send('from API route')
})




router.post('/register', (req, res) => {
    let userData = req.body
    let user = new User(userData)
    user.save((error, registeredUser) => {
        if (error) {
            console.log(error)
        } else {
            let payload = { subject: registeredUser._id }
            let token = jwt.sign(payload, 'secretKey')
            res.status(200).send({ token })
        }

    })

})

router.post('/login', (req, res) => {
    let userData = req.body
    User.findOne({ email: userData.email }, (error, user) => {
        if (error) {
            console.log(error)
        } else {
            if (!user) {
                res.status(401).send('Invalid email')
            } else
            if (user.password !== userData.password) {
                res.status(401).send('Invalid password')
            } else {
                let payload = { subject: user._id }
                let token = jwt.sign(payload, 'secretKey')
                res.status(200).send({ token })
                    // res.status(200).send(user)
            }

        }
    })
})

router.get('/events', (req, res) => {
    let events = [{
            "id": 1,
            "name": "Adam Carter",
            "description": "Unilogic",
            "date": "2020-6-12",

        },
        {
            "id": 2,
            "name": "Adam Carter",
            "description": "Unilogic",
            "date": "2020-6-12",

        }, {
            "id": 3,
            "name": "Adam Carter",
            "description": "Unilogic",
            "date": "2020-6-12",

        }, {
            "id": 4,
            "name": "Adam Carter",
            "description": "Unilogic",
            "date": "2020-6-12",

        }, {
            "id": 5,
            "name": "Adam Carter",
            "description": "Unilogic",
            "date": "2020-6-23",

        }, {
            "id": 6,
            "name": "Adam Carter",
            "description": "Unilogic",
            "date": "2020-6-23",

        }
    ]
    res.json(events)
})
router.get('/special', (req, res) => {
    let events = [{
            "id": 1,
            "name": "Adam Carter",
            "description": "Unilogic",
            "date": "2020-6-12",

        },
        {
            "id": 2,
            "name": "Adam Carter",
            "description": "Unilogic",
            "date": "2020-6-12",

        }, {
            "id": 3,
            "name": "Adam Carter",
            "description": "Unilogic",
            "date": "2020-6-12",

        }, {
            "id": 4,
            "name": "Adam Carter",
            "description": "Unilogic",
            "date": "2020-6-12",

        }, {
            "id": 5,
            "name": "Adam Carter",
            "description": "Unilogic",
            "date": "2020-6-23",

        }, {
            "id": 6,
            "name": "Adam Carter",
            "description": "Unilogic",
            "date": "2020-6-23",

        }
    ]
    res.json(events)
})
module.exports = router