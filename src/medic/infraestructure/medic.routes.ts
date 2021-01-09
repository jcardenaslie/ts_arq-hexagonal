import { schema as MedicSchema } from './medic.schema';
import express from "express";
import { MedicOperation } from "./medic.operation";
import { MedicUseCase } from "../application/medic.usecase";
import { MedicController } from "./medic.controller";
import { Medic } from "../domain/entities/medic.entity";
import SchemaValidator from "../../validators/schema.validator";


const medicOperation = new MedicOperation();
const medicUseCase = new MedicUseCase(medicOperation);
const medicController = new MedicController(medicUseCase);

const router = express.Router();

router.get("/", async (req, res) => {
  const result = await medicController.getAll(true);
  res.json(result);
});

router.get("/:id", 
  SchemaValidator.validate(MedicSchema.GET_ONE), 
  async (req, res) => {
    const id = req.params.id
    const result = await medicController.getOne(id);
    res.json(result);
  }
);

router.post("/", 
	SchemaValidator.validate(MedicSchema.POST_INSERT), 
	async (req, res) => {
		const  {name, surname, lastname, cmp, dni, email, photo, locations} = req.body
		const medic: Medic = {
			name,
			surname,
			lastname,
			cmp,
			dni,
			email,
			photo,
			isActive: true,
			locations,
		};
		const result = await medicController.insert(medic);
		res.json(result);
});

router.put("/:id", 
  SchemaValidator.validate(MedicSchema.UPDATE),
  async (req, res) => {
    const medic: Medic = {
      name: "Sergio",
      surname: "Iván",
      lastname: "Hidalgo",
      cmp: "12345",
      dni: "12345678",
      email: "sergiohidalgocaceres@gmail.com",
      photo: "sergio.jpg",
      isActive: true,
      locations: ["LIMA", "TRUJILLO"],
    };
    const result = await medicController.update(1, medic);
    res.json(result);
});

router.delete("/:id", 
SchemaValidator.validate(MedicSchema.DELETE), 
  async (req, res) => {
    const result = await medicController.delete(1);
    res.json(result);
  }
);

router.get("/page/:page", 
  SchemaValidator.validate(MedicSchema.PAGINATION), 
  async (req, res)=> {
    const page = +req.params.page
    const results = await medicController.getPage(page);
    res.json({status: 200, results})
  }
)

export { router };
