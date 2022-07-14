// Checklist da Empresa
function checklistCarro (){
    let liberacaoCarro = 0
    const placa = document.checklist.placa.value
    const modelo = document.checklist.modelo.value
    const ano = document.checklist.ano.value
    const km = document.checklist.km.value
    const nome = document.checklist.nome.value
    const matricula = document.checklist.mat.value
  

    if(placa === ""){
        return alert("Digite a placa do carro")
    }

    if(km ===""){
        return alert ("Digite a quilometragem do carro")
    }

    if(nome === ""){
        return alert ("Digite seu nome")
    }
    
    if(matricula === ""){
        return alert ("Digite sua matrícula")
    }

    if (document.checklist.bom.checked) {
        liberacaoCarro = liberacaoCarro + 1
        // AcionarLider.SMS ()
        } else {
            return alert ('O carro não pode ser liberado até que os pneus estejam em bom estado. O chefe será informado.')
        }

    if (document.checklist.funf.checked) {
        liberacaoCarro = liberacaoCarro + 1
        // AcionarLider.SMS ()
     } else{
        return alert ('O carro não pode ser liberado até que os fárois estejam funcionando. O chefe será informado.')
     }

    if (document.checklist.cheio.checked) {
        return alert ('O carro está liberado. A portaria será informada')
        // Portaria.autorizar()
    } else{
        return alert ("Encha o tanque antes de liberar o carro")
    }
	if (liberacaoCarro === 2) {
        return alert ('O carro está liberado. A portaria será informada')
       
         }
           
}





    




