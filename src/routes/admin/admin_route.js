const express = require('express');
const router = express.Router();

const adminController=require("../../controllers/admin/admin_controller")

router.post("/renewAccessToken", adminController.renewAccessToken);

router.post('/adminSignIn',adminController.adminSignIn)

router.post('/addAdmin',adminController.authenticateAdmin,adminController.addAdmin)

router.get('/getAdmins',adminController.getAdmins)

router.get('/getAdminById/:id',adminController.getAdminById)

router.put('/updateAdmin/:id',adminController.authenticateAdmin,adminController.updateAdmin)

router.delete('/deleteAdmin/:id',adminController.authenticateAdmin,adminController.deleteAdmin)

router.post('/changePassword',adminController.authenticateAdmin,adminController.changePassword)


module.exports=router