const html = document.querySelector(`html`);
const focoBtn = document.querySelector(`.app__card-button--foco`);
const curtoBtn = document.querySelector(`.app__card-button--curto`);
const longoBtn = document.querySelector(`.app__card-button--longo`);
const banner = document.querySelector(`.app__image`);
const title = document.querySelector(`.app__title`);
const tempoNaTela = document.querySelector(`#timer`);
const botoes = document.querySelectorAll(`.app__card-button`);
const startPauseBt = document.querySelector(`#start-pause`);
const somPlay = new Audio(`/sons/play.wav`);
const somPause = new Audio(`/sons/pause.mp3`);
const somBeep = new Audio(`sons/beep.mp3`);
const iniciarOuPausarBt = document.querySelector(`#start-pause span`)
const musicaFocoInput = document.querySelector(`#alternar-musica`);
const musica = new Audio(`/sons/luna-rise-part-one.mp3`);
musica.loop = true;
let tempoDecorridoEmsegundos = 10;
let intervaloId = null;

musicaFocoInput.addEventListener(`change`, () =>{
    musica.paused ? musica.play() : musica.pause();
})


focoBtn.addEventListener(`click`, () => {
    tempoDecorridoEmsegundos = 10;
    alterarContexto(`foco`);
    focoBtn.classList.add('active');

})

curtoBtn.addEventListener(`click`, () => {
    tempoDecorridoEmsegundos = 300;
    alterarContexto(`descanso-curto`);
    curtoBtn.classList.add('active');
})

longoBtn.addEventListener(`click`, () => {
    tempoDecorridoEmsegundos = 900;
    alterarContexto(`descanso-longo`);
    longoBtn.classList.add('active');
});

function alterarContexto(contexto) {
    mostrarTempo();
    botoes.forEach((contexto) => {
        contexto.classList.remove(`active`);
    });
    html.setAttribute(`data-contexto`, contexto);
    banner.setAttribute(`src`, `/imagens/${contexto}.png`);
    switch (contexto) {
        case `foco`:

            title.innerHTML = `Otimize sua produtividade,<br>
            <strong class="app__title-strong">mergulhe no que importa.</strong>`
            
            break;

        case `descanso-curto`:
            title.innerHTML = `Que tal dar uma respirada?<br>
            <strong class="app__title-strong">Faça uma pausa curta!</strong>`
            
            break;

        case `descanso-longo`:

            title.innerHTML = `Hora de voltar à superfície,<br>
            <strong class="app__title-strong">Faça uma pausa longa!</strong>`
            
            break;
    
        default:
            break;
    }
}

const contagemRegressiva = () => {
    if (tempoDecorridoEmsegundos <=0 ) {
        somBeep.play();
        //alert(`Tempo finalizado`);
        const focoAtivo = html.getAttribute(`data-contexto`) == `foco`
        if (focoAtivo){
            const evento = new CustomEvent(`FocoFinalizado`);
            document.dispatchEvent(evento);
        }
        zerar();
        return
    }
    tempoDecorridoEmsegundos -= 1;
    mostrarTempo();
}

startPauseBt.addEventListener(`click`, iniciarOuPausar)

function iniciarOuPausar() { 
    if(intervaloId){
        iniciarOuPausarBt.textContent = `Começar`
        startPauseBt.childNodes[1].src = `/imagens/play_arrow.png`
        somPause.play(); 
        
    } else {
        iniciarOuPausarBt.textContent = `Pausar` 
        startPauseBt.childNodes[1].src = `/imagens/pause.png`
        somPlay.play()
    }
    if (intervaloId) {
        zerar()
        return
    }
    intervaloId = setInterval(contagemRegressiva,1000)
}

function zerar(){
   clearInterval(intervaloId);
   
   intervaloId = null;
}

function mostrarTempo() {
    const tempo = new Date(tempoDecorridoEmsegundos * 1000);
    const tempoFormatado = tempo.toLocaleTimeString(`pt-Br`,{minute: `2-digit`, second: `2-digit`})
    tempoNaTela.innerHTML = `${tempoFormatado}`
}

mostrarTempo();