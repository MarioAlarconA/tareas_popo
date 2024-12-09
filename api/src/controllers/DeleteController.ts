import { Request, Response } from "express";
import { HomeworkModel } from "../models/HomeworksModel";

export const deleteHw = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params
        if (!id) {
            res.status(400).json({ msg: "No se encontro la tarea" });
            return
        }

        const deletedHomework = await HomeworkModel.findByIdAndDelete(id)

        res.status(200).json({ msg: "Tarea eliminada con éxito", deletedHomework })
    } catch (error) {
        console.error("Error al eliminar tarea:", error)
        res.status(500).json({ msg: "Hubo un error al eliminar la tarea" })
    }
}