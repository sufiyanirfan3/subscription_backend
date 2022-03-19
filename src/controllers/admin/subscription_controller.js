
const Subscription = require('../../models').subscription

// add subscription
const addSubscription = async (req, res) => {
        try {
                let info = {
                        FKCustomerID: req.body.FKCustomerID,
                        FKPackageID: req.body.FKPackageID,
                }
                const subscription = await Subscription.create(info)
                res.status(200).send(subscription)
        } catch (e) {
                res.status(400).send(e.message)
        }
}

// get all subscriptions
const getSubscriptions = async (req, res) => {
        try {
                let subscriptions = await Subscription.findAll({where:{ IsDeleted: false }})
                res.status(200).send(subscriptions)
        } catch (e) {
                res.status(400).send(e.message)
        }
}

// get subscription by id
const getSubscriptionById = async (req, res) => {
        try {
                let id = req.params.id
                let subscription = await Subscription.findOne({ where: { PKSubscriptionId: id, IsDeleted: false } })
                res.status(200).send(subscription)
        } catch (e) {
                res.status(400).send(e.message)
        }

}

// update subscription
const updateSubscription = async (req, res) => {
        try {
                let id = req.params.id
                const subscription = await Subscription.update(req.body, { where: { PKSubscriptionId: id, IsDeleted: false } })
                res.status(200).send(subscription)
        } catch (e) {
                res.status(400).send(e.message)
        }
}

// delete subscription
const deleteSubscription = async (req, res) => {
        try {
                let id = req.params.id
        
                const deleteSubscription = await User.update(
                    { IsDeleted: true, DeletedDate: Date.now() },
                    { where: { PKSubscriptionId: id, IsDeleted: false } }
                );
                res.status(200).json("Subscription deleted successfully deleted successfully")
            } catch (e) {
                res.status(400).send(e.message)
            }
        
}

module.exports = {
        addSubscription,
        getSubscriptions,
        getSubscriptionById,
        updateSubscription,
        deleteSubscription
}