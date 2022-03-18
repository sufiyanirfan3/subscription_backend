const express = require('express');
const router = express.Router();

const contactUsController=require("../../controllers/public/contactUs_controller")

router.post('/contactUs',contactUsController.contactUs)

module.exports=router