const conn = require("../db/conn")
const { DataTypes } = require("sequelize")

const Agendamento = conn.define(
    "agendamento",
    {
        codAgendamento: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        data: {
            type: DataTypes.DATEONLY,
            allowNul: false
        },
        horario: {
            type: DataTypes.TIME,
            allowNul: false
        },
        tipo: {
            type: DataTypes.STRING,
            allowNul: false
        },
        idDrone: {
            type: DataTypes.INTEGER,
            references: {
                model: "drones",
                key: "codDrone"
            },
            allowNul: false
        },
        idCliente: {
            type: DataTypes.INTEGER,
            references: {
                model: "clientes",
                key: "codCliente"
            },
            allowNul: false
        }
    },
    {
        timestamps: false,
        tableName: "agendamentos"
    }
)

module.exports = Agendamento
