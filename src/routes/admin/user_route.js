const express = require('express');
const router = express.Router();

const userController=require("../../controllers/admin/user_controller")

router.post('/addUser',userController.addUser)

router.get('/getUsers',userController.getUsers)

router.get('/getUserById/:id',userController.getUserById)

router.put('/updateUser/:id',userController.updateUser)

router.delete('/deleteUser/:id',userController.deleteUser)




module.exports=router