const Package = require('../../models').package

// add package
const addPackage = async (req, res) => {
    try {
        let info = {
            PackageName: req.body.PackageName,
            PackageCost: req.body.PackageCost,
            SubscriptionPeriod: req.body.SubscriptionPeriod
        }
        const package = await Package.create(info)
        res.status(200).send("Package created successfully")
    } catch (e) {
        res.status(400).send(e.message)
    }
}

// get all packages
const getPackages = async (req, res) => {
    try {
        let packages = await Package.findAll({ IsDeleted: false })
        res.status(200).send(packages)
    } catch (e) {
        res.status(400).send(e.message);
    }
}

// get package by id
const getPackageById = async (req, res) => {
    try {
        let id = req.params.id
        let package = await Package.findOne({ where: { PKPackageId: id, IsDeleted: false } })
        res.status(200).send(package)
    } catch (e) {
        res.status(400).send(e.message);
    }

}

// update package
const updatePackage = async (req, res) => {
    try {
        let id = req.params.id
        const package = await Package.update(req.body, { where: { PKPackageId: id, IsDeleted: false } })
        res.status(200).send(package)
    } catch (e) {
        res.status(400).send(e.message);
    }
}

// delete package
const deletePackage = async (req, res) => {
    try {
        let id = req.params.id

        const deletePackage = await User.update(
            { IsDeleted: true, DeletedDate: Date.now() },
            { where: { PKPackageId: id, IsDeleted: false } }
        );
        res.status(200).json("Package deleted successfully")
    } catch (e) {
        res.status(400).send(e.message)
    }

}

//get packages by user id
const getPackagesByUserId = async (req, res) => {
    try {
        let id = req.params.PKUserId
        let package = await Package.findAll({ where: { FKUserId: id, IsDeleted: false } })
        res.status(200).send(package)

    } catch (e) {
        res.status(400).send(e.message)
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