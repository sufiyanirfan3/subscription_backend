const bcrypt = require('bcryptjs')
const Admin = require('../../models/admin')

// Admin SignIn
const adminSignIn = async (req, res) => {
    let username = req.body.Username

    let checkUser = await Admin.findOne({ where: { Username: username } })

    if (checkUser) {
        console.log(req.body.Password)
        console.log(checkUser.Password)
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
    if (req.body.Password.length <= 8) {
        res.status(400).send("Password must be greater than 8 characters")
    }
    else {
        let info = {
            FirstName:req.body.FirstName,
            LastName:req.body.LastName,
            Username: req.body.Username,
            Email: req.body.Email,
            Password: req.body.Password,
            PhoneNumber: req.body.PhoneNumber,

        }
        const hashPass = await bcrypt.hash(info.Password, 8)
        info.Password = hashPass
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
    if (req.body.Username || req.body.Email || req.body.Password){
        delete (req.body.Username)
        delete (req.body.Email)
        delete (req.body.Password)
    }
    const admin = await Admin.update(req.body, { where: { PKAdminId: id } })
    res.status(200).send(admin)
}

// delete admin
const deleteAdmin = async (req, res) => {
    let id = req.params.id
    await Admin.destroy({ where: { PKAdminId: id } })
    res.status(200).send("Admin is deleted")

}

// change password
const changePassword = async (req, res) => {
    let x = true;
    const adminId = req.body.PKAdminId;
    const admin = await Admin.findOne({ where: { PKAdminId: adminId } })
    const oldPassword = req.body.oldPassword;
    const newPassword = req.body.newPassword;
    const retypeNewPassword = req.body.retypeNewPassword;

    if (!oldPassword) { res.status(400).send("Please enter your old password") }
    if (!newPassword) { res.status(400).send("Please enter your new password") }
    if (!retypeNewPassword) { res.status(400).send("Please retype your new password") }

    if (newPassword.length <= 8) {
        x = false;
        res.status(400).send("Password must be greater than 8 characters")

    }

    if (newPassword !== retypeNewPassword) {
        x = false;
        res.status(400).send("Passwords donot match!!")
    }

    const passwordMatches = await bcrypt.compare(oldPassword, admin.Password);
    if (!passwordMatches) {
        x = false;
        res.status(400).send("Old password is incorrect")
    }

    const samePassword = await bcrypt.compare(newPassword, admin.Password);
    if (samePassword) {
        x = false;
        res.status(400).send("Old password cannot be same as new password")
    }

    if (x) {
        admin.Password = await bcrypt.hash(newPassword, 8);
        await admin.save();
        res.status(200).send("Password is changed successfully")
    }

}

module.exports = {
    adminSignIn,
    addAdmin,
    getAdmins,
    getAdminById,
    updateAdmin,
    deleteAdmin,
    changePassword
}
