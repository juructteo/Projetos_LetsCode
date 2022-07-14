const Cliente = require("./Cliente")
const Lojista = require("./Lojista")
const Entregador = require("./Entregador")

const julia = new Cliente ('252623','julia','2425899', 'jurubeba', 'avenida guadalupe,44', 'cartão de debito')
const florDoCampo=new Lojista(
    "123456","123456","123","Flor do Campo","rua dos bobos N0")
const mincho = new Entregador ("789456","Mincho","789456")



florDoCampo.adicionarProduto("arroz",5)
florDoCampo.adicionarProduto("feijão",3)
florDoCampo.adicionarProduto("batata frita",10)



julia.criarPedido('123456')
julia.adicionarProduto(florDoCampo.cardapio,"arroz",2)
julia.adicionarProduto(florDoCampo.cardapio,"feijão",7)
julia.adicionarProduto(florDoCampo.cardapio,"batata frita",4)
julia.finalizarPedido(florDoCampo)
console.log('----------------------------' )

florDoCampo.confirmarPedido('252623' , true, mincho)
mincho.escolherPedido('123456')