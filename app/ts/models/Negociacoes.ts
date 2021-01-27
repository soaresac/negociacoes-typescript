import {Negociacao} from './Negociacao';
import { logarTempoDeExecucao } from '../helpers/decorators/logarTempoDeExecucao';

export class Negociacoes {
    private _negociacoes: Negociacao[] = [];

    adiciona(negociacao: Negociacao): void {
        this._negociacoes.push(negociacao);
    }

    @logarTempoDeExecucao(true)
    paraArray(): Negociacao[] {
        return ([] as Negociacao[]).concat(this._negociacoes);
    }
}