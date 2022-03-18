const express = require('express');
const router = express.Router();

const userController=require("../../controllers/admin/user_controller")
const customerController=require("../../controllers/public/customer_controller")
const packageController=require("../../controllers/admin/package_controller")
const otpController=require("../../controllers/admin/otp_controller")

router.post("/renewAccessToken", userController.renewAccessToken);

router.post('/userSignIn',userController.userSignIn)

router.put('/updateProfile/:id',userController.authenticateUser,userController.updateProfile)

router.post('/changePassword',userController.authenticateUser,userController.changePassword)

router.post('/logout',userController.authenticateUser,userController.logout)

router.post('/sendOtp',userController.authenticateUser,otpController.sendOtp)

router.get('/userPackages',userController.authenticateUser,userController.userPackages)
router.get('/userPackageById/:id',userController.authenticateUser,userController.userPackageById)

router.get('/subscriptionsOfPackages',userController.authenticateUser,userController.subscriptionsOfPackages)
router.get('/subscriptionByPackageId/:id',userController.authenticateUser,userController.subscriptionByPackageId)

router.get('/getCustomerBySubscriptionId/:id',userController.authenticateUser,userController.customerBySubscriptionId)

router.get('/getPackageBySubscriptionId/:id',userController.authenticateUser,userController.packageBySubscriptionId)
//customer
router.post('/addCustomer',userController.authenticateUser,customerController.addCustomer)

router.put('/updateCustomer/:id',userController.authenticateUser,customerController.updateCustomer)

router.put('/deleteCustomer/:id',userController.authenticateUser,customerController.deleteCustomer)

router.get('/getSubscribedCustomer/:id',userController.authenticateUser,customerController.getSubscribedCustomers)

//package

router.post('/addPackage',userController.authenticateUser,packageController.addPackage)

router.put('/updatePackage/:id',userController.authenticateUser,packageController.updatePackage)

router.put('/deletePackage/:id',userController.authenticateUser,packageController.deletePackage)







module.exports=router