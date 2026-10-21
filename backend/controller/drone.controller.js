const Drone = require("../models/Drone")
const Cliente = require("../models/Cliente")
const cryptoJs= require('crypto-js')

const cadastrar = async (req, res) => {
    const { modelo, marca, numeroSerie, tipo, idCliente } = req.body
    if (!modelo || !marca || !numeroSerie || !tipo) return res.status(401).json({ message: "preencha todos os campos para cadastrar" })

    try {
        const cliente = await Cliente.findByPk(idCliente)
        if (!cliente) return res.status(404).json({ message: "cliente inexistente" })

        const numCrypto = cryptoJs.AES.encrypt(numeroSerie, "segredo").toString()

        const drone = await Drone.create({
            modelo,
            marca,
            numeroSerie: numCrypto,
            tipo,
            idCliente
        })

        return res.status(201).json(drone)
    } catch (error) {
        console.error(error)
        return res.status(500).json({ message: "erro ao cadastrar veículo" })
    }
}

const listar = async (req, res) => {
    try {
        const drones = await Drone.findAll()
        drones.forEach(el => {
            el.numeroSerie = cryptoJs.AES.decrypt(el.numeroSerie, "segredo").toString(cryptoJs.enc.Utf8)
            drones[el] = {
                ...drones,
                numeroSerie: el.numeroSerie
            }
        });
        return res.status(200).json(drones)
    } catch (error) {
        console.error(error)
        return res.status(500).json({ message: "erro ao listar drones" })
    }
}

module.exports = { cadastrar, listar }