const axios = require("axios")

const getInputData = (qualGET) => {
    const urlHTML = checarURL(qualGET)

    axios({
        method: "get",
        baseURL: "http://localhost:3000",
        url: urlHTML,
    })
        .then(res => {
            console.log(res)

            let div = document.createElement('div')
            document.getElementById("listaDeFilmes").innerHTML = ""

            for (let index = 0; index < res.data.length; index++) {
                const { id, poster_capa, genero, titulo, ano, diretor_autor } = res.data[index]

                div.innerHTML += `<div class="cartazes"> <span class="tituloNoCartaz">${id}. ${titulo}</span><br/>
                <img src=${poster_capa} alt=imagem ${titulo} width="200vw" height="300vw" /><br/>
                <ul class="infoNoCartaz">
                    <li>Gênero: ${genero}</li>
                    <li>Ano: ${ano}</li>
                    <li>Diretor/Autor: ${diretor_autor}</li>
                </ul>
                </div>
                `
                document.getElementById("listaDeFilmes").appendChild(div)
                div = document.createElement('div')
            }
        })
}


const limparInputs = () => {
    document.getElementById('titulo').value = ""
    document.getElementById('genero').value = ""
    document.getElementById('ano').value = ""
    document.getElementById('diretor_autor').value = ""
    document.getElementById('poster_capa').value = ""
    document.getElementById('id').value = ""
}

const checarURL = (qualURL) => {
    switch (qualURL) {
        case 1:
            return ("/filmes")
            break;
        case 2:
            return ("/series")
            break;
        case 3:
            return ("/musicas")
    }
}

const postInputData = () => {


    const inputList = document.getElementsByName('inputs')
    const obj = {}
    inputList.forEach(el => {
        const { id, value } = el
        obj[id] = value || ""
    })

    //limpando inputs
    limparInputs()

    //adquirindo url
    const urlHTML = document.getElementById('selectTipoDeArte').value
    console.log(urlHTML)

    // post request
    axios({
        method: "post",
        baseURL: "http://localhost:3000",
        url: urlHTML,
        data: JSON.stringify(obj)
    })


}

const putIntoData = () => {
    // getting form data from DOM
    const inputList = document.getElementsByName('inputs')
    const obj = {}
    inputList.forEach(el => {
        const { id, value } = el
        obj[id] = value || ""
    })

    //limpando inputs
    limparInputs()

    //adquirindo url
    const urlHTML = document.getElementById('selectTipoDeArte').value
    console.log(urlHTML)

    // post request
    axios({
        method: "put",
        baseURL: "http://localhost:3000",
        url: urlHTML,
        data: JSON.stringify(obj),

    })


}
const deleteData = () => {
    const id = document.getElementById('id').value
    const urlHTML = document.getElementById('selectTipoDeArte').value

    limparInputs()

    axios({
        method: "delete",
        baseURL: "http://localhost:3000",
        url: urlHTML,
        data: JSON.stringify(id)
    })
}

