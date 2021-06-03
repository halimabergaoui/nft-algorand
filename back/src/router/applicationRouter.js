'use strict';

const router = require('express').Router();
const applicationController = require('../controller/applicationController');
var config = require('../../config');

var options = {
    inflate: true,
    limit: '100kb',
    type: 'application/octet-stream'
};
const bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false })

router.use(bodyParser.raw(options));
router.use((req, res, next) => {
    res.payload = {};
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.setHeader('Access-Control-Allow-Credentials', true)
    next();
});

var getRawBody = require('raw-body');
const { pool } = require('../../config');
router.use(bodyParser.urlencoded({ extended: true }));





router.get('/getGlobalStatus', urlencodedParser, (req, res, next) =>{
    applicationController.getGlobalStatus() 
    .then(result => {
        res.send(result);
    })
    .catch(next)});

router.get('/updateSSC', urlencodedParser, (req, res, next) =>{
    applicationController.updateSSC(req.query.sender) 
    .then(result => {
        res.send(result);
    })
    .catch(next)});

    


    module.exports = router;