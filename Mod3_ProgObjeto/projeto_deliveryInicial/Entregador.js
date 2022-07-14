// const dadosPessoais = require("./Utils");
 //const Lojista = require("./Lojista");


class Entregador{
    // lista de pedidos e selecionar pedidio pra entregar
    constructor(CPF_CNPJ,nome,telefone,listaPedidosConfirmados=[],listaEntrega=[]){
        this.CPF_CNPJ=CPF_CNPJ
        this.nome=nome
        this.telefone=telefone
        this.listaPedidosConfirmados=listaPedidosConfirmados
        this.listaEntrega=listaEntrega
    }

    adicionarPedidosConfirmados(pedido){
        
        
        this.listaPedidosConfirmados.push(pedido)
    }

    mostrarListaPedidosConfirmados(){
        console.log (`Lista de pedidos de ${this.nome}`)
        console.log(JSON.stringify(this.listaPedidosConfirmados,null,2))
       
    }

    escolherPedido(id){
        for (var i = 0; i < this.listaPedidosConfirmados.length; i++) {
               if( id === this.listaPedidosConfirmados[i].ID){
                   const nomeProduto=this.listaPedidosConfirmados[i].produto
                   const quantidade=this.listaPedidosConfirmados[i].quantidade
                   const x = new pedidoEntregue (nomeProduto,quantidade)
                   this.listaEntrega.push(x)
               }
        }
        console.log(`O pedido de ID ${id} que ${this.nome} entregará é`)
        console.log(this.listaEntrega)
    }
}


class pedidosParaEntregadores {
    constructor (ID,produto,quantidade){
        this.ID=ID
        this.produto=produto
        this.quantidade=quantidade
    }
}

class pedidoEntregue{
    constructor (produto,quantidade){
    this.produto=produto
    this.quantidade=quantidade
    }
}

module.exports = Entregador;
