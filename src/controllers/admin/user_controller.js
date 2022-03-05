const bcrypt = require('bcryptjs')
const User = require('../../models').user
const jwt = require("jsonwebtoken");
const Session = require('../../models').session

// Authenticate user
const authenticateUser = async (req, res, next) => {
    try {
        if (!req.header("Authorization")) {
            return res.status(400).send("Pass the tokens in headers");
        }
        const accessToken = req.header('authorization').split(" ")[1];
        const decodedToken = jwt.verify(accessToken, process.env.ACCESS_TOKEN);
        const PKUserId = decodedToken.PKUserId;
        const user = await User.findOne({ where: { PKUserId: PKUserId } });
        req.accessToken = accessToken;
        req.user = user;
        next();

    } catch (e) {
        res.status(400).send(e.message)
    }
}

// Generate tokens
async function generateAuthToken(PKUserId) {
    try {
        const refreshToken = jwt.sign(
            { PKUserId: PKUserId },
            process.env.REFRESH_TOKEN,
            {
                expiresIn: 86400
            }
        );

        const accessToken = jwt.sign(
            { PKUserId: PKUserId },
            process.env.ACCESS_TOKEN,
            {
                expiresIn: 3600
            }
        );
        return {
            refreshToken: refreshToken,
            accessToken: accessToken
        };
    } catch (e) {
        res.status(400).send(e.message);
    }
}

// Renew access token
const renewAccessToken = async (req, res) => {
    try {
        const refreshToken = await req.body.refreshToken;
        if (!refreshToken) {
            return res.status(400).send("Please enter refresh token in body");
        }

        const decodedToken = jwt.verify(refreshToken, process.env.REFRESH_TOKEN);
        const activeUser = await Session.findOne({ where: { RefreshToken: refreshToken } });

        if (!activeUser) {
            return res.status(400).send("Refresh Token is invalid or has expired");
        }

        const PKUserId = parseInt(decodedToken.PKUserId, 10);
        const user = await User.findOne({ where: { PKUserId: PKUserId } });

        if (!user) {
            res.status(400).send("Refresh Token is invalid or has expired");
        }

        const newAccessToken = jwt.sign({ PKUserId: PKUserId }, process.env.ACCESS_TOKEN, { expiresIn: 3600 });
        res.status(200).send({ newAccessToken: newAccessToken });
    } catch (e) {
        res.status(400).send(e.message);
    }
}

// user SignIn
const userSignIn = async (req, res) => {
    let username = req.body.Username

    const user = await User.findOne({ where: { Username: username } })

    if (user) {

        let checkPass = await bcrypt.compare(req.body.Password, user.Password)

        if (checkPass) {
            const tokens = await generateAuthToken(admin.PKUserId);
            const refreshToken = tokens.refreshToken;
            const session = await Session.build({
                FKUserId: user.PKUserId,
                RefreshToken: refreshToken
            });
            await session.save();
            res.status(200).json({ message: "Login Succesful", tokens: tokens });
        }
        else {
            res.send({ message: "Your password is incorrect", value: checkPass, user: checkUser }).status(403)
        }


    }
    else {
        res.send({ message: "No user is registered with this username" }).status(403)
    }
}

// add user
const addUser = async (req, res) => {
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
            CNIC: req.body.CNIC
        }

        const hashPass = await bcrypt.hash(info.Password, 8)
        info.Password = hashPass
        const user = await User.create(info)
        res.status(200).send(user)
    }
}

// get all users
const getUsers = async (req, res) => {
    let users = await User.findAll({})
    res.status(200).send(users)
}

// get user by id
const getUserById = async (req, res) => {
    let id = req.params.id
    let user = await User.findOne({ where: { PKUserId: id } })
    res.status(200).send(user)

}

// update user
const updateUser = async (req, res) => {
    let id = req.params.id
    const user = await User.update(req.body, { where: { PKUserId: id } })
    res.status(200).send(user)
}

// delete user
const deleteUser = async (req, res) => {
    let id = req.params.id
    await User.destroy({ where: { PKUserId: id } })
    res.status(200).send("User is deleted")

}



module.exports = {
    authenticateUser,
    generateAuthToken,
    renewAccessToken,
    userSignIn,
    addUser,
    getUsers,
    getUserById,
    updateUser,
    deleteUser
}