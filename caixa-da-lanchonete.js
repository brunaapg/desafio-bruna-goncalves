class CaixaDaLanchonete {

    cardapio = {
        'cafe': { descricao: 'Café', valor: 3.00 },
        'chantily': { descricao: 'Chantily (extra do Café)', valor: 1.50 },
        'suco': { descricao: 'Suco Natural', valor: 6.20 },
        'sanduiche': { descricao: 'Sanduíche', valor: 6.50 },
        'queijo': { descricao: 'Queijo (extra do Sanduíche)', valor: 2.00 },
        'salgado': { descricao: 'Salgado', valor: 7.25 },
        'combo1': { descricao: '1 Suco e 1 Sanduíche', valor: 9.50 },
        'combo2': { descricao: '1 Café e 1 Sanduíche', valor: 7.50 },
    };

    formasDePagamento = ['dinheiro', 'debito', 'credito'];

    calcularValorDaCompra(metodoDePagamento, itens) {
        if (!this.formasDePagamento.includes(metodoDePagamento)) {
            return "Forma de pagamento inválida!";
        }

        let total = 0;
        let itemQuantities = {};

        for (const itemInfo of itens) {
            const [codigo, quantidade] = itemInfo.split(',');

            if (!this.cardapio[codigo]) {
                return "Item inválido!";
            }

            const item = this.cardapio[codigo];
            total += item.valor * parseInt(quantidade);

            if (codigo !== 'chantily' && codigo !== 'queijo') {
                if (!itemQuantities[codigo]) {
                    itemQuantities[codigo] = 0;
                }
                itemQuantities[codigo] += parseInt(quantidade);
            }
        }

        for (const codigo in itemQuantities) {
            const item = this.cardapio[codigo];
            if (itemQuantities[codigo] > 0 && (!this.cardapio[`chantily`] && codigo !== 'cafe') || (!this.cardapio[`queijo`] && codigo !== 'sanduiche')) {
                return "Item extra não pode ser pedido sem o principal";
            }
        }

        if (Object.keys(itemQuantities).length === 0) {
            return "Não há itens no carrinho de compra!";
        }

        if (total === 0) {
            return "Quantidade inválida!";
        }

        if (metodoDePagamento === 'dinheiro') {
            total *= 0.95;
        } else if (metodoDePagamento === 'credito') {
            total *= 1.03;
        }

        return `R$ ${total.toFixed(2).replace('.', ',')}`;
    }
}

export { CaixaDaLanchonete };
