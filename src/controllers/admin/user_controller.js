const bcrypt = require('bcryptjs')
const User = require('../../models').user
const jwt = require("jsonwebtoken");
const Session = require('../../models').session
const Customer = require('../../models').customer
const Subscription = require('../../models').subscription
const Package = require('../../models').package

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
    try {
        let username = req.body.Username

        const user = await User.findOne({ where: { Username: username } })
        console.log(username)
        if (user) {

            let checkPass = await bcrypt.compare(req.body.Password, user.Password)

            if (checkPass) {
                const tokens = await generateAuthToken(user.PKUserId);
                const refreshToken = tokens.refreshToken;
                const session = await Session.build({
                    FKUserId: user.PKUserId,
                    RefreshToken: refreshToken
                });
                await session.save();
                res.status(200).json({ message: "Login Succesful", tokens: tokens });
            }
            else {
                res.send({ message: "Your password is incorrect" }).status(403)
            }


        }
        else {
            res.send({ message: "No user is registered with this username" }).status(403)
        }
    } catch (e) {
        res.status(400).send(e.message);
    }
}

// add user
const addUser = async (req, res) => {
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
                CNIC: req.body.CNIC
            }

            const hashPass = await bcrypt.hash(info.Password, 8)
            info.Password = hashPass
            const user = await User.create(info)
            res.status(200).send(user)
        }
    } catch (e) {
        res.status(400).send(e.message);
    }
}

// get all users
const getUsers = async (req, res) => {
    try {
        let users = await User.findAll({ where: { IsDeleted: false } })
        res.status(200).send(users)
    } catch (e) {
        res.status(400).send(e.message);
    }
}

// get user by id
const getUserById = async (req, res) => {
    try {
        let id = req.params.id
        let user = await User.findOne({ where: { PKUserId: id, IsDeleted: false } })
        res.status(200).send(user)
    } catch (e) {
        res.status(400).send(e.message);
    }

}

// update user
const updateProfile = async (req, res) => {
    try {
        let id = req.params.id
        if (req.body.Username || req.body.Email || req.body.Password) {
            delete (req.body.Username)
            delete (req.body.Email)
            delete (req.body.Password)
        }
        const user = await User.update(req.body, { where: { PKUserId: id, IsDeleted: false } })
        res.status(200).send("Profile updated successfully")
    } catch (e) {
        res.status(400).send(e.message);
    }
}

// suspend user
const suspendUser = async (req, res) => {
    try {
        let id = req.params.id

        const suspendUser = await User.update(
            { IsSuspended: true, SuspendedDate: Date.now() },
            { where: { PKUserId: id, IsSuspended: false } }
        );
        res.status(200).json("User suspended successfully")
    } catch (e) {
        res.status(400).send(e.message)
    }


}

// temporary suspend user
const temporarySuspendUser = async (req, res) => {
    try {
        let id = req.params.id

        const temporarySuspendUser = await User.update(
            { IsTemporarySuspended: true, TemporarySuspendedDate: Date.now() },
            { where: { PKUserId: id, IsTemporarySuspended: false } }
        );
        res.status(200).json("User temporary suspended successfully")
    } catch (e) {
        res.status(400).send(e.message)
    }



}

// delete user
const deleteUser = async (req, res) => {
    try {
        let id = req.params.id

        const deleteUser = await User.update(
            { IsDeleted: true, DeletedDate: Date.now() },
            { where: { PKUserId: id, IsDeleted: false } }
        );
        res.status(200).json("User deleted successfully")
    } catch (e) {
        res.status(400).send(e.message)
    }



}

const changePassword = async (req, res) => {
    try {
        let x = true;
        const userId = req.body.PKUserId;
        const user = await Admin.findOne({ where: { PKUserId: userId, IsDeleted: false } })
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

        const passwordMatches = await bcrypt.compare(oldPassword, user.Password);
        if (!passwordMatches) {
            x = false;
            res.status(400).send("Old password is incorrect")
        }

        const samePassword = await bcrypt.compare(newPassword, user.Password);
        if (samePassword) {
            x = false;
            res.status(400).send("Old password cannot be same as new password")
        }

        if (x) {
            user.Password = await bcrypt.hash(newPassword, 8);
            await user.save();
            res.status(200).send("Password is changed successfully")
        }
    } catch (e) {
        res.status(400).send(e.message);
    }
}

