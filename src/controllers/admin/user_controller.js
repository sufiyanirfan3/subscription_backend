const User = require('../../models/user')

// const User=db.users

// addUser
const addUser=async(req,res)=>{
    let info={
        Username:req.body.Username,
        Password:req.body.Password
    }
    const user = await User.create(info)
    res.status(200).send(user)
    console.log(user)
}

// getUser
const getUser=async(req,res)=>{
    let users=await User.findAll({})
    res.status(200).send(users)
}

module.exports={
    addUser,
    getUser
}