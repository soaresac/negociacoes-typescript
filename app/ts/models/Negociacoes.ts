import {Negociacao} from './Negociacao';
import { logarTempoDeExecucao } from '../helpers/decorators/logarTempoDeExecucao';
import { Igualavel } from './Igualavel';

export class Negociacoes implements Igualavel<Negociacoes>{
    private _negociacoes: Negociacao[] = [];

    adiciona(negociacao: Negociacao): void {
        this._negociacoes.push(negociacao);
    }

    @logarTempoDeExecucao(true)
    paraArray(): Negociacao[] {
        return ([] as Negociacao[]).concat(this._negociacoes);
    }

    ehIgual(negociacoes: Negociacoes): boolean {
        return JSON.stringify(this._negociacoes) == JSON.stringify(negociacoes.paraArray);
    }
}