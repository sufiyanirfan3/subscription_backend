const bcrypt=require('bcryptjs')
const User = require('../../models/user')

// add user
const addUser = async (req, res) => {
    const hashPass = await bcrypt.hash(req.body.Password, 4)
    let info = {
        Username: req.body.Username,
        Email: req.body.Email,
        Password: hashPass,
        PhoneNo: req.body.PhoneNo,
        CNIC:req.body.CNIC
    }
    const user = await User.create(info)
    res.status(200).send(user)
}


// get all users
const getUsers=async(req,res)=>{
    let users=await User.findAll({})
    res.status(200).send(users)
}

// get user by id
const getUserById=async(req,res)=>{
    let id=req.params.id
    let user=await User.findOne({ where:{PKUserId:id} })
    res.status(200).send(user)

}

// update user
const updateUser=async(req,res)=>{
    let id=req.params.id
    const user=await User.update(req.body, { where:{PKUserId:id} })
    res.status(200).send(user)
}

// delete user
const deleteUser=async(req,res)=>{
    let id=req.params.id
    await User.destroy({ where:{PKUserId:id} })
    res.status(200).send("User is deleted")

}



module.exports={
    addUser,
    getUsers,
    getUserById,
    updateUser,
    deleteUser
}