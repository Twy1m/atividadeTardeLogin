const Cliente = require("./Cliente")
const Drone = require("./Drone")
const Agendamento = require("./Agendamento")

Cliente.hasMany(Drone, {
    foreignKey: "idCliente",
    as: "DroneCliente",
    onDelete: "CASCADE"
})
Drone.belongsTo(Cliente, {
    foreignKey: "idCliente",
    as: "clienteDrone"
})

Cliente.hasMany(Agendamento, {
    foreignKey: "idCliente",
    as: "agendamentoCliente",
    onDelete: "CASCADE"
})
Agendamento.belongsTo(Cliente, {
    foreignKey: "idCliente",
    as: "clienteAgendamento"
})

Drone.hasMany(Agendamento, {
    foreignKey: "idDrone",
    as: "agendamentoDrone",
    onDelete: "CASCADE"
})
Agendamento.belongsTo(Drone, {
    foreignKey: "idDrone",
    as: "Drone"
})

module.exports = { Cliente, Drone, Agendamento }
