const express = require('express');
const router = express.Router();

const adminController = require("../../controllers/admin/admin_controller")
const userController = require("../../controllers/admin/user_controller")
const packageController = require("../../controllers/admin/package_controller")
const subscriptionController = require("../../controllers/admin/subscription_controller")
const customerController = require("../../controllers/public/customer_controller")

//checking
router.post("/renewAccessToken", adminController.renewAccessToken);

router.post('/adminSignIn', adminController.adminSignIn)

router.post('/addAdmin', adminController.authenticateAdmin, adminController.addAdmin)

router.get('/getAdmins', adminController.getAdmins)

router.get('/getAdminById/:id', adminController.getAdminById)

router.put('/updateProfile/:id', adminController.authenticateAdmin, adminController.updateProfile)

router.put('/deleteAdmin/:id', adminController.authenticateAdmin, adminController.deleteAdmin)

router.post('/changePassword', adminController.authenticateAdmin, adminController.changePassword)

router.post('/logout', adminController.authenticateAdmin, adminController.logout)

router.get('/getCustomerBySubscriptionId/:id', adminController.authenticateAdmin, adminController.getCustomerBySubscriptionId)

//user
router.post('/addUser', adminController.authenticateAdmin, userController.addUser)

router.get('/getUsers', adminController.authenticateAdmin, userController.getUsers)

router.get('/getUserById/:id', adminController.authenticateAdmin, userController.getUserById)

router.put('/suspendUser/:id', adminController.authenticateAdmin, userController.suspendUser)

router.put('/temporarySuspendUser/:id', adminController.authenticateAdmin, userController.temporarySuspendUser)

router.put('/deleteUser/:id', adminController.authenticateAdmin, userController.deleteUser)

//package
router.get('/getPackages', adminController.authenticateAdmin, packageController.getPackages)

router.get('/getPackageById/:id', adminController.authenticateAdmin, packageController.getPackageById)

router.get('/getPackagesByUserId/:id', adminController.authenticateAdmin, packageController.getPackagesByUserId)

//subscription
router.get('/getSubscriptions', adminController.authenticateAdmin, subscriptionController.getSubscriptions)

router.get('/getSubscriptionById/:id', adminController.authenticateAdmin, subscriptionController.getSubscriptionById)

//customers
router.get('/getCustomers', adminController.authenticateAdmin, customerController.getCustomers)

router.get('/getCustomerById/:id', adminController.authenticateAdmin, customerController.getCustomerById)














module.exports = router