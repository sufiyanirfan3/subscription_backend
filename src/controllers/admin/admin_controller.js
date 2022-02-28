const bcrypt=require('bcryptjs')
const Admin = require('../../models/admin')

// Admin SignIn
const adminSignIn = async (req, res) => {
    let username = req.body.Username

    let checkUser = await Admin.findOne({ where: { Username: username } })

    if (checkUser) {
        let checkPass = await bcrypt.compare(req.body.Password, checkUser.Password)

        if (checkPass) {
            res.send({ message: "Login Successful" }).status(200)
        }
        else {
            res.send({ message: "Your password is incorrect", value: checkPass, user: checkUser }).status(403)
        }
    }
    else {
        res.send({ message: "No user is registered with this email" }).status(403)
    }
}

// add admin
const addAdmin = async (req, res) => {
    if(req.body.Password.length<=8){
        res.status(403).send("Password must be greater than 8 characters")
    }
    else{

        let info = {
            Username: req.body.Username,
            Email: req.body.Email,
            Password: req.body.Password,
            PhoneNo: req.body.PhoneNo,
            
        }
        const hashPass = await bcrypt.hash(info.Password, 4)
        info.Password=hashPass
        const admin = await Admin.create(info)
        res.status(200).send(admin)
    }
}

// get all admins
const getAdmins = async (req, res) => {
    let admins = await Admin.findAll({})
    res.status(200).send(admins)
}

// get admin by id
const getAdminById = async (req, res) => {
    let id = req.params.id
    let admin = await Admin.findOne({ where: { PKAdminId: id } })
    res.status(200).send(admin)

}

// update admin
const updateAdmin = async (req, res) => {
    let id = req.params.id
    const admin = await Admin.update(req.body, { where: { PKAdminId: id } })
    res.status(200).send(admin)
}

// delete admin
const deleteAdmin = async (req, res) => {
    let id = req.params.id
    await Admin.destroy({ where: { PKAdminId: id } })
    res.status(200).send("Admin is deleted")

}



module.exports = {
    adminSignIn,
    addAdmin,
    getAdmins,
    getAdminById,
    updateAdmin,
    deleteAdmin
}
