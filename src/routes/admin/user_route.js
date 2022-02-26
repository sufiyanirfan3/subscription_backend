const express = require('express');
const router = express.Router();

const userController=require("../../controllers/admin/user_controller")

router.get('/getUser',userController.getUser)

router.post('/addUser',userController.addUser)

module.exports=router