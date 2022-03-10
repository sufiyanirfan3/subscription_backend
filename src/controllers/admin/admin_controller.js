const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken");
const Admin = require('../../models').admin
const Session = require('../../models').session

// Authenticate Admin
const authenticateAdmin = async (req, res, next) => {
    try {
        const count_admin = await Admin.count();
        if (count_admin == 0) {
            return next();
        }

        if (!req.header("Authorization")) {
            return res.status(400).send("Pass the tokens in headers");
        }
        const accessToken = req.header('authorization').split(" ")[1];
        const decodedToken = jwt.verify(accessToken, process.env.ACCESS_TOKEN);
        const PKAdminId = decodedToken.PKAdminId;
        const admin = await Admin.findOne({ where: { PKAdminId: PKAdminId } });
        req.accessToken = accessToken;
        req.admin = admin;
        next();

    } catch (e) {
        res.status(400).send(e.message)
    }
}
// Generate tokens
async function generateAuthToken(PKAdminId) {
    try {
        const refreshToken = jwt.sign(
            { PKAdminId: PKAdminId },
            process.env.REFRESH_TOKEN,
            {
                expiresIn: 86400
            }
        );

        const accessToken = jwt.sign(
            { PKAdminId: PKAdminId },
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
        const activeAdmin = await Session.findOne({ where: { RefreshToken: refreshToken } });

        if (!activeAdmin) {
            return res.status(400).send("Refresh Token is invalid or has expired");
        }

        const PKAdminId = parseInt(decodedToken.PKAdminId, 10);
        const admin = await Admin.findOne({ where: { PKAdminId: PKAdminId } });

        if (!admin) {
            res.status(400).send("Refresh Token is invalid or has expired");
        }

        const newAccessToken = jwt.sign({ PKAdminId: PKAdminId }, process.env.ACCESS_TOKEN, { expiresIn: 3600 });
        res.status(200).send({ newAccessToken: newAccessToken });
    } catch (e) {
        res.status(400).send(e.message);
    }
}

// Admin SignIn
const adminSignIn = async (req, res) => {
    try {
        let username = req.body.Username

        const admin = await Admin.findOne({ where: { Username: username } })

        if (admin) {

            let checkPass = await bcrypt.compare(req.body.Password, admin.Password)

            if (checkPass) {
                const tokens = await generateAuthToken(admin.PKAdminId);
                const refreshToken = tokens.refreshToken;
                const session = await Session.build({
                    FKUserId: admin.PKAdminId,
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
            res.send({ message: "No admin is registered with this username" }).status(403)
        }
    } catch (e) {
        res.status(400).send(e.message);
    }

}

// add admin
const addAdmin = async (req, res) => {
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

            }
            const hashPass = await bcrypt.hash(info.Password, 8)
            info.Password = hashPass
            const admin = await Admin.create(info)
            res.status(200).send(admin)
        }
    } catch (e) {
        res.status(400).send(e.message);
    }
}

// get all admins
const getAdmins = async (req, res) => {
    try {
        let admins = await Admin.findAll({ IsDeleted: false })
        res.status(200).send(admins)
    } catch (e) {
        res.status(400).send(e.message);
    }
}

// get admin by id
const getAdminById = async (req, res) => {
    try {
        let id = req.params.id
        let admin = await Admin.findOne({ where: { PKAdminId: id, IsDeleted: false } })
        res.status(200).send(admin)
    } catch (e) {
        res.status(400).send(e.message);
    }

}

// update admin
const updateProfile = async (req, res) => {
    try {
        let id = req.params.id
        if (req.body.Username || req.body.Email || req.body.Password) {
            delete (req.body.Username)
            delete (req.body.Email)
            delete (req.body.Password)
        }
        const admin = await Admin.update(req.body, { where: { PKAdminId: id, IsDeleted: false } })
        res.status(200).send("Profile updated successfully")
    } catch (e) {
        res.status(400).send(e.message);
    }
}

// delete admin
const deleteAdmin = async (req, res) => {
    try {
        let id = req.params.id

        const deleteAdmin = await User.update(
            { IsDeleted: true, DeletedDate: Date.now() },
            { where: { PKAdminId: id, IsDeleted: false } }
        );
        res.status(200).json("Admin deleted successfully")
    } catch (e) {
        res.status(400).send(e.message)
    }
}

// change password
const changePassword = async (req, res) => {
    try {
        let x = true;
        const adminId = req.body.PKAdminId;
        const admin = await Admin.findOne({ where: { PKAdminId: adminId , IsDeleted: false } })
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
    } catch (e) {
        res.status(400).send(e.message)
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
                FKUserId: decodedToken.PKAdminId
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

module.exports = {
    authenticateAdmin,
    generateAuthToken,
    renewAccessToken,
    adminSignIn,
    addAdmin,
    getAdmins,
    getAdminById,
    updateProfile,
    deleteAdmin,
    changePassword,
    logout
}
