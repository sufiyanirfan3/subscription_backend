const express = require('express');
const router = express.Router();

const adminController=require("../../controllers/admin/admin_controller")

router.post('/adminSignIn',adminController.adminSignIn)

router.post('/addAdmin',adminController.addAdmin)

router.get('/getAdmins',adminController.getAdmins)

router.get('/getAdminById/:id',adminController.getAdminById)

router.put('/updateAdmin/:id',adminController.updateAdmin)

router.delete('/deleteAdmin/:id',adminController.deleteAdmin)




module.exports=router