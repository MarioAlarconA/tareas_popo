import { Request, Response } from "express";
import { IHomework } from "../GlobalTypes";
import { HomeworkModel } from "../models/HomeworksModel";
import { UserModel } from "../models/UsersModel";

export const createHw = async (req: Request, res: Response): Promise<void> => {
    try {
        const body = req.body

        if (!body.userId || !body.homeworks || !Array.isArray(body.homeworks)) {
            res.status(400).json({ msg: "Faltan datos we" })
            return
        }

        const invalidHomeworks = body.homeworks.some((hw: IHomework) => 
            !hw.title || !hw.description || !hw.date
        )

        if (invalidHomeworks) {
            res.status(400).json({ msg: "Algunas tareas tienen datos incompletos" })
            return
        }

        const homeworks = body.homeworks.map((hw: IHomework) => ({
            ...hw,
            userId: body.userId,
        }))

        await HomeworkModel.insertMany(homeworks)

        res.status(200).json({ msg: "Tareas creadas con éxito",  })
    } catch (error) {
        console.error("Error al crear tareas:", error);
        res.status(500).json({ msg: "Hubo un error al crear las tareas" })
    }
}

export const getMetrics = async (req: Request, res: Response): Promise<void> => {
    try {
        const NumUsers = await UserModel.countDocuments({ rol: "client" })
        const NumHomeworks = await HomeworkModel.countDocuments()

        res.status(200).json({ 
            msg: "Datos obtenidos con éxito", 
            NumHomeworks, 
            NumUsers 
        });
    } catch (error) {
        console.error("Error al obtener métricas:", error)
        res.status(500).json({ msg: "Hubo un error al obtener las métricas" })
    }
}

export const getHomeworks = async (req: Request, res: Response): Promise<void> => {
    try {
        const homeworks = await HomeworkModel.find()
        res.status(200).json({ 
            msg: "Tareas obtenidas con éxito", 
            homeworks 
        });
    } catch (error) {
        console.error("Error al obtener tareas:", error)
        res.status(500).json({ msg: "Hubo un error al obtener las tareas" })
    }
}

export const deleteHomework = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params
        const deletedHomework = await HomeworkModel.findByIdAndDelete(id)
        if (!deletedHomework) {
            res.status(404).json({ msg: "Tarea no encontrada" });
            return;
        }
        res.status(200).json({ msg: "Tarea eliminada con éxito" })
    } catch (error) {
        console.error("Error al eliminar tarea:", error)
        res.status(500).json({ msg: "Hubo un error al eliminar la tarea" });
    }
}




