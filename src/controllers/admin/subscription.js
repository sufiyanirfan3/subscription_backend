const bcrypt = require('bcryptjs')
const subscription = require('../../models/subscription')

// add subscription
const addsubscription = async (req, res) => {

        let info = {
                FKCustomerID: req.body.FKCustomerID,
                FKPackageID: req.body.FKPackageID,
                CompoundPK: this.FKCustomerID + this.FKPackageID
        }
        const subscription = await subscription.create(info)
        res.status(200).send(subscription)
}


// get all subscriptions
const getsubscriptions = async (req, res) => {
        let subscriptions = await subscription.findAll({})
        res.status(200).send(subscriptions)
}

// get subscription by id
const getsubscriptionById = async (req, res) => {
        let id = req.params.id
        let subscription = await subscription.findOne({ where: { CompoundPK: id } })
        res.status(200).send(subscription)

}

// update subscription
const updatesubscription = async (req, res) => {
        let id = req.params.id
        const subscription = await subscription.update(req.body, { where: { CompoundPK: id } })
        res.status(200).send(subscription)
}

// delete subscription
const deletesubscription = async (req, res) => {
        let id = req.params.id
        await subscription.destroy({ where: { CompoundPK: id } })
        res.status(200).send("subscription is deleted")

}



module.exports = {
        addsubscription,
        getsubscriptions,
        getsubscriptionById,
        updatesubscription,
        deletesubscription
}