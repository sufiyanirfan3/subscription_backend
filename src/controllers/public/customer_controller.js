const Customer = require('../../models/customer')

// add customer
const addCustomer = async (req, res) => {
    try {
        if (req.body.Password.length <= 8) {
            res.status(400).send("Password must be greater than 8 characters")
        }
        else {
            let info = {
                FirstName: req.body.FirstName,
                LastName: req.body.LastName,
                Username: req.body.Username,
                Email: req.body.Email,
                Password: req.body.Password,
                PhoneNumber: req.body.PhoneNumber,
                CNIC: req.body.CNIC,
                Address: req.body.Address,
                Country: req.body.Country,
                City: req.body.City,
                Area: req.body.Area
            }

            const hashPass = await bcrypt.hash(info.Password, 8)
            info.Password = hashPass
            const customer = await Customer.create(info)
            res.status(200).send(customer)
        }
    } catch (e) {
        res.status(400).send(e.message);
    }



}

// get all customers
const getCustomers = async (req, res) => {
    try {
        let customers = await Customer.findAll({ IsDeleted: false })
        res.status(200).send(customers)
    } catch (e) {
        res.status(400).send(e.message);
    }
}

// get customer by id
const getCustomerById = async (req, res) => {
    try {
        let id = req.params.id
        let customer = await Customer.findOne({ where: { PKCustomerId: id, IsDeleted: false } })
        res.status(200).send(customer)
    } catch (e) {
        res.status(400).send(e.message);
    }

}

// update customer
const updateCustomer = async (req, res) => {
    try {
        let id = req.params.id
        const customer = await Customer.update(req.body, { where: { PKCustomerId: id, IsDeleted: false } })
        res.status(200).send("Customer Updated successfully")
    } catch (e) {
        res.status(400).send(e.message);
    }
}

// delete customer
const deleteCustomer = async (req, res) => {
    try {
        let id = req.params.id
        const deleteCustomer = await User.update(
            { IsDeleted: true, DeletedDate: Date.now() },
            { where: { PKCustomerId: id, IsDeleted: false } }
        );
        res.status(200).json("Customer deleted successfully")
    } catch (e) {
        res.status(400).send(e.message)
    }
}



module.exports = {
    addCustomer,
    getCustomers,
    getCustomerById,
    updateCustomer,
    deleteCustomer
}
