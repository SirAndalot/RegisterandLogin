const Joi = require('joi');

const CreateNewUser = Joi.object()
.keyd({
    name : Joi.string(),
    email: Joi.string().email().required(),
    password: Joi.string().password().required(),
    phone: Joi.number(),
})
.options({ abortEarly : false})

module.exports = { CreateNewUser};