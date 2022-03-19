const bcrypt = require('bcryptjs');
var randomize = require('randomatic');
const Otp = require('../../models').otp
const Customer = require('../../models').customer
const Subscription = require('../../models').subscription
const Package = require('../../models').package
const User = require('../../models').user
var twilio = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN)

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
        const package = await Package.findOne({ where: { PKPackageId: info.FKPackageId, FKUserId: user_id, IsDeleted: false } })
        if (!package) {
            res.status(404).send("Invalid Package Selected")
        }

        const customerInfo = await Customer.findOne({
            where: { PhoneNumber: info.PhoneNumber, IsDeleted: false }
        })
        if (!customerInfo) {
            res.status(404).send("Customer not exists")
        }
        else {
            let otpCode = randomize('Aa0', 8)

            twilio.messages.create({
                from: "+18453181164",
                to: `+92` + `${info.PhoneNumber}`,
                body: `${otpCode}`,
                message: "Your OTP code is"

            })
                .then((res) => (console.log("Message sent successfully!")))
                .catch((e) => (console.log(e)))

            const hashOtpCode = await bcrypt.hash(otpCode, 8)
            const otpExists = await Otp.findOne({
                where: { FKCustomerId: customerInfo.PKCustomerId }
            })
           
            if (!otpExists) {
                const otp = await Otp.create({
                    FKCustomerId: customerInfo.PKCustomerId,
                    FKPackageId: info.FKPackageId,
                    OtpCode: hashOtpCode
                })
                res.status(200).send(otp)
            }
            
            else {
                const otp = await Otp.update({OtpCode: hashOtpCode},{where: {FKCustomerId: customerInfo.PKCustomerId}})
                res.status(200).send("otp updated successfully")
            }
        }
    } catch (e) {
        res.status(400).send(e.message);
    }
}

const verifySubscription = async (req, res) => {
    try {
        const info = {
            Otp: req.body.Otp,
            PhoneNumber: req.body.PhoneNumber,
            FKPackageId: req.body.FKPackageId
        }

        const customerInfo = await Customer.findOne({
            where: { PhoneNumber: info.PhoneNumber, IsDeleted: false }
        })
        console.log(info.FKPackageId)
        const otpHolder = await Otp.findOne({
            where: {
                FKCustomerID: customerInfo.PKCustomerId,
                FKPackageID: info.FKPackageId

            }
        })

        Date.prototype.addHours= function(h){
            this.setHours(this.getHours()+h);
            return this;
        }

        // console.log(otpHolder.updatedAt.addHours(1))
        console.log(otpHolder.updatedAt)
        console.log(new Date())
        console.log(new Date().getTime())
        if((otpHolder.updatedAt.addHours(1).getTime()) < new Date().getTime()){
            return res.status(400).send("otp has expired")
            // console.log("OTP has expired")
        }
        if (otpHolder) {
            let checkOtp = await bcrypt.compare(info.Otp, otpHolder.OtpCode)
            if (!checkOtp) {
                res.status(400).json({ error: "Invalid Otp" })
            }
            let subscriptionDetails = {
                FKCustomerId: customerInfo.PKCustomerId,
                FKPackageId: info.FKPackageId,
            }
            const subscriptionExists = await Subscription.findOne({
                where: {
                    FKCustomerID: subscriptionDetails.FKCustomerId,
                    FKPackageID: subscriptionDetails.FKPackageId
    
                }
            })
            if(subscriptionExists){
                res.status(400).json({ error: "Subscription already exists" })
            }
            else {
                const subscription = await Subscription.create(subscriptionDetails)
                res.status(200).send(subscription) //end wale mai return nahi lagate try kai end block mai
            }

        }
    } catch (e) {
        res.status(400).send(e.message);//end wale mai return nahi lagate catch kai end block mai
    }
}

module.exports = {
    sendOtp,
    verifySubscription
}