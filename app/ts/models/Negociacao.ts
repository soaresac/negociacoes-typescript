import { Igualavel } from './Igualavel';

export class Negociacao implements Igualavel<Negociacao>{
    
    constructor(readonly data: Date, readonly quantidade: number,  readonly valor: number) {} 

    get volume() {
        return this.quantidade * this.valor;
    }

    ehIgual(negociacao: Negociacao): boolean {
        return this.data.getDate() == negociacao.data.getDate()
        && this.data.getMonth() == negociacao.data.getMonth()
        && this.data.getFullYear() == negociacao.data.getFullYear();
    }

}