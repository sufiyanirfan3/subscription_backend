const express = require('express');
const router = express.Router();

const packageController=require("../../controllers/admin/package_controller")

router.post('/addPackage',packageController.addPackage)

router.get('/getPackages',packageController.getPackages)

router.get('/getPackageById/:id',packageController.getPackageById)

router.put('/updatePackage/:id',packageController.updatePackage)

router.delete('/deletePackage/:id',packageController.deletePackage)

module.exports=router