const express = require('express');
const router = express.Router();

const subscriptionController=require("../../controllers/admin/subscription_controller")

router.post('/addSubscription',subscriptionController.addSubscription)

router.get('/getSubscriptions',subscriptionController.getSubscriptions)

router.get('/getSubscriptionById/:id',subscriptionController.getSubscriptionById)

router.put('/updateSubscription/:id',subscriptionController.updateSubscription)

router.delete('/deleteSubscription/:id',subscriptionController.deleteSubscription)

module.exports=router