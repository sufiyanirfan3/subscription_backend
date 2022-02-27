const express = require('express');
const router = express.Router();

const customerController=require("../../controllers/public/customer_controller")

router.post('/addCustomer',customerController.addCustomer)

router.get('/getCustomers',customerController.getCustomers)

router.get('/getCustomerById/:id',customerController.getCustomerById)

router.put('/updateCustomer/:id',customerController.updateCustomer)

router.delete('/deleteCustomer/:id',customerController.deleteCustomer)




module.exports=router