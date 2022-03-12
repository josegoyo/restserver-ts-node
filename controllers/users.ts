import { Request, Response } from "express";
import User from "../models/user";

export const _GET = async (req: Request, res: Response) => {
    const users = await User.findAll({
        where: {
            status: true,
        },
    });

    res.json({
        msg: "GET users",
        users,
    });
};

export const _GET_BY_ID = async (req: Request, res: Response) => {
    const { id } = req.params;

    const user = await User.findByPk(id);

    if (!user) {
        return res.status(404).json({
            msg: `No existe el usuario con el id ${id}`,
        });
    }
    res.json({
        msg: "GET BY ID users",
        user,
    });
};

export const _POST = async (req: Request, res: Response) => {
    const { body } = req;
    try {
        //validate user email
        const existEmail = await User.findOne({
            where: {
                email: body.email,
            },
        });

        if (existEmail) {
            return res.status(400).json({
                msg: "Ya existe un usuario con el email enviado",
            });
        }

        const user = new User(body);
        await user.save();

        res.json({
            user,
        });
    } catch (error) {
        res.status(500).json({
            msg: "POST error users",
        });
    }
};

export const _PUT = async (req: Request, res: Response) => {
    const { body } = req;
    const { id } = req.params;

    try {
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(400).json({
                msg: `no existe un usuario con el id ${id}`,
            });
        }

        await user.update(body);

        res.json({
            user,
        });
    } catch (error) {
        res.status(500).json({
            msg: "PUT error users",
        });
    }
};

export const _DELETE = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(400).json({
                msg: `no existe un usuario con el id ${id}`,
            });
        }

        await user.update({ status: false });

        res.json({
            user,
        });
    } catch (error) {
        res.status(500).json({
            msg: "DELETE error users",
        });
    }
};
