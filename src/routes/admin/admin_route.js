const express = require('express');
const router = express.Router();
const db = require('../../../config/database')
const Admin = require('../../models/admin');


// Get gig list
router.get('/', (req, res) => 
  Admin.findAll()
    .then(admin => {
        console.log(admin)
      })
    .catch(err => res.render('error', {error: err})));

module.exports=router