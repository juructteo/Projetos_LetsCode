const Entregador = require("./Entregador");
const Pedido = require("./Pedido");
class Cliente{
    // finalizar o pedido confirmando entrega
    //se pedido tiver entregador não pode ser cancelada (booleana)
    constructor(CPF_CNPJ, nome, telefone,senha, endereco,formaPgto,carrinho=[]){
        this.CPF_CNPJ=CPF_CNPJ
        this.telefone=telefone
        this.senha=senha
        this.nome=nome
        this.endereco=endereco
        this.formaPgto=formaPgto
        this.carrinho = carrinho
        this.carrinho.push(`Carrinho de ID:`)
        this.carrinho.push(`${this.CPF_CNPJ}`)
        this.pedido = null
        
    }

	verCardapio(restaurante) {
		restaurante.mostrarCardapio()
	}
    criarPedido(restaurante){
        this.pedido = new Pedido (this.CPF_CNPJ, restaurante)
    }
	
    adicionarProduto (restauranteCardapio,produto,quantidade){ 
        const posicao = restauranteCardapio.findIndex((item) => item.produto === produto);
        const precoUnitario = restauranteCardapio[posicao].preco
        const precoProdutos = restauranteCardapio[posicao].preco * quantidade
        
        const x= new produtosCarrinho (produto,quantidade,precoUnitario,precoProdutos)
        this.carrinho.push(x)
        console.log(`O produto ${restauranteCardapio[posicao].produto} foi adicionado ao seu carrinho.`)
        this.pedido.colocarProd(x)
        console.log(this.pedido)
    }

    removerProduto (produto){
        const posicao2 = this.carrinho.findIndex((item) => item.produto === produto);
        // this.carrinho = this.carrinho.filter(item => item.produto !== produto)
        console.log (`O produto ${this.carrinho[posicao2].produto} foi removido`)
        
        this.carrinho.splice(posicao2, 1); 
    }

    editarProduto(produto,quantidadeAlterada){
        const posicao3 = this.carrinho.findIndex((item) => item.produto === produto);

        if (posicao3 == -1){
            console.log("------------------\nEsse produto não existe.")
            return false
        } else {
            this.carrinho[posicao3].quantidade=quantidadeAlterada
        } 

        console.log (`A quantidade do produto ${this.carrinho[posicao3].produto} foi alterada para ${this.carrinho[posicao3].quantidade}`)
    }

    limparCarrinho(){
        this.carrinho = []
        this.carrinho.push(`Carrinho de ID:`)
        this.carrinho.push(`${this.CPF_CNPJ}`)
        console.log( "O carrinho está vazio")
    }

    visualizarPedido() {
        if (this.carrinho[2]===undefined){
            console.log (`O carrinho de ${this.nome} está vazio`)
        } else { 
        console.log (`--------------------`)
        console.log (`Pedido de ${this.nome}`)

        console.log(`Preço total a ser pago:R$${this.calcularPrecoTotal()}`)
        console.log (this.carrinho)
        }
    }

    calcularPrecoTotal(){
        let total = 0;
        for (var i = 2; i < this.carrinho.length; i++) {
               total = total + this.carrinho[i].precoProdutos;
        }
        // if (total != Number){
        //     total=0
        // }
        return total;
    }

	finalizarPedido(restaurante) {
		//Envia o pedido ao restaurante
		//se não tiver cartão cadastrado não permite pagamento no cartão
        // return restaurante.pedidoCliente.push(this.carrinho)
        // return restaurante.adicionarPedido(this.carrinho)
        console.log({xabalau: this.pedido})
        return restaurante.adicionarPedido(this.pedido)
	}

	cancelarPedido(id) {
		//Cancela o pedido com o Id
		//id deve existir
		//pedido não pode ter um entregador associado
        if (entregador.escolherPedido(id)!== id){
        this.carrinho = this.carrinho.filter(item => item.produto !== id)
        console.log('o pedido foi cancelado')
        this.limparCarrinho()
        }else {
            console.log('Pedido não pode ser cancelado')
        }
	}

    confirmarEntrega(confirmacao){
        if(confirmacao){
            console.log('Pedido entregue')
            this.limparCarrinho()
            const posicao = Lojista.pedidoCliente.findIndex((item) => item.id === this.CPF_CNPJ);
           
            console.log (`O produto ${Lojista.pedidoCliente[posicao].produto} foi entregue`)
            
           Lojista.pedidoCliente.splice(posicao, 1)
        } else{
            console.log('Pedido não foi entregue')
        }
    }
    // deve estar interligado com entregador e logista
		//Finaliza o pedido com o Id
		//id deve existir
	
}

class produtosCarrinho {
    static contador = 0
    constructor(produto, quantidade,precoUnitario,precoProdutos){
        this.produto=produto
        this.quantidade=quantidade
        this.precoUnitario=precoUnitario
        this.precoProdutos=precoProdutos
        this.id= ++produtosCarrinho.contador
        // 
    }
}

module.exports = Cliente;