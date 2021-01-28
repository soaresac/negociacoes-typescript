import { NegociacoesView, MensagemView } from '../views/index';
import { Negociacoes, Negociacao, NegociacaoParcial } from '../models/index';
import { domInject, throttle } from '../helpers/decorators/index';
import { NegociacaoService, ResponseHandler } from '../services/index';

let timer = 0;

export class NegociacaoController {

    @domInject('#data')
    private _inputData: JQuery;

    @domInject('#quantidade')
    private _inputQuantidade: JQuery;

    @domInject('#valor')
    private _inputValor: JQuery;
    private _negociacoes: Negociacoes = new Negociacoes();
    private _negociacoesView = new NegociacoesView('#negociacoesView', true);
    private _mensagemView = new MensagemView('#mensagemView', true);

    constructor() {
        this._negociacoesView.update(this._negociacoes);
    }

    @throttle()
    adiciona() {
        let data = new Date(this._inputData.val().replace(/-/g,','));

        //sabado ou domingo
        if(!this._ehDiaUtil(data)) {
            this._mensagemView.update("Negociações só podem ser adicionadas em dias úteis!");

            return;
        }

        const negociacao = new Negociacao(
            data,
            parseInt(this._inputQuantidade.val()),
            parseFloat(this._inputValor.val())
        );

        this._negociacoes.adiciona(negociacao);

        this._negociacoesView.update(this._negociacoes);
 
        this._mensagemView.update("Negociação adicionada com sucesso!");
    }

    private _ehDiaUtil(data: Date) {
        return data.getDay() != DiaDaSemana.Sabado && data.getDay() != DiaDaSemana.Domingo;
    }

    private _service = new NegociacaoService();

    @throttle()
    importaDados() {

        const isOk: ResponseHandler = (res: Response) => {
            if(res.ok) return res;
            throw new Error(res.statusText);
        }

        this._service
            .obterNegociacoes(isOk)
            .then(negociacoes => {
                negociacoes.forEach(negociacao => 
                    this._negociacoes.adiciona(negociacao));
                this._negociacoesView.update(this._negociacoes);
            });
    }
}

enum DiaDaSemana {
    Domingo,
    Segunda,
    Terca,
    Quarta,
    Quinta,
    Sexta,
    Sabado
}