const btnAdicionarTarefa = document.querySelector(`.app__button--add-task`);
const formAdicionarTarefa = document.querySelector(`.app__form-add-task`);
const ulTarefas = document.querySelector(`.app__section-task-list`)
const textarea = document.querySelector(`.app__form-textarea`);
const tarefasList = JSON.parse(localStorage.getItem(`tarefasList`)) || [];


function criarElementoTarefa(tarefa){
    const li = document.createElement(`li`);
    li.classList.add(`app__section-task-list-item`)
    const svg = document.createElement(`svg`);
    svg.innerHTML = `
        
        <svg class="app__section-task-icon-status" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="12" fill="#FFF"></circle>
            <path d="M9 16.1719L19.5938 5.57812L21 6.98438L9 18.9844L3.42188 13.4062L4.82812 12L9 16.1719Z" fill="#01080E"></path>
        </svg>
        
    `
    const paragrafo = document.createElement(`p`);
    paragrafo.classList.add(`app__section-task-list-item-description`);
    paragrafo.textContent = tarefa.descricao;

    const botao = document.createElement(`button`);
    botao.classList.add(`app_button-edit`);
    const imagemBotao = document.createElement(`img`);
    imagemBotao.setAttribute(`src`, `/imagens/edit.png`);

    botao.append(imagemBotao);
    li.append(svg);
    li.append(paragrafo);
    li.append(botao);

    return li
}


btnAdicionarTarefa.addEventListener(`click`, () => {
    formAdicionarTarefa.classList.toggle(`hidden`)
})

formAdicionarTarefa.addEventListener(`submit`, (evento) => {
    evento.preventDefault();
    const tarefa = {
        descricao: textarea.value
    }
    tarefasList.push(tarefa);
    ulTarefas.append(criarElementoTarefa(tarefa));
    localStorage.setItem(`tarefasList`, JSON.stringify(tarefasList));
    textarea.value = ``;
    formAdicionarTarefa.classList.add(`hidden`)

})

tarefasList.forEach(tarefa => {
    ulTarefas.append(criarElementoTarefa(tarefa));    
});