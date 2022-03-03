const express = require('express');
const router = express.Router();

const subscriptionController=require("../../controllers/admin/subscription_controller")

router.post('/addSubscription',userController.addSubscription)

router.get('/getSubscriptions',userController.getSubscriptions)

router.get('/getSubscriptionById/:id',userController.getSubscriptionById)

router.put('/updateSubscription/:id',userController.updateSubscription)

router.delete('/deleteSubscription/:id',userController.deleteSubscription)

module.exports=router