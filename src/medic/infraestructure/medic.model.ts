import mongoose, { Schema } from 'mongoose'
import { Medic } from '../domain/entities/medic.entity'

const schema:Schema = new Schema ({
  name: {
    type: String,
    required: true,
    trim: true
  },
  surname: {
    type: String,
    required: true,
    trim: true
  },
  lastname: {
    type: String,
    required: true,
    trim: true
  },
  cmp: {
    type: String,
    required: true,
    trim: true
  },
  dni: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    email: true,
    unique: true
  },
  isActive: {
    type: Boolean,
    default: true
  },
  locations: {
    type: [{type: String}]
  }
})

export default mongoose.model("Medics", schema )