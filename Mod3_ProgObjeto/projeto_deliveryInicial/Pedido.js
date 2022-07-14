class Pedido {
    constructor(idCliente, restaurante,listaProd=[]){
        this.idCliente = idCliente;
        this.restaurante = restaurante;
        this.listaProd =listaProd;

    }
    colocarProd(produto){
        this.listaProd.push(produto)
    }
}

module.exports = Pedido