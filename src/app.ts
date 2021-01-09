import express from "express";
import Errors from "./helpers/errors.helper"
import { router as RouterMedic } from "./medic/infraestructure/medic.routes";

const app = express();

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use("/medics", RouterMedic);

app.use(Errors.path)

export default app;
