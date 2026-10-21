const Agendamento = require("../models/Agendamento")
const Cliente = require("../models/Cliente")
const Drone = require("../models/Drone")

const cadastrar = async (req, res) => {
    const { data, horario, idDrone, idCliente } = req.body

    try {
        const drone = await Drone.findByPk(idDrone)
        const cliente = await Cliente.findByPk(idCliente)

        if (!drone) return res.status(404).json({ message: "veículo inexistente" })
        if (!cliente) return res.status(404).json({ message: "cliente inexistente" })

        if (await Agendamento.findOne({ where: { data: data, horario: horario } })) {
            return res.status(409).json({ message: "data e horário já marcados" })
        }

        const agendamento = await Agendamento.create({ data, horario, idCliente, idDrone })
        res.status(201).json(agendamento)
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "erro ao cadastrar" })
    }
}

const listar = async (req, res) => {
    try {
        const agendamentos = await Agendamento.findAll({
            order: [
                ["data", "ASC"],
                ["horario", "ASC"]
            ]
        })
        return res.status(200).json(agendamentos)
    } catch (error) {
        console.error(error)
        return res.status(500).json({ message: "erro ao listar agendamentos" })
    }
}

module.exports = { cadastrar, listar }
