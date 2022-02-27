const Admin = require('../../models/admin')

// add admin
const addAdmin=async(req,res)=>{
    let info={
        Username:req.body.Username,
        Email:req.body.Email,
        Password:req.body.Password,
        PhoneNo:req.body.PhoneNo,
        
    }
    const admin = await Admin.create(info)
    res.status(200).send(admin)
}

// get all admins
const getAdmins=async(req,res)=>{
    let admins=await Admin.findAll({})
    res.status(200).send(admins)
}

// get admin by id
const getAdminById=async(req,res)=>{
    let id=req.params.id
    let admin=await Admin.findOne({ where:{PKAdminId:id} })
    res.status(200).send(admin)

}

// update admin
const updateAdmin=async(req,res)=>{
    let id=req.params.id
    const admin=await Admin.update(req.body, { where:{PKAdminId:id} })
    res.status(200).send(admin)
}

// delete admin
const deleteAdmin=async(req,res)=>{
    let id=req.params.id
    await Admin.destroy({ where:{PKAdminId:id} })
    res.status(200).send("Admin is deleted")

}



module.exports={
    addAdmin,
    getAdmins,
    getAdminById,
    updateAdmin,
    deleteAdmin
}
