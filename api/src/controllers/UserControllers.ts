import { Request, Response } from "express";
import { UserModel } from "../models/UsersModel";
import jwt from "jsonwebtoken";

export const registerUsers = async (req: Request, res: Response): Promise<void> => {
    try {
        const name = req.body.name
        const email = req.body.email
        const lastname = req.body.lastname
        const password = req.body.password
        const rol = req.body.rol

        if (req.user?.rol === "administrator" && rol === "client") {
            res.status(400).json({ msg: "Los administradores no pueden crear clientes" })
            return
        }
        if (!name || !email || !lastname || !password || !rol) {
            res.status(400).json({
                msg: "Faltan datos para crear un usuario"
            })
            return
        }
        if (rol === "administrator" && req.user?.rol != "administrator") {
            res.status(400).json({
                msg: "No puedes crear un nuevo administrador si no eres uno"
            })
            return
        }
        const user = await UserModel.create({
            name,
            lastname,
            email,
            password,
            rol
        })
        const token = jwt.sign(JSON.stringify(user), "holi");

        res.status(200).json({ msg: "Usuario registrado con exito!", token })
        return
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Hubo un error al crear el usuario" })
        return
    }
}


export const singIn = async (req: Request, res: Response): Promise<void> => {
    try {
        const user = await UserModel.findOne({ email: req.body.email, password: req.body.password })
        if (!user) {
            res.status(400).json({
                msg: "No existe el vato"
            })
            return;
        }
        const token = jwt.sign(JSON.stringify(user), "holi");
        res.status(200).json({ msg: "Sesion iniciada con exito", token, user })
        return;
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Hubo un error al iniciar sesion"
        })
        return
    }
}