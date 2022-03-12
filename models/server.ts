import cors from "cors";
import express, { Application } from "express";
import userRouter from "../routes/user";
import db from "../bd/connection";
class Server {
    private app: Application;
    private port: string;
    private apiPaths = {
        apiUsers: "/api/users",
    };

    constructor() {
        this.app = express();
        this.port = process.env.PORT || "8000";

        this.connectDB();
        this.middlewares();
        this.routes();
    }

    async connectDB() {
        try {
            await db.authenticate();
            console.log("database online");
        } catch (error) {
            console.log(error);
            throw new Error("Error en la conexion de la base de datos");
        }
    }

    middlewares() {
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.static("public"));
    }

    routes() {
        this.app.use(this.apiPaths.apiUsers, userRouter);
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server corriendo en el puerto! ${this.port}`);
        });
    }
}

export default Server;
