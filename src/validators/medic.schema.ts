import Joi from "joi"
import joi from "joi"

const schema = {
  POST_INSERT: {
    body: Joi.object({
      name: Joi.string().required(),
      surname: Joi.string().required(),
      lastname: Joi.string().required(),
      cmp: Joi.string().required(),
      dni: Joi.string().required(),
      photo: Joi.string().required(),
      email: Joi.string().email().required(),
      locations: Joi.array().required(),
    })
  }
}