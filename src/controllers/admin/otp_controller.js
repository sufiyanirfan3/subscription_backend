const bcrypt = require('bcryptjs');
var randomize = require('randomatic');
const Otp = require('../../models').otp
const Customer = require('../../models').customer
const Subscription = require('../../models').subscription
const Package = require('../../models').package

// send otp
const sendOtp = async (req, res) => {
    try {
        const user = await req.user;
        let user_id = user.PKUserId
        const info = {
            PhoneNumber: req.body.PhoneNumber,
            FKPackageId: req.body.FKPackageId

        }
        console.log(info.PhoneNumber)
        const customerInfo = await Customer.findOne({
            where: { PhoneNumber: info.PhoneNumber, IsDeleted: false }
        })
        if (!customerInfo) {
            res.status(404).send("Customer not exists")
        }
        else {
            let otpCode = randomize('Aa0', 8)
            res.status(200).send(otpCode)
            const hashOtpCode = await bcrypt.hash(otpCode, 8)
            const otp = await Otp.create({
                FKCustomerId: customerInfo.PKCustomerId,
                FKPackageId: info.FKPackageId,
                OtpCode: hashOtpCode
            })
            res.status(200).send(otp)
        }
    } catch (e) {
        res.status(400).send(e.message);
    }
}

module.exports = {
    sendOtp
}