const Package = require('../../models').package

// add package
const addPackage = async (req, res) => {

    let info = {
        PackageName: req.body.PackageName,
        PackageCost: req.body.PackageCost,
        SubscriptionPeriod: req.body.SubscriptionPeriod
    }
    const package = await Package.create(info)
    res.status(200).send(package)
}

// get all packages
const getPackages = async (req, res) => {
    let packages = await Package.findAll({})
    res.status(200).send(packages)
}

// get package by id
const getPackageById = async (req, res) => {
    let id = req.params.id
    let package = await Package.findOne({ where: { PKPackageId: id } })
    res.status(200).send(package)

}

// update package
const updatePackage = async (req, res) => {
    let id = req.params.id
    const package = await Package.update(req.body, { where: { PKPackageId: id } })
    res.status(200).send(package)
}

// delete package
const deletePackage = async (req, res) => {
    let id = req.params.id
    await Package.destroy({ where: { PKPackageId: id } })
    res.status(200).send("Package is deleted")

}

//get packages by user id
const getPackagesByUserId = async (req, res)=>{
    try {
        let id = req.params.PKUserId
        let package = await Package.findAll({ where: { FKUserId: id } })
        res.status(200).send(package)

    }catch(e) {
        res.status(500).send(e.message)
    }
}

module.exports = {
    addPackage,
    getPackages,
    getPackageById,
    updatePackage,
    deletePackage,
    getPackagesByUserId
}