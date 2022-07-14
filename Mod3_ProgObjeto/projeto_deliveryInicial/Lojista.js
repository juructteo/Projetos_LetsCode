const dadosPessoais = require("./Utils");
// const pedidosParaEntregadores = require("./Entregador");
// const Cliente = require("./Cliente");

class Lojista {
    //pode manipular o cardápio (class Cardapio)
    //lista de pedidos pro restaurante

    constructor(CPF_CNPJ, telefone,senha, restaurante, endereco,cardapio=[],pedidoCliente=[]){
        this.CPF_CNPJ=CPF_CNPJ
        this.telefone=telefone
        this.senha=senha
        this.restaurante=restaurante
        this.endereco=endereco
        this.cardapio=cardapio
        this.cardapio.push(this.restaurante)
        this.pedidoCliente=pedidoCliente
    }

    adicionarProduto (produto,preco){
        const xyz = new Produto (produto,preco)
        this.cardapio.push(xyz)
        console.log (`O produto ${xyz.produto} foi adicionado`)
    }

    mostrarCardapio(){
        console.log (`------------------\nO cardápio do restaurante ${this.restaurante} é `)
        console.log (this.cardapio)
    }

    removerProduto (produto){
        const posicao = this.cardapio.findIndex((item) => item.produto === produto);
        console.log (`O produto ${this.cardapio[posicao].produto} foi removido`)
        this.cardapio.splice(posicao, 1);
    }

    editarProduto(produto,categoria,alteracao){
        const posicao2 = this.cardapio.findIndex((item) => item.produto === produto);

        if (posicao2 == -1){
            console.log("------------------\nEsse produto não existe.")
            return false
        } else {
            if (categoria == "nome"){this.cardapio[posicao2].produto=alteracao
            } else if (categoria == "preco"){this.cardapio[posicao2].preco=alteracao
            } else if (categoria == "descricao"){this.cardapio[posicao2].descricao=alteracao}
        }
 

        console.log (`O produto ${this.cardapio[posicao2].produto} foi alterado`)
    }

    adicionarPedido(pedidoC){
        const pedido = pedidoC.listaProd
        const pedidoID = pedido[1]
        for (let i=2;i < pedido.length; i++) {
            let produtoEscolhido = pedido[i].produto
            let quantidadeEscolhida = pedido[i].quantidade
            const x= new pedidosRecebidos (pedidoID,produtoEscolhido,quantidadeEscolhida)
            this.pedidoCliente.push(x)
        }

        console.log("pedidos do restaurante")
        console.log(this.pedidoCliente)
    }

    confirmarPedido (cliente /*Cliente*/, confirmacao,entregador){
        // console.log({cliente /*Cliente*/, confirmacao,entregador})
        console.log({pedidoCliente: this.pedidoCliente})
        // confirmarPedido (confirmacao,entregador){
        const pedidoAConfirmar = this.pedidoCliente.filter(pedido => pedido.idCliente === cliente && pedido.restaurante === this.CPF_CNPJ)       
        console.log("------------------\nO pedido recebido é")
        console.log(this.pedidoCliente)

        // if (confirmacao){
        if (confirmacao == true){
            console.log("O seu pedido foi confirmado pelo lojista")
            // entregador.adicionarPedidosConfirmados(this.pedidoCliente)
            entregador.adicionarPedidosConfirmados(pedidoAConfirmar)
            
        } else {
            console.log("O pedido foi cancelado pelo lojista")
        }
    }    

}


class Produto {
    static contador = 0
    constructor(produto, preco){
        this.produto=produto
        this.preco=preco
        this.id= ++Produto.contador
        // 
    }
}

class pedidosRecebidos{
    constructor (ID,produto,quantidade){
        this.ID=ID
        this.produto=produto
        this.quantidade=quantidade
    }
}
module.exports = Lojista;

