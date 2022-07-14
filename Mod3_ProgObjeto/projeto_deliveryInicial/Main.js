const dadosPessoais = require("./Utils");
const Cliente = require("./Cliente");
const Lojista = require("./Lojista");
const pedidosParaEntregadores = require("./Entregador");
const Entregador = require("./Entregador");


// const asd=new dadosPessoais("123456","jessica","123456","123")
const jessica = new Cliente ("123456","jessica","123456","123",
"rua dos bobos N0","Cartão")
const julia = new Cliente ('252623','julia','2425899', 'jurubeba', 'avenida guadalupe,44', 'cartão de debito')

const florDoCampo=new Lojista(
    "123456","123456","123","Flor do Campo","rua dos bobos N0")

const mincho = new Entregador ("789456","Mincho","789456")

florDoCampo.adicionarProduto("arroz",5)
florDoCampo.adicionarProduto("feijão",3)
florDoCampo.adicionarProduto("batata frita",10)

florDoCampo.removerProduto("arroz")
florDoCampo.adicionarProduto("arroz",5)
florDoCampo.editarProduto("feijão","preco",7)

// florDoCampo.mostrarCardapio()

jessica.adicionarProduto(florDoCampo.cardapio,"arroz",2)
jessica.adicionarProduto(florDoCampo.cardapio,"feijão",7)
jessica.adicionarProduto(florDoCampo.cardapio,"batata frita",4)

// jessica.visualizarPedido()
jessica.removerProduto("arroz")
jessica.editarProduto("feijão",3)
jessica.limparCarrinho()

julia.criarPedido('123456')
jessica.adicionarProduto(florDoCampo.cardapio,"arroz",2)
jessica.adicionarProduto(florDoCampo.cardapio,"feijão",3)
julia.adicionarProduto(florDoCampo.cardapio,'batata frita',1)
julia.adicionarProduto(florDoCampo.cardapio,'arroz', 2)

jessica.visualizarPedido()
julia.visualizarPedido()
jessica.finalizarPedido(florDoCampo)
julia.finalizarPedido(florDoCampo)
console.log(julia.pedido)
//jessica.cancelarPedido('123456')
//console.log(jessica.carrinho)
// console.log(florDoCampo.pedidoCliente[2])


console.log(jessica.listaProd)
 //florDoCampo.confirmarPedido(true,mincho)
 //mincho.mostrarListaPedidosConfirmados()
 //mincho.escolherPedido('123456')
 //console.log(mincho.listaPedidosConfirmados)


// console.log(JSON.stringify(mincho.listaPedidosConfirmados,null,2))









