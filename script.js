const html = document.querySelector(`html`);
const focoBtn = document.querySelector(`.app__card-button--foco`);
const curtoBtn = document.querySelector(`.app__card-button--curto`);
const longoBtn = document.querySelector(`.app__card-button--longo`);
const banner = document.querySelector(`.app__image`);

focoBtn.addEventListener(`click`, () => {
    atribuirContexto(`foco`)
})

curtoBtn.addEventListener(`click`, () => {
    atribuirContexto(`descanso-curto`)
})

longoBtn.addEventListener(`click`, () => {
    atribuirContexto(`descanso-longo`)
});

function atribuirContexto(contexto) {
    html.setAttribute(`data-contexto`, contexto);
    banner.setAttribute(`src`, `/imagens/${contexto}.png`);
}