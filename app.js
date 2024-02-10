let listaDeNumerosSorteados = [];
let numeroLimite = 100;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;
exibirMensagemInicial();

function exibirTextoNatela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
}

function exibirMensagemInicial() {

    exibirTextoNatela('h1' , 'Jogo do número Secreto');
    exibirTextoNatela('p' , ' Escolha um número entre 1 e 100');
}

function verificarChute() {
    let chute = document.querySelector('input').value;

    if (chute == numeroSecreto) {
        exibirTextoNatela('h1', 'Acertou! Parabéns.');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativas';
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`;
        exibirTextoNatela('p', mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        if (chute > numeroSecreto) {
            exibirTextoNatela('p', 'O número secreto é menor');
        } else {
            exibirTextoNatela('p','O número secreto é maior');
        }
        tentativas++;
        limparCampo();

    }

}

function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeDeElementosLista = listaDeNumerosSorteados.length;

    if (quantidadeDeElementosLista == numeroLimite); {
        listaDeNumerosSorteados = [];
    } 
    if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio();
    } else {
        listaDeNumerosSorteados.push(numeroEscolhido);
        return numeroEscolhido;
    }
}

function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}