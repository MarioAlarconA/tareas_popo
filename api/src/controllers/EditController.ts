import { Request, Response } from "express";
import { HomeworkModel } from "../models/HomeworksModel";
import mongoose from "mongoose";

export const updateHomework = async (req: Request, res: Response): Promise<void> => {
  try {
    const { _id, title, description, date } = req.body;

    if (!_id) {
      res.status(400).json({ msg: "El ID de la tarea es obligatorio" });
      return;
    }

    if (!mongoose.Types.ObjectId.isValid(_id)) {
      res.status(400).json({ msg: "El ID proporcionado no es válido" });
      return;
    }

    if (!title && !description && !date) {
      res.status(400).json({
        msg: "Debes proporcionar al menos uno de los campos: título, descripción o fecha",
      });
      return;
    }

    const homework = await HomeworkModel.findById(_id);

    if (!homework) {
      res.status(404).json({ msg: "No se encontró ninguna tarea con ese ID" });
      return;
    }

    if (title) homework.title = title;
    if (description) homework.description = description;
    if (date) homework.date = date;

    await homework.save();

    res.status(200).json({ msg: "Tarea actualizada con éxito", homework });
  } catch (error) {
    console.error("Error al actualizar tarea:", error);
    res.status(500).json({ msg: "Hubo un error al intentar actualizar la tarea" });
  }
};
