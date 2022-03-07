const express = require('express');
const router = express.Router();

const userController=require("../../controllers/admin/user_controller")
const customerController=require("../../controllers/public/customer_controller")
const packageController=require("../../controllers/admin/package_controller")

router.post("/renewAccessToken", userController.renewAccessToken);

router.put('/updateProfile/:id',userController.authenticateUser,userController.updateProfile)

router.post('/changePassword',userController.authenticateUser,userController.changePassword)

router.post('/logout',userController.authenticateUser,userController.logout)

//customer
router.post('/addCustomer',userController.authenticateUser,customerController.addCustomer)

router.put('/updateCustomer/:id',userController.authenticateUser,customerController.updateCustomer)

router.delete('/deleteCustomer/:id',userController.authenticateUser,customerController.deleteCustomer)

//package

router.post('/addPackage',userController.authenticateUser,packageController.addPackage)

router.put('/updatePackage/:id',userController.authenticateUser,packageController.updatePackage)

router.delete('/deletePackage/:id',userController.authenticateUser,packageController.deletePackage)







module.exports=router