//Logout
const logout = async (req, res) => {
    try {
        const refreshToken = await req.body.refreshToken;
        const decodedToken = jwt.verify(refreshToken, process.env.REFRESH_TOKEN);
        const session = await Session.findOne({
            where: {
                RefreshToken: refreshToken,
                FKUserId: decodedToken.PKUserId
            }
        });
        if (!session) {
            res.status(400).send("Invalid Refresh Token");
        }
        await session.destroy();
        res.status(200).send("Successfully logged out ");
    } catch (e) {
        res.status(400).send(e.message);
    }
}

//get packages which that user has created
const userPackages = async (req, res) => {
    try {
        const user = await req.user;
        let id = user.PKUserId
        let userPackages = await Package.findAll({
            where: { FKUserId: id, IsDeleted: false },
        })
        res.status(200).send(userPackages)
    } catch (e) {
        res.status(400).send(e.message);
    }
}

//get package by id which that user has created
const userPackageById = async (req, res) => {
    try {
        const user = await req.user;
        let id = user.PKUserId
        let packageId = req.params.id
        let userPackageById = await Package.findAll({
            where: { PKPackageId: packageId, FKUserId: id, IsDeleted: false },
        })
        res.status(200).send(userPackageById)
    } catch (e) {
        res.status(400).send(e.message);
    }
}

//get all subscriptions of that user packages
const subscriptionsOfPackages = async (req, res) => {
    try {
        const user = await req.user;
        let id = user.PKUserId
        let subscriptionsOfPackages = await Package.findAll({
            where: { FKUserId: id, IsDeleted: false },
            attributes: [],
            include: [{
                model: Subscription,
                where: { IsDeleted: false },
            }]
        })
        res.status(200).send(subscriptionsOfPackages)
    } catch (e) {
        res.status(400).send(e.message);
    }
}

//get all subscriptions of that user packages by package id
const subscriptionByPackageId = async (req, res) => {
    try {
        const user = await req.user;
        let id = user.PKUserId
        let packageId = req.params.id
        let subscriptionByPackageId = await Package.findAll({
            where: { PKPackageId: packageId, FKUserId: id, IsDeleted: false },
            attributes: [],
            include: [{
                model: Subscription,
                where: { IsDeleted: false },
            }]
        })
        res.status(200).send(subscriptionByPackageId)
    } catch (e) {
        res.status(400).send(e.message);
    }
}

const customerBySubscriptionId = async (req, res) => {
    try {
        const user = await req.user;
        let id = user.PKUserId
        let subscriptionId = req.params.id
        let customerBySubscriptionId = await Package.findAll({
            where: { FKUserId: id, IsDeleted: false },
            attributes: [],
            include: [{
                model: Subscription,
                where: { PKSubscriptionId: subscriptionId, IsDeleted: false },
                attributes: ["FKCustomerId"],
                include: [{
                    model: Customer,
                    where: { IsDeleted: false },
                }]
            }],

        })
        res.status(200).send(customerBySubscriptionId)
    } catch (e) {
        res.status(400).send(e.message);
    }
}

const packageBySubscriptionId = async (req, res) => {
    try {
        const user = await req.user;
        let id = user.PKUserId
        let subscriptionId = req.params.id
        let packageBySubscriptionId = await Subscription.findAll({
            where: { PKSubscriptionId: subscriptionId, IsDeleted: false },
            attributes: [],
            include: [{
                model: Package,
                where: { FKUserId: id, IsDeleted: false }
            }],
        })
        res.status(200).send(packageBySubscriptionId)
    } catch (e) {
        res.status(400).send(e.message);
    }
}
module.exports = {
    authenticateUser,
    generateAuthToken,
    renewAccessToken,
    userSignIn,
    addUser,
    getUsers,
    getUserById,
    updateProfile,
    suspendUser,
    temporarySuspendUser,
    deleteUser,
    changePassword,
    logout,
    userPackages,
    userPackageById,
    subscriptionsOfPackages,
    subscriptionByPackageId,
    customerBySubscriptionId,
    packageBySubscriptionId

}