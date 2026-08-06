import { Component, signal, computed } from '@angular/core';
import { Produto } from '../produto/produto';

@Component({
  selector: 'app-lista-produtos',
  imports: [Produto],
  templateUrl: './lista-produtos.html',
  styleUrl: './lista-produtos.css',
})
export class ListaProdutos {
  produtos = signal([ // Esse signal envia esse sinal (reativo) que permite alterações em outros pontos
    { nome: 'Notebook', preco: 3800 },
    { nome: 'Mouse', preco: 179 },
  ]);

  totalProdutos = computed ( () => this.produtos().length); // Computed é um signal que olha para outro signal que vê alguma mudança e 
  // já recebe o sinal para que possa fazer a alteração no ANGULAR.

  valorTotal = computed ( () => {
    return this.produtos().reduce ( (total, item) => total + item.preco, 0);
  }); // Reduce > Método array do JS/TS que percorre cada item acumulando um resultado. Começa com zero e vai somando o campo de preço de cada produto
  // Computed é usado pois a soma depende diretamente da lista de produtos, sempre que um produto for adicionado 
  //  o valorTotal recalculará automaticamente sem nenhum código extra

  exibirProduto(nome: string) {
    console.log('Produto selecionado:', nome);
  }

  adicionarProduto() {
    this.produtos.update((listaAtual) => [
      ...listaAtual, 
      { nome: 'Teclado', preco: 250 }]);
  }

  substituirProdutos() {
    this.produtos.set ([{ nome: 'Celular', preco:1000}]);
  } // Set () -> Ignora o estado anterior trocando a lista inteira pelo novo valor.
  // Update () -> Recebe um valor e retorna outro como novo valor. Usado ao precisar adicionar,remover ou transformar o estado existente.
  
}
