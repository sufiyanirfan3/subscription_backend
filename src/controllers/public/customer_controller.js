const Customer = require('../../models/customer')

// add customer
const addCustomer=async(req,res)=>{
    let info={
        Username:req.body.Username,
        Email:req.body.Email,
        Password:req.body.Password,
        PhoneNo:req.body.PhoneNo,
        CNIC:req.body.CNIC
        
    }
    const customer = await Customer.create(info)
    res.status(200).send(customer)
}

// get all customers
const getCustomers=async(req,res)=>{
    let customers=await Customer.findAll({})
    res.status(200).send(customers)
}

// get customer by id
const getCustomerById=async(req,res)=>{
    let id=req.params.id
    let customer=await Customer.findOne({ where:{PKCustomerId:id} })
    res.status(200).send(customer)

}

// update customer
const updateCustomer=async(req,res)=>{
    let id=req.params.id
    const customer=await Customer.update(req.body, { where:{PKCustomerId:id} })
    res.status(200).send(customer)
}

// delete customer
const deleteCustomer=async(req,res)=>{
    let id=req.params.id
    await Customer.destroy({ where:{PKCustomerId:id} })
    res.status(200).send("Customer is deleted")

}



module.exports={
    addCustomer,
    getCustomers,
    getCustomerById,
    updateCustomer,
    deleteCustomer
}
