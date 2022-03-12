import { DataTypes } from "sequelize";
import db from "../bd/connection";

const User = db.define("user", {
    fullname: DataTypes.STRING,
    email: DataTypes.STRING,
    status: DataTypes.BOOLEAN,
});

export default User;
