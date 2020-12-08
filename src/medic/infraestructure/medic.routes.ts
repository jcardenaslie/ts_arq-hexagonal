import express from "express";
import { MedicOperation } from "./medic.operation";
import { MedicUseCase } from "../application/medic.usecase";
import { MedicController } from "./medic.controller";
import { Medic } from "../domain/entities/medic.entity";

const medicOperation = new MedicOperation();
const medicUseCase = new MedicUseCase(medicOperation);
const medicController = new MedicController(medicUseCase);

const router = express.Router();

router.get("/", async (req, res) => {
  const result = await medicController.getAll(true);
  res.json(result);
});

router.get("/:id", async (req, res) => {
  const id = req.params.id
  const result = await medicController.getOne(id);
  res.json(result);
});

router.post("/", async (req, res) => {

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

router.put("/:id", async (req, res) => {
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

router.delete("/:id", async (req, res) => {
  const result = await medicController.delete(1);
  res.json(result);
});

export { router };
