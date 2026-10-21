const modelo = document.getElementById("inputModelo")
const marca = document.getElementById("inputMarca")
const numeroSerie = document.getElementById("inputNumeroSerie")
const tipo = document.getElementById("inputTipo")
const idCliente = document.getElementById("inputIdCliente")

const res = document.getElementById("res")

document.getElementById("formDrone").addEventListener("submit", async (event) => {
	event.preventDefault()

	try {
		const payload = {
			modelo: modelo.value,
			marca: marca.value,
			numeroSerie: numeroSerie.value,
			tipo: tipo.value,
			idCliente: idCliente.value,
		}

		// rota protegida
		const resposta = await fetch("http://localhost:3000/drone", {
			body: JSON.stringify(payload),
			headers: { "Content-Type": "application/json", authorization: localStorage.getItem("token") },
			method: "POST"
		})
		const dados = await resposta.json()
		console.log(dados)

		res.innerText = dados.message
		if (resposta.ok) res.innerText = "Cadastrado com sucesso"
	} catch (error) {
		res.innerText = error.message || "Erro ao cadastrar"
	}
})