import Joi from "joi"

export const schema = {
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
  },
  UPDATE: {
    params: Joi.object({
      id: Joi.string().required()
    }),
    body: Joi.object({
      name: Joi.string(),
      surname: Joi.string(),
      lastname: Joi.string(),
      cmp: Joi.string(),
      dni: Joi.string(),
      photo: Joi.string(),
      email: Joi.string(),
      locations: Joi.array(),
    })
  },
  GET_ONE: {
    params: Joi.object({
      id: Joi.string().required()
    }),
    body: Joi.object({
      name: Joi.string(),
      surname: Joi.string(),
      lastname: Joi.string(),
      cmp: Joi.string(),
      dni: Joi.string(),
      photo: Joi.string(),
      email: Joi.string(),
      locations: Joi.array(),
    })
  },
  DELETE: {
    params: Joi.object({
      id: Joi.string().required()
    }),
    body: Joi.object({
      name: Joi.string(),
      surname: Joi.string(),
      lastname: Joi.string(),
      cmp: Joi.string(),
      dni: Joi.string(),
      photo: Joi.string(),
      email: Joi.string(),
      locations: Joi.array(),
    })
  },
  PAGINATION: {
    params: Joi.object({
      page: Joi.number().required()
    })
  }
}