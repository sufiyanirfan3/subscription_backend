
const Subscription = require('../../models').subscription

// add subscription
const addSubscription = async (req, res) => {

        let info = {
                FKCustomerID: req.body.FKCustomerID,
                FKPackageID: req.body.FKPackageID,
                CompoundPK: this.FKCustomerID + this.FKPackageID
        }
        const subscription = await Subscription.create(info)
        res.status(200).send(subscription)
}


// get all subscriptions
const getSubscriptions = async (req, res) => {
        let subscriptions = await Subscription.findAll({})
        res.status(200).send(subscriptions)
}

// get subscription by id
const getSubscriptionById = async (req, res) => {
        let id = req.params.id
        let subscription = await Subscription.findOne({ where: { CompoundPK: id } })
        res.status(200).send(subscription)

}

// update subscription
const updateSubscription = async (req, res) => {
        let id = req.params.id
        const subscription = await Subscription.update(req.body, { where: { CompoundPK: id } })
        res.status(200).send(subscription)
}

// delete subscription
const deleteSubscription = async (req, res) => {
        let id = req.params.id
        await Subscription.destroy({ where: { CompoundPK: id } })
        res.status(200).send("subscription is deleted")

}



module.exports = {
        addSubscription,
        getSubscriptions,
        getSubscriptionById,
        updateSubscription,
        deleteSubscription
}