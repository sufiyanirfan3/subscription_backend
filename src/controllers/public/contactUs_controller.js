const ContactUs = require("../../models").contactUs;


// add contact form
const contactUs = async (req, res) => {
    try {       
            let info = {
                Name: req.body.Name,
                Email: req.body.Email,
                PhoneNumber: req.body.PhoneNumber,
                Message: req.body.Message
            }
            
            const contactUs = await ContactUs.create(info)
            res.status(200).send(contactUs)
        
    } catch (e) {
        res.status(400).send(e.message);
    }
}

module.exports = {
    contactUs
}
