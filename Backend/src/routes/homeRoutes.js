const express = require('express');

const router = express.Router();

const {getHome,createUser} = require('../controllers/homeController')

router.get("/",getHome);
router.post("/user",createUser)

module.exports =router