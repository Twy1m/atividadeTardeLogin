const express = require("express")
const cors = require("cors")

const app = express()

require('./models/rel')

const authMiddleware = require("./middleware/auth.middleware")
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())

// rotas
const authController = require("./controller/auth.controller")
const clienteController = require("./controller/cliente.controller")
const droneController = require("./controller/drone.controller")
const agendamentoController = require("./controller/agendamento.controller")

app.get("/", (req, res) => res.status(200).json({ message: "aplicação rodando" }))

// rotas públicas
app.post("/login", authController.login)
app.post("/cliente", clienteController.cadastrar)

// rotas privadas
app.use(authMiddleware)

// cliente
app.get("/cliente/:id", clienteController.consultarId)
app.get("/clientes", clienteController.listar)
app.patch("/cliente/:id", clienteController.atualizar)
app.delete("/cliente/:id", clienteController.deletar)

// drone
app.post("/drone", droneController.cadastrar)
app.get("/drones", droneController.listar)

// agendamento
app.post("/agendamento", agendamentoController.cadastrar)
app.get("/agendamentos", agendamentoController.listar)

// server
const port = 3000,
    host = "localhost"

app.listen(port, host, () => {
    console.log(`Servidor rodando em http://${host}:${port}`)
})